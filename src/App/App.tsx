import RoomsTable from "../Components/RoomsTable/RoomsTable";
import React from "react";
import './styles.scss';
import { StylesProvider } from "@material-ui/core";

const App: React.FC = () => {
    return (
        <StylesProvider injectFirst>
            <div className="app-wrapper">
                <RoomsTable />
            </div>
        </StylesProvider>
    );
};
export default App;