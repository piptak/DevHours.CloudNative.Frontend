import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/product-slice/api-slice/apiSlice";
import { productSliceWithAdapter } from "../features/product-slice/productSliceWithAdapter";


export const store = configureStore({
    reducer: {
        [productSliceWithAdapter.name]: productSliceWithAdapter.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;