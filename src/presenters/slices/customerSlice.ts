import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type CustomerEntity from '../../entities/customer/entity';
import { customerRepository } from '../../repositories/customer';


interface customerState {
    customers: CustomerEntity[];
    loading: boolean;
    error: string | null;
}


const initialState: customerState = {
    customers: [],
    loading: false,
    error: null
}

export const fetchCustomers = createAsyncThunk(
    'customer/getCustomers',
    async(current:number = 1) => {
        return await customerRepository.getAllCustomers(current);
    }
)


const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchCustomers.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(fetchCustomers.fulfilled, (state, action) => {
            state.loading = false;
            state.customers = action.payload.customers;
        });

        builder.addCase(fetchCustomers.rejected, (state, action) => {
            state.loading = false;
            state.error =
                action.error.message || 'Failed to fetch customers';
        });
    }
});

export default customerSlice.reducer;