import React from 'react';
import { Route, Redirect } from "react-router-dom";

const NotAccessRoute = ({ component: Component, ...rest }) => {
    return(
        <Route {...rest} render={(props) => (
            !localStorage.getItem('access_token')
                ? <Component {...props} />
                : <Redirect to='/' />
        )} />
    )
}

export default NotAccessRoute;