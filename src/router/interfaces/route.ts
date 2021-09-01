/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface IRoute {
    path: string;
    name: string;
    component: any;
    exact: boolean;
    props?: any;
}