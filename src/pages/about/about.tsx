import React from "react";
import { RouteComponentProps } from "react-router";
import IPage from "../../router/interfaces/page";

interface IAboutProps {
    number: string
}

const About: React.FC<IPage> = (props: IPage & RouteComponentProps<IAboutProps>) => {
    return (
        <div>
            <h2>About</h2>
            <p>{props.name}</p>
        </div>
    );
};


export default About;