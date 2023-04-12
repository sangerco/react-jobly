import React from "react";
import { Link } from 'react-router-dom';

// shows the company's basic information passed down from Companies component

function CompanyInfo({ name, description, logoUrl, handle }) {

    return (
        <Link className="company-info card" to={`/companies/${handle}`}>
            <div className="card-body">
                <h6 className="card-title">
                    {name}
                    {logoUrl && <img src={logoUrl} alt={name} className="float-right ml-5" />}
                </h6>
                <p>{description}</p>
            </div>
        </Link>

    )

}

export default CompanyInfo;