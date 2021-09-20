import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./Product";

const initialState: Product[] = [{id: nanoid(), description: 'DevHours Product' }];

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addOne: (state, action: PayloadAction<Product>) => { state.push(action.payload); },
        updateOne: (state, action: PayloadAction<Product>) => {
            const productToUpdate = state.find(x => x.id == action.payload.id);
            productToUpdate.description = action.payload.description;
        },
        removeOne: (state, action: PayloadAction<string>) => {
            return state.filter(x => x.id != action.payload);
        }
    }
});

export const { addOne, updateOne, removeOne } = productSlice.actions;