import type { PaymentEntities } from "../../entities/payment/entity";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PaymentRepositories } from "../../repositories/payment/payment";

interface PaymentState {
    payments: PaymentEntities[],
    total_revenue: number,
    total_discount: number
    total: number,
    loading: boolean,
    error: string | null
}

const initialState: PaymentState = {
    payments: [],
    total: 0,
    total_discount: 0,
    total_revenue: 0,
    loading: false,
    error: null
}

export const fetchPaymentData = createAsyncThunk(
    "/payment/fetchPaymentData",
    async({current, pageSize, search, filter}: {current: number, pageSize: number, search?: string, filter?: Record<string, string>}) => {
        return await PaymentRepositories.getPaymentData(current, pageSize, search, filter)
    }
)

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchPaymentData.pending, (state) => {
            state.loading = true;
            state.error = null
        })

        builder.addCase(fetchPaymentData.fulfilled, (state, action) => {
            state.loading = false;
            state.payments = action.payload.payments
            state.total = action.payload.total
            state.error = null
            state.total_discount = action.payload.total_discount
            state.total_revenue = action.payload.total_revenue
        })

        builder.addCase(fetchPaymentData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch payment data';
        })
    }
})

export default paymentSlice.reducer
