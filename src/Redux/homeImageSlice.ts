import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HomeImages } from '../ts/type'; // Adjust the path as necessary

interface HomeImageState {
    homeImages: HomeImages;
    loading: boolean;
    error: string | null;
}

const initialState: HomeImageState = {
    homeImages: [],
    loading: false,
    error: null,
};

// Create a slice for home images
const homeImageSlice = createSlice({
    name: 'homeImages',
    initialState,
    reducers: {
        fetchHomeImagesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchHomeImagesSuccess(state, action: PayloadAction<HomeImages>) {
            state.homeImages = action.payload;
            state.loading = false;
        },
        fetchHomeImagesFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

// Async thunk to fetch home images from the backend
export const fetchHomeImages = () => async (dispatch: any) => {
    dispatch(fetchHomeImagesStart());
    try {
        const response = await fetch("http://localhost:3001/get-product/home-images", {
            method: "GET",
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error('Failed to fetch home images');
        }
        const data = await response.json();
        console.log("home images:", data);
        dispatch(fetchHomeImagesSuccess(data));
    } catch (error: any) {
        dispatch(fetchHomeImagesFailure(error.message));
    }
};

// Exports
export const { fetchHomeImagesStart, fetchHomeImagesSuccess, fetchHomeImagesFailure } = homeImageSlice.actions;
export const homeImageReducer = homeImageSlice.reducer;
