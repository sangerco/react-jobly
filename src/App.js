import React, { useState, useEffect } from 'react';
import JoblyApi from './api';
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import NavBar from './routes/NavBar';
import Routes from './routes/Routes';
import Spinner from './Spinner';
import UserContext from './hooks/userContext';
import jwt from 'jsonwebtoken';

export const TOKEN_STORAGE_ID = "jobly_token";

function App() {
    const [ infoLoaded, setInfoLoaded ] = useState(false);
    const [ applicationIDs, setApplicationIDs ] = useState(new Set([]));
    const [ currentUser, setCurrentUser ] = useState(null);
    const [ token, setToken ] = useLocalStorage(TOKEN_STORAGE_ID);

    useEffect(function loadUserInfo() {
        async function getCurrentUser() {
            if(token) {
                try {
                    let { username } = jwt.decode(token)
                    JoblyApi.token = token;
                    let currentUser = await JoblyApi.getCurrentUser(username);
                    setCurrentUser(currentUser);
                    setApplicationIDs(new Set(currentUser.applications));
                } catch (err) {
                    console.error("Error loading info", err);
                    setCurrentUser(null);
                }
            }
            setInfoLoaded(true);
        }
        // setting the info loaded to false while async function runs allows for spinner to run
        setInfoLoaded(false);
        getCurrentUser();
    }, [token]);

    function logout() {
        setCurrentUser(null);
        setToken(null);
    }

    // setting token in following function will allow user to go straight to companies page upon registering
    
    async function register(data) {
        try {
            let token = await JoblyApi.register(data);
            setToken(token);
            return { success: true };
        } catch (err) {
            console.error('registration failed', err);
            return { success: false, err }
        }
    }

    async function login(data) {
        try {
            let token = await JoblyApi.login(data);
            setToken(token);
            return { success: true };
        } catch (err) {
            console.error('login failed', err);
            return { success: false, err }
        }
    }

    // check to see which jobs have been already applied for

    function jobAppliedFor(id) {
        return applicationIDs.has(id);
    }

    // apply for a job

    function applyForJob(id) {
        if (jobAppliedFor(id)) return
        JoblyApi.applyForJob(currentUser.username, id);
        setApplicationIDs(new Set([...applicationIDs, id]));
    }

    if(!infoLoaded) {
        return <Spinner />
    }

    return (
        <BrowserRouter>
            <UserContext.Provider value={{ currentUser, setCurrentUser, jobAppliedFor, applyForJob }}>
                <div className='App'>
                    <NavBar logout={logout} />
                    <Routes login={login} register={register} />
                </div>
            </UserContext.Provider>
        </BrowserRouter>
    )
}

export default App;