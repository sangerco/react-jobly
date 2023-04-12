import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import UserContext from './hooks/userContext';

// landing page for app
// will show welcome and login/signup buttons to new user
// will show welcome back to the logged in user

function Home() {
    const { currentUser } = useContext(UserContext);

    return (
        <div className='home'>
            <div className='container text-center'>
                <h1 className='mb-4 font-weight-bold'>Jobly</h1>
                <p className='lead'>Find your new job here!</p>
                {currentUser
                    ? <h2>Welcome back, {currentUser.firstName} {currentUser.lastName}</h2>
                    : (
                        <p>
                            <Link className='btn btn-primary font-weight-bold mr-3' to='/login'>Log In!</Link>
                            <Link className='btn btn-primary font-weight-bold mr-3' to='/signup'>Sign Up!</Link>
                        </p>
                    )}
            </div>
        </div>
    );
}
                                        
export default Home;