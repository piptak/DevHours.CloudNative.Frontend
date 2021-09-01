import { configureStore } from "@reduxjs/toolkit";
import { productSlize } from "./../features/product-slice/ProductSlice";

export const store = configureStore({
    reducer: {
        products: productSlize.reducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>