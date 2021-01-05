import React from 'react';
import { Route, Redirect } from "react-router-dom";

const AccessRoute = ({ component: Component, ...rest }) => {
    return(
        <Route {...rest} render={(props) => (
            localStorage.getItem('access_token')
                ? <Component {...props} />
                : <Redirect to='/login' />
        )} />
    )
}

export default AccessRoute;