import type { ErrorEntities } from "../../entities/error/entity";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ErrorRepositories } from "../../repositories/error/error";

interface ErrorState {
    errors: ErrorEntities[],
    selectedError: ErrorEntities | null;
    total: number,
    loading: boolean,
    error: string | null
}

const initialState: ErrorState = {
    errors: [],
    selectedError: null,
    total: 0,
    loading: false,
    error: null
}
export const fetchErrorData = createAsyncThunk(
    "/error/fetchErrorData",
    async({current, pageSize, search, filter}: {current: number, pageSize: number, search?: string, filter?: Record<string, string>}) => {
        return await ErrorRepositories.getErrorData(current, pageSize, search, filter)
    }
)

export const fetchErrorById = createAsyncThunk(
    "/error/fetchErrorById",
    async(id: string) => {
        return await ErrorRepositories.getErrorById(id)
    }
)

const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchErrorData.pending, (state) => {
            state.loading = true;
            state.error = null
        })

        builder.addCase(fetchErrorData.fulfilled, (state, action) => {
            state.loading = false;
            state.errors = action.payload.errors
            state.total = action.payload.total
            state.error = null
        })

        builder.addCase(fetchErrorData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch error data';
        })

         builder.addCase(fetchErrorById.pending, (state) => {
            state.loading = true;
            state.error = null
        })

        builder.addCase(fetchErrorById.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedError = action.payload.errors
            state.error = null
        })

        builder.addCase(fetchErrorById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch error data';
        })
    }
})

export default errorSlice.reducer