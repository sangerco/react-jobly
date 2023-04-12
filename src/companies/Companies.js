import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import Spinner from "../Spinner";
import SearchForm from "../forms/SearchForm";
import CompanyInfo from "./CompanyInfo";

// shows all companies once component is mounted
// search can refine the companies shown

function Companies() {
    const [ companies, setCompanies ] = useState(null);

    useEffect(function loadCompaniesOnMount() {
        search();
    }, []);

    async function search(name) {
        let companies = await JoblyApi.getCompanies(name);
        setCompanies(companies);
    }

    if (!companies) {
        return <Spinner />
    }

    return (
        <div className="col-md-8 offset-md-2">
            <SearchForm search={search} />
            {companies.length
                ? (
                    <div>
                        {companies.map(c => (
                            <CompanyInfo
                                key={c.handle}
                                handle={c.handle}
                                name={c.name}
                                description={c.description}
                                logoUrl={c.logoUrl}
                            />
                        ))}
                    </div>
                ) : (
                    <p>Sorry, no results were found!</p>
                )
            }
        </div>
    )
}

export default Companies;