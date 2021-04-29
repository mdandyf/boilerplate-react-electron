import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AuthPage from '../pages/auth/AuthPage';
import ForgetPasswordPage from '../pages/auth/ForgetPasswordPage';
import MainPage from '../pages/main/MainPage';

import PrivateRoute from './PrivateRoute';

const Routes = (props) => {

    //const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const isAuthenticated = false
    console.log(isAuthenticated);

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={AuthPage} />
                <Route exact path="/forget-password" component={ForgetPasswordPage} />
                <PrivateRoute exact path="/" isAuthenticated={isAuthenticated} component={MainPage} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;