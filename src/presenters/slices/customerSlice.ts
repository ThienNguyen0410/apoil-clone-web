import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type CustomerEntity from '../../entities/customer/entity';
import { customerRepository } from '../../repositories/customer/customer';


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

export const searchCustomers = createAsyncThunk(
    'customer/searchCustomers',
    async({current, search}:{current:number, search:string}) => {
        return await customerRepository.getAllCustomers(current, 10, search);
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

        builder.addCase(searchCustomers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(searchCustomers.fulfilled, (state, action) => {
            state.loading = false;
            state.customers = action.payload.customers;
        });
        builder.addCase(searchCustomers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to search customers';
        });
    }
});

export default customerSlice.reducer;