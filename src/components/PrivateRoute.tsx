import React, { Component, FC, ElementType } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface IProps extends RouteProps {
    component: any
}

const PrivateRoute: FC<IProps> = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login' , state: { from: props.location }}} />
    )} />
);

export default PrivateRoute;