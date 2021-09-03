import './styles.scss';
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import IRoute from "../router/interfaces/route";
import routes from "../router/routes";
import Navbar from "../shared/components/navbar/Navbar";
import { Grid, StylesProvider } from "@material-ui/core";
import React from 'react';

const App: React.FC = () => {

    return (
        <>
            <StylesProvider injectFirst>

                <Grid container direction="column">
                    <Grid item>
                        <Navbar />
                    </Grid>
                    <Grid item container>
                        <Grid item xs={1} sm={1} md={1} lg={1} xl={1}/>
                        <Grid item container xs={10} sm={10} md={10} lg={10} xl={10}>
                            <Switch>
                                {routes.map((route: IRoute, index: number) => {
                                    return (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            exact={route.exact}
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                            render={(props: RouteComponentProps<any>) => (
                                                <route.component
                                                    name={route.name}
                                                    {...props}
                                                    {...route.props}
                                                />
                                            )}
                                        />
                                    );
                                })}
                            </Switch>
                        </Grid>
                        <Grid item xs={1} sm={1} md={1} lg={1} xl={1}/>
                    </Grid>
                </Grid>
            </StylesProvider>
        </>
    );
};
export default App;