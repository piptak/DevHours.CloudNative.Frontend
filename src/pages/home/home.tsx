import Grid from "@material-ui/core/Grid";
import React from "react";
import IPage from "../../router/interfaces/page";
import { Typography } from "@material-ui/core";

import './home.scss'

const Home: React.FC<IPage> = () => {

    return (
            <Grid item container
                direction="column"
                justifyContent="center"
                alignItems="center"
                className="home-container"
                >
                
                <Grid item>
                    <Typography variant="h4">Hello DevHours</Typography>
                </Grid>
            </Grid>
    );
}

export default Home;