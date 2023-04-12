import React from "react";
import Job from './Job';

function JobInfo({ jobs, apply }) {
    return (
        <div>
            {jobs.map(j => (
                <Job 
                    key={j.id}
                    id={j.id}
                    title={j.title}
                    salary={j.salary}
                    equity={j.equity}
                    companyName={j.companyName}
                />
            ))}
        </div>
    )
}

export default JobInfo;