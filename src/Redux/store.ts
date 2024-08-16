import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./userInfoSlice";

const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
  },
});

export default store;

// Define RootState and AppDispatch types for use in hooks.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
