import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./../../App/store";
import { Product } from "./Product";
import { productSlice } from "./ProductSlice";

const productAdapter = createEntityAdapter<Product>({
    selectId: product => product.id,
    sortComparer: (a,b) => a.description.localeCompare(b.description)
});

export const productSelectors = productAdapter.getSelectors<RootState>(state => state.products);

export const productAdapterSlice = createSlice({
    name: 'products',
    initialState: productAdapter.getInitialState(),
    reducers: {
        addOne: productAdapter.addOne,
        updateOne: productAdapter.updateOne,
        deleteOne: productAdapter.removeOne
    }
});

export const { addOne, updateOne, deleteOne } = productSlice.actions;