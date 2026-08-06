import type { ProductEntities } from "../../entities/product/entity";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductRepositories } from "../../repositories/product/product";

interface ProductState {
    products: ProductEntities[],
    loading: boolean,
    error: string | null
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null
}

export const fetchProductData = createAsyncThunk(
    "/product/fetchProductData",
    async({current, pageSize, search, filter}: {current: number, pageSize: number, search?: string, filter?: Record<string, string>[]}) => {
        return await ProductRepositories.getProductData(current, pageSize, search, filter)
    }
)

const productSilce = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProductData.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        builder.addCase(fetchProductData.fulfilled, (state, action) => {
            state.loading = true;
            state.products = action.payload.products
            state.error = null
        })

        builder.addCase(fetchProductData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch product data!"
        })
    }
})

export default productSilce.reducer