import Grid from "@material-ui/core/Grid";
import React from "react";

import './navbar-container.scss'

const NavbarContainer: React.FC = ({children}) => (
    <Grid item>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
            {children}
        </Grid>
    </Grid>
);

export default NavbarContainer;