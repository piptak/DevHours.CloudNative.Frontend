import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Menu from "@material-ui/icons/Menu";
import React, { useEffect, useState } from "react";
import NavbarContainer from "./components/navbar-container/navbar-container";
import NavbarItem from "./components/navbar-item/navbar-item";

import './Navbar.scss'
import LeftDrawer from "./components/left-drawer/left-drawer";
import { useLocation } from "react-router-dom";
import routes from "../../../router/routes";

const Navbar: React.FC = () => {
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const { pathname } = useLocation();
    const [pageName, setPageName] = useState<string>('My App');

    useEffect(() => {
        const pageName = routes.filter(s => s.path === pathname)[0]?.name;
        if (pageName) {
            setPageName(pageName);
        }
        else {
            setPageName('Bookings');
        }
    }, [pathname])

    return (
        <>
        <Paper className="navbar-paper">
            <Grid container justifyContent="space-between" alignItems="center">
                <NavbarContainer>
                    <NavbarItem>
                        <IconButton className="navbar-button" onClick={() => setOpenDrawer(true)}>
                            <Menu />
                        </IconButton>
                    </NavbarItem>
                    <NavbarItem>
                        <Typography variant="h6">{pageName}</Typography>
                    </NavbarItem>
                </NavbarContainer>
                <NavbarContainer>
                    <NavbarItem>
                        <Typography>my-user-name@company.com</Typography>
                    </NavbarItem>
                    <NavbarItem>
                        <Button className="navbar-button">logout</Button>
                    </NavbarItem>
                </NavbarContainer>
            </Grid>
        </Paper>
        <LeftDrawer isOpen={openDrawer} handleOnClose={() => setOpenDrawer(false)}/>
        </>
    );
}

export default Navbar;