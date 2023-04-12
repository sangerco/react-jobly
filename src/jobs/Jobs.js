import React, { useState, useEffect } from 'react';
import SearchForm from '../forms/SearchForm';
import JoblyApi from '../api';
import JobInfo from './JobInfo';
import Spinner from '../Spinner';

// will show a list of jobs based on search parameters.

function Jobs() {
    const [ jobs, setJobs ] = useState(null);

    useEffect(function getAllJobsOnMount() {
        search();
    }, []);

    async function search(title) {
        let res = await JoblyApi.getJobs(title);
        console.log(res);
        setJobs(res);
    }

    if (!jobs) {
        return <Spinner />
    }

    return (
        <div className='col-md-8 offset-md-2'>
            <SearchForm search={search} />
            {jobs.length ? <JobInfo jobs={jobs} /> : <p>No results found! Try another search!</p>}
        </div>
    );
}

export default Jobs;