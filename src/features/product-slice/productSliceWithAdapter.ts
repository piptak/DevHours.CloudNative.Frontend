import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../App/store";
import { Product } from "./Product";


export const productEntityAdapter = createEntityAdapter<Product>({
    selectId: x => x.id,
    sortComparer: (a,b) => a.description.localeCompare(b.description)
});

export const productSelectors = productEntityAdapter.getSelectors<RootState>(x => x.productsWithAdapter);

export const productSliceWithAdapter = createSlice({
    name: 'productsWithAdapter',
    initialState: productEntityAdapter.getInitialState(),
    reducers: {
        addOne: productEntityAdapter.addOne,
        updateOne: productEntityAdapter.updateOne,
        removeOne: productEntityAdapter.removeOne,
    }
});

export const { addOne, updateOne, removeOne } = productSliceWithAdapter.actions;