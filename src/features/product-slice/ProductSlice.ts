import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { Product } from "./Product";

const initialState: Product[] = [{ id: nanoid(), description: 'DevHours first product' }];

export const productSlize = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addOne: (state, action: PayloadAction<Product>) => {
            state.push(action.payload);
        },
        updateOne: (state, action: PayloadAction<Product>) => {
            const productToUpdate = state.filter(p => p.id == action.payload.id)[0];
            if (!productToUpdate) {
                return;
            }

            productToUpdate.description = action.payload.description;
        },
        deleteOne: (state, action: PayloadAction<string>) => (state.filter(p => p.id != action.payload))
    }
});

export const { addOne, updateOne, deleteOne } = productSlize.actions;