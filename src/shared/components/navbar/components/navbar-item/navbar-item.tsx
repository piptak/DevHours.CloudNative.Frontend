import Grid from "@material-ui/core/Grid";
import React from "react";

import './navbar-item.scss'

const NavbarItem: React.FC = ({children}) => (
    <Grid item>
        {children}
    </Grid>
);

export default NavbarItem;