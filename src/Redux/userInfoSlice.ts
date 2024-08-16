import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Product = {
    productId: number;
    name: string;
    price: number;
    size: string[];
    category: string;
    position?: string;
    image: string[];
    description: string;
    quantity: { size: string, quantity: number }[];
};

type Item = {
    product: Product;
    quantity: number;
    size: string;
};

type Cart = Item[];

type Order = {
    orderId: string;
    cart: Cart;
    userId: string;
};

type OrderHistory = Order[];

type UserInfo = {
    userId: string;
    name: string;
    email: string;
    password: string;
    cart: Cart;
    orderHistory: OrderHistory;
};

const initialState: UserInfo = {
    userId: "1",
    name: "Peter",
    email: "lei23lei91@gmail.com",
    password: "123456",
    cart: [],
    orderHistory: [],
};

// Explicitly type the state and reducers to avoid inference issues
const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        updateCart: (state: UserInfo, action: PayloadAction<Cart>) => {
            state.cart = action.payload;
        },
        updateOrderHistory: (state: UserInfo, action: PayloadAction<OrderHistory>) => {
            state.orderHistory = action.payload;
        },
        updateUserInfo: (state: UserInfo, action: PayloadAction<UserInfo>) => {
            return { ...state, ...action.payload };
        },
        clearCart: (state: UserInfo) => {
            state.cart = [];
        },
        clearOrderHistory: (state: UserInfo) => {
            state.orderHistory = [];
        },
        clearUserInfo: () => {
            return initialState;
        }
    }
});

export const {
    updateCart,
    updateOrderHistory,
    updateUserInfo,
    clearCart,
    clearOrderHistory,
    clearUserInfo,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;
