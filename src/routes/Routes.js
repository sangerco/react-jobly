import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../Home';
import Companies from '../companies/Companies';
import CompanyInfo from "../companies/CompanyInfo";
import Jobs from '../jobs/Jobs';
import LoginForm from '../forms/LoginForm';
import UserForm from '../forms/UserForm';
import SignupForm from '../forms/SignupForm';
import UserRoute from './UserRoute';

// Provides routes for app

function Routes({ login, register }) {

    return (
        <div className="pt-5">
            <Switch>
                <Route exact path="/" >
                    <Home />
                </Route>
                <Route exact path='/login'>
                    <LoginForm login={login} />
                </Route>
                <Route exact path='/signup'>
                    <SignupForm register={register} />
                </Route>
                <UserRoute exact path="/companies" >
                    <Companies />
                </UserRoute>
                <UserRoute exact path="/jobs">
                    <Jobs />
                </UserRoute>
                <UserRoute exact path="/companies/:handle">
                    <CompanyInfo />
                </UserRoute>
                <UserRoute path="/profile" >
                    <UserForm />
                </UserRoute>
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default Routes;