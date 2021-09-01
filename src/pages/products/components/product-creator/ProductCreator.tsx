import { Button, Grid, Paper, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useAppDispatch } from './../../../../App/hooks';
import { nanoid } from '@reduxjs/toolkit';
import { addOne } from './../../../../features/product-slice/ProductSlice';

import './ProductCreator.scss'



const ProductCreator: React.FC = () => {
    const [productDescription, setProductDescription] = useState<string>('');
    
    const handleProductDescriptionChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductDescription(event.target.value);
    }

    const dispatch = useAppDispatch();

    const handleAddProductClicked = () => {
        dispatch(addOne({ id: nanoid(), description: productDescription }));
        setProductDescription('');
    }
    
    return (        
            <Grid container
                className="product-creator-container"
                direction="column"
                justifyContent="center"
                alignItems="center"
                component={Paper}>
                <Grid item container justifyContent="center">
                        <TextField 
                            className="product-description"
                            label="Product Description"
                            variant="outlined"
                            value={productDescription}
                            onChange={handleProductDescriptionChanged}
                        />
                </Grid>
                <Grid item container justifyContent="center" className="add-product-button-container">
                    <Button onClick={handleAddProductClicked}>Add Product</Button>
                </Grid>
                
            </Grid>
    );
}

export default ProductCreator;


