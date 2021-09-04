import React from 'react';

import { Product } from './../../features/product-slice/Product';
import { Grid } from '@material-ui/core';
import ProductCreator from './components/product-creator/ProductCreator';
import ProductListItem from './components/product-list-item/ProductListItem';

import './Products.scss';



const Products: React.FC = () => {
    const products: Product[] = [];

    return (
        <Grid item container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            className="products-container"
        >

            <Grid item container>
                <ProductCreator />
            </Grid>
            {
                products.map((product) => (
                    <Grid item container key={product.id} className="product-list-item">
                        <ProductListItem {...product} />
                    </Grid>
                ))
            }
        </Grid>
    );
}

export default Products;