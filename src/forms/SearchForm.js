import React, { useState } from "react";

// form to create search bar

function SearchForm(search) {
    const [ searchData, setSearchData ] = useState('');


    // handle submit tries to stop blank searches

    function handleSubmit(e) {
        e.preventDefault();
        search(searchData.trim() || undefined);
        setSearchData(searchData.trim());
    }

    // handle change tracks changes to form field and sets search data

    function handleChange(e) {
        const { value } = e.target;
        setSearchData(value);
    }

    return (
        <div className="SearchForm mb-4">
            <form className="form-inline" onSubmit={handleSubmit}>
                <input
                    className="form-control form-control-lg flex-grow-1"
                    name="searchData"
                    placeholder="Search for information here"
                    value={searchData}
                    onChange={handleChange}
                />
                <button className="btn btn-lg btn-primary" type="submit">
                    Search
                </button>
            </form>

        </div>
    );

}

export default SearchForm;