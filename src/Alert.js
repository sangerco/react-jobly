import React from "react";

// create an alert component that will appear whenever data is not found or
// is incorrectly inputted

const Alert = ({ type = 'danger', messages = [] }) => {

    return (
        <div className={`alert alert-${type}`} role='alert'>
            {messages.map(error => ( 
                <p className="mb-0 small" key={error}>
                    {error}
                </p>
                ))}
        </div>
    );
}

export default Alert;