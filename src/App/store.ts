import { configureStore } from "@reduxjs/toolkit";
import { productAdapterSlice } from "./../features/product-slice/ProductAdapterSlice";

export const store = configureStore({
    reducer: {
        //products: productSlice.reducer
        products: productAdapterSlice.reducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;