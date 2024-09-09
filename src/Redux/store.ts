import { configureStore } from "@reduxjs/toolkit";
import { userInfoReducer, isLoginReducer } from "./userInfoSlice";
import userInfoMiddleware from './userInfoSlice'; // Import the middleware
import { productReducer } from "./productSlice"; // Import the new product reducer
import { homeImageReducer } from "./homeImageSlice"; 

const store = configureStore({
    reducer: {
        userInfo: userInfoReducer,
        isLogin: isLoginReducer,
        products: productReducer, // Add the product reducer
        homeImages: homeImageReducer, // Add the home image reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userInfoMiddleware), // Add the middleware
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
