import { 
    Divider,
    Drawer,
    Grid,
    List, 
    ListItem,
    Typography
} from "@material-ui/core";
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