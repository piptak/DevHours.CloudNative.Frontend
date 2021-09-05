import React, { useState } from "react";
import { Button, Divider, Grid, IconButton, Paper, TextField, Typography } from "@material-ui/core";

import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

import { Product } from "../../../../features/product-slice/Product";

import './ProductListItem.scss'
import { useAppDispatch } from "../../../../App/hooks";
import { removeOne, updateOne } from "../../../../features/product-slice/productSliceWithAdapter";
import { Settings } from "@material-ui/icons";

const ProductListItem: React.FC<Product> = (product: Product) => {
    const [isEditMode, setEditMode] = useState<boolean>(false);
    const [productDescription, setProductDescription] = useState<string>('');
    const dispatch = useAppDispatch();
 
    const handleUpdateProduct = () => {
        dispatch(updateOne({id: product.id, changes:{ description: productDescription} }));
        setEditMode(false);
        setProductDescription('');
    }

    const handleDeleteProduct = () => {
        dispatch(removeOne(product.id));
    }

    const handleEditClicked = () => {
        setEditMode(true);
        setProductDescription(product.description);
    }

    const handleCancelClicked = () => {
        setEditMode(false);
        setProductDescription('');
    }

    const handleProductDescriptionChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductDescription(event.target.value);
    }

    return (
            <Grid container
                direction="column"
                justifyContent="center"
                className="product-container"
                component={Paper}>
                <Grid item container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="subtitle2">Serial number:</Typography>
                        <Typography variant="subtitle1">{product.id.toUpperCase()}</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton disabled={isEditMode} onClick={handleEditClicked}>
                            <Settings />
                        </IconButton>
                        <IconButton disabled={isEditMode} onClick={handleDeleteProduct}>
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Divider />
                <Grid item container>
                    {
                        isEditMode ?
                            <>
                                <Grid item container className="edit-mode-product-description">
                                    <TextField value={productDescription}
                                        fullWidth={true}
                                        label="Product Description"
                                        variant="outlined"
                                        onChange={handleProductDescriptionChanged}
                                    />
                                </Grid>
                                <Grid item container justifyContent="flex-end">
                                    <Button onClick={handleUpdateProduct}>Save</Button>
                                    <Button onClick={handleCancelClicked}>Cancel</Button>
                                </Grid>
                            </> :
                            <>
                                <Grid item container direction="column">
                                    <Typography variant="subtitle2">Description:</Typography>
                                    <Typography>{product.description}</Typography>
                                </Grid>
                            </>
                    }
                </Grid>
            </Grid>
    );
}

export default ProductListItem;