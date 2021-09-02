import { configureStore } from "@reduxjs/toolkit";
import { bookingApiSlice } from "./../features/booking-api-slice/BookingApiSlice";
import { productAdapterSlice } from "./../features/product-slice/ProductAdapterSlice";

export const store = configureStore({
    reducer: {
        //products: productSlice.reducer
        products: productAdapterSlice.reducer,
        [bookingApiSlice.reducerPath]: bookingApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(bookingApiSlice.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;