import React from 'react';
import { useSelector } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import AuthPage from '../pages/auth/AuthPage';
import ForgetPasswordPage from '../pages/auth/ForgetPasswordPage';
import MainPage from '../pages/main/MainPage';

import PrivateRoute from './PrivateRoute';

const Routes = (props) => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    console.log(isAuthenticated);

    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={AuthPage} />
                <Route exact path="/forget-password" component={ForgetPasswordPage} />
                <PrivateRoute exact path="/" isAuthenticated={isAuthenticated} component={MainPage} />
            </Switch>
        </Router>
    );
}

export default Routes;