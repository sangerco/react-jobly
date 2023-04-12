import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../../api";
import Spinner from "../Spinner";
import JobInfo from "./JobInfo";

// shows info from the company as well as jobs at that company

function CompanyJobs() {
    const {handle} = useParams();

    const [ company, setCompany ] = useState(null);

    useEffect(function getCompanyAndJobs() {
        async function getCompany() {
            setCompany(await JoblyApi.getCompany(handle));
        }
        getCompany();
    }, [handle]);

    if (!company) {
        return (
            <Spinner />
        )
    }

    return (
        <div className="col-md-8 offset-md-2">
            <h4>{company.name}</h4>
            <p>{company.description}</p>
            <JobInfo jobs={company.jobs} />
        </div>
    );

}

export default CompanyJobs;