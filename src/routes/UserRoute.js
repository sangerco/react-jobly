import React, { useContext } from 'react';
import UserContext from '../hooks/userContext';
import { Route, Redirect } from 'react-router-dom';

// routes that should only appear for logged in user

function UserRoute({ exact, path, children }) {
    const { currentUser } = useContext(UserContext);

    if (!currentUser) {
        return <Redirect to="/login" />
    }

    return (
        <Route exact={exact} path={path}>
            {children}
        </Route>
    );
}

export default UserRoute;