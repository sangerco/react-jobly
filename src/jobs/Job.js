import React, { useContext, useState, useEffect } from "react";
import './Job.css'
import UserContext from '../hooks/userContext';

// display basic information about the job as well as an apply button

function Job({ id, title, salary, equity, companyName }) {
    const { applied, apply } = useContext(UserContext);
    const [ hasApplied, setHasApplied ] = useState(false);

    useEffect(function updateAppliedStatus() {
        setHasApplied(applied(id));

    }, [id, applied]);

    async function handleSubmit(e) {
        if (applied(id)) return;
        apply(id);
        setHasApplied(true);
    }

    return (
        <div className="Job card" >{hasApplied}
            <div className="card-body">
                <h6 className="card-title">{title}</h6>
                <p><strong>{companyName}</strong></p>
                <p>{salary}</p>
                <p>{equity}</p>
                <button className="btn btn-danger font-weight-bold text-uppercase float-right"
                    onClick={handleSubmit}
                    disabled={hasApplied}>
                        {hasApplied ? "Applied" : "Apply"}

                </button>
            </div>
        </div>
    )
}

export default Job;