import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Alert from '../Alert';

// signup form displays form for registering user and submits to api
// displays error if incorrect data or submit fails

function SignupForm({register}) {
    let initialData = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    };
    const [ formData, setFormData ] = useState(initialData);
    const [ formErrors, setFromErrors ] = useState([]);

    // handle submit calls signup method from api, passed down from parent
    // if successful, create profile and redirect back to homepage. if failed, show alert

    async function handleSubmit(e) {
        e.preventDefault();
        let res = await register(formData);
        if (res.success) {
            <Redirect to="/" />
        } else {
            setFromErrors(res.errors)
        }
    }

    // handle change tracks changes in form, sets form data

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({...data, [name]: value }))
    }

    return (
        <div className="register-form">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h3 className='mb-3'>Register here!</h3>
                <div className='card'>
                    <div className='card-body'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label>Username</label>
                                    <input
                                        name='username'
                                        className='form-data'
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                            </div>
                            <div className='form-group'>
                            <label>Password</label>
                                    <input
                                        type='password'
                                        name='password'
                                        className='form-data'
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                            </div>
                            <div className='form-group'>
                            <label>First Name</label>
                                    <input
                                        name='firstName'
                                        className='form-data'
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                            </div>
                            <div className='form-group'>
                            <label>Last Name</label>
                                    <input
                                        name='lastName'
                                        className='form-data'
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                            </div>       
                            <div className='form-group'>
                            <label>email</label>
                                    <input
                                        type='email'
                                        name='email'
                                        className='form-data'
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                            </div>

                            {formErrors.length
                                ? <Alert type='danger' messages={formErrors} />
                                : null}

                            <button className='btn btn-primary float-right' onSubmit={handleSubmit}>
                                Submit
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SignupForm;