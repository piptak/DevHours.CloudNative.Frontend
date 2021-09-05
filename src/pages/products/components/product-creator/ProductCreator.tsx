
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { nanoid } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../../App/hooks';
import { addOne } from '../../../../features/product-slice/productSliceWithAdapter';

import './ProductCreator.scss'


const ProductCreator: React.FC = () => {
    const [productDescription, setProductDescription] = useState<string>('');
    const dispatch = useAppDispatch();

    const handleAddProduct = () => {
        dispatch(addOne({ id: nanoid(), description: productDescription }));
        setProductDescription('');
    }

    const handleProductDescriptionChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductDescription(event.target.value);
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
                <Button onClick={handleAddProduct}>Add Product</Button>
            </Grid>
            
        </Grid>
    );
}

export default ProductCreator;