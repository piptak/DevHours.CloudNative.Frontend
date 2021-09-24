import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { pageLinks } from '../../page-links';
import React from "react";
import { Link } from "react-router-dom";
import './left-drawer.scss';

export interface IDrawerProps {
    isOpen: boolean;
    handleOnClose: () => void;
}

const LeftDrawer: React.FC<IDrawerProps> = (props: IDrawerProps) => (
    <Drawer open={props.isOpen} onClose={props.handleOnClose} onClick={props.handleOnClose}>
        <Typography variant="h5" className="drawer-text">DevHours</Typography>
        <Divider/>
        <List>
            {
                pageLinks.map((row, index) => (
                    <ListItem key={`${row.name}-${index}`} className="drawer-list-item">
                        <Link to={row.path} className="drawer-list-item-link">
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item>
                                    <row.icon/>
                                </Grid>
                                <Grid item>
                                    <Typography>{row.name}</Typography>
                                </Grid>
                            </Grid>
                        </Link>
                    </ListItem>
                ))
            }
        </List>
        <Divider/>
    </Drawer>
)

export default LeftDrawer;