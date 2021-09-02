import React from 'react';
import { Grid } from '@material-ui/core';
import ProductCreator from './components/product-creator/ProductCreator';
import ProductContainer from './components/product-container/ProductContainer';

import './Products.scss';
import { useAppSelector } from './../../App/hooks';
import { productSelectors } from './../../features/product-slice/ProductAdapterSlice';



const Products: React.FC = () => {
    const products = useAppSelector(productSelectors.selectAll);

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
                        <ProductContainer {...product} />
                    </Grid>
                ))
            }
        </Grid>
    );
}

export default Products;