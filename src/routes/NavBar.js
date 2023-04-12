import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../hooks/userContext';
import './NavBar.css';

// NavBar for app

function NavBar({ logout }) {
    const { currentUser } = useContext(UserContext);

    function userNav() {
        return (
            <ul className='navbar-nav ml-auto'>
                <li className='nav-item mr-4'>
                    <NavLink to="/companies" className="nav-link">
                        Companies
                    </NavLink>
                </li>
                <li className='nav-item mr-4'>
                    <NavLink to="/jobs" className="nav-link">
                        Jobs
                    </NavLink>
                </li>
                <li className='nav-item mr-4'>
                    <NavLink to="/profile" className="nav-link">
                        Profile
                    </NavLink>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={logout}>
                        Log out {currentUser.first_name} {currentUser.username}
                    </Link>
                </li>
            </ul>
        );
    }

    function anonNav() {
        return (
            <ul className='navbar-nav ml-auto'>
                <li className='nav-item mr-4'>
                    <NavLink to="/login" className="nav-link" >
                        Log In
                    </NavLink>
                </li>
                <li className='nav-item mr-4'>
                    <NavLink to="/signup" className="nav-link" >
                        Sign Up
                    </NavLink>
                </li>
            </ul>
        );
    }

    return (
        <nav className='NavBar navbar navbar-expand-md'>
            <Link className='navbar-brand' to="/" >
                Jobly
            </Link>
            {currentUser ? userNav() : anonNav()}
        </nav>
    );
}

export default NavBar;
