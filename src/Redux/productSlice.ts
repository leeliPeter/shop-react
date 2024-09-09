import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../ts/type'; // Adjust the path as necessary

interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
};

// Create a slice for product information
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchProductsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
            state.products = action.payload;
            state.loading = false;
        },
        fetchProductsFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

// Async thunk to fetch products from the backend
export const fetchProducts = () => async (dispatch: any) => {
    dispatch(fetchProductsStart());
    try {
        const response = await fetch("http://localhost:3001/get-product/products", {
            method: "GET",
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log("slice data",data);
        dispatch(fetchProductsSuccess(data));
    } catch (error: any) {
        dispatch(fetchProductsFailure(error.message));
    }
};

// Exports
export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } = productSlice.actions;
export const productReducer = productSlice.reducer;
