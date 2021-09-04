import { Button, Grid, Paper, TextField } from '@material-ui/core';
import React, { useState } from 'react';

import './ProductCreator.scss'


const ProductCreator: React.FC = () => {
    const [productDescription, setProductDescription] = useState<string>('');

    const handleAddProduct = () => {
        
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