// userInfoSlice.ts
import { createSlice, PayloadAction, Draft, Middleware } from '@reduxjs/toolkit';
import { Cart, OrderHistory, UserInfo,Order,url } from '../ts/type';

// Initial state defaults
const defaultState: UserInfo = {
    userId: "",
    name: "",
    email: "",
    password: "",
    cart: [],
    orderHistory: [],
    registerDate: "",
    profile: {
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        birthday: "",
        gender: "",
        country: "",
        state: "",
        city: "",
        zip: "",
        address: "",
    },
};

// Helper functions for localStorage/state
const loadState = (): UserInfo => {
    try {
        const serializedState = localStorage.getItem('userInfo');
        if (serializedState === null) return defaultState;
        return JSON.parse(serializedState) as UserInfo;
    } catch (err) {
        console.error('Failed to load state from localStorage', err);
        return defaultState;
    }
};

const saveState = (state: UserInfo) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('userInfo', serializedState);
    } catch (err) {
        console.error('Failed to save state to localStorage', err);
    }
};

// Function to update user info on backend
export const updateUserInfoOnBackend = async (userInfo: UserInfo) => {
    try {
        // Exclude userId from updatedInfo
        const { userId, ...updatedInfo } = userInfo;
        
        const response = await fetch(`${url}/user-update`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ userId, updatedInfo }),
        });

        if (!response.ok) {
            console.error('Failed to update user info on backend');
            const errorText = await response.text(); // Get response text for debugging
            console.error('Error details:', errorText);
        } else {
            // console.log('User info updated successfully');
        }
    } catch (error) {
        console.error('Error updating user info on backend:', error);
    }
};

// Middleware to update backend when userInfo changes
const userInfoMiddleware: Middleware = ({ getState }) => (next) => async (action) => {
    const result = next(action);

    const state = getState();
    if (state.isLogin) {
        await updateUserInfoOnBackend(state.userInfo);
    }

    return result;
};



// isLogin slice
const isLoginSlice = createSlice({
    name: 'isLogin',
    initialState: false,
    reducers: {
        login: () => true,
        logout: () => false,
    },
});

// userInfo slice
const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: loadState(),
    reducers: {
        setUserInfo: (state: Draft<UserInfo>, action: PayloadAction<UserInfo>) => {
            Object.assign(state, action.payload);
            saveState(state);
        },
        updateCart: (state: Draft<UserInfo>, action: PayloadAction<Cart>) => {
            state.cart = action.payload;
            saveState(state);
        },
        updateOrderHistory: (state: Draft<UserInfo>, action: PayloadAction<OrderHistory>) => {
            state.orderHistory = action.payload;
            saveState(state);
        },
        updateUserInfo: (state: Draft<UserInfo>, action: PayloadAction<Partial<UserInfo>>) => {
            Object.assign(state, action.payload);
            saveState(state);
        },
        clearCart: (state: Draft<UserInfo>) => {
            state.cart = [];
            saveState(state);
        },
        clearOrderHistory: (state: Draft<UserInfo>) => {
            state.orderHistory = [];
            saveState(state);
        },
        clearUserInfoExceptCart: (state: Draft<UserInfo>) => {
            Object.assign(state, {
                userId: "",
                name: "",
                email: "",
                password: "",
                orderHistory: [],
                registerDate: "",
                profile: {
                    email: "",
                    firstName: "",
                    lastName: "",
                    birthday: "",
                    gender: "",
                    phone: "",
                    country: "",
                    state: "",
                    city: "",
                    zip: "",
                    address: "",
                },
            });
            saveState(state);
        },
        addOrderToHistory: (state: Draft<UserInfo>, action: PayloadAction<Order>) => {
            state.orderHistory = [...state.orderHistory, action.payload];
            saveState(state);
        },
    },
});

// Async thunk to initialize user info
export const checkUserStatus = async (dispatch: any) => {
    try {
        const response = await fetch(`${url}/user/current-user`, {
            method: "GET",
            credentials: "include",
        });

        if (response.ok) {
            const data = await response.json();
            if (data.userId) {
                dispatch(setUserInfo(data));
                dispatch(login()); // Set isLogin to true
                return true;
            }
        }
        dispatch(logout()); // Set isLogin to false if no session
        dispatch(clearUserInfoExceptCart());

        return false;
    } catch (error) {
        console.error("Error checking user status:", error);
        dispatch(logout()); // Set isLogin to false if there's an error
        return false;
    }
};


// Exports
export const {
    setUserInfo,
    updateCart,
    updateOrderHistory,
    updateUserInfo,
    clearCart,
    clearOrderHistory,
    clearUserInfoExceptCart,
    addOrderToHistory
} = userInfoSlice.actions;

export const { login, logout } = isLoginSlice.actions;
export const userInfoReducer = userInfoSlice.reducer;
export const isLoginReducer = isLoginSlice.reducer;
export default userInfoMiddleware;

