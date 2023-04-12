import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Alert from '../Alert';

// Login form displays form and takes data to login user
// displays alert if login fails

function LoginForm({ login }) {
    const [ formData, setFormData ] = useState({
        username: "",
        password: ""
    });
    const [ formError, setFormErrors ] = useState([]);

    // handle submit calls login method from api, passed down from parent
    // if successful, redirect to companies. if failed, show alert

    async function handleSubmit(e) {
        e.preventDefault();
        let res = await login(formData);
        if (res.success) {
            <Redirect to='/companies' />
        } else {
            setFormErrors(res.errors)
        }
    }

    // handle change tracks changes in form, sets form data

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({...data, [name]: value }));
    }

    return (
        <div className='login-form'>
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h3 className='mb-3'>Login here!</h3>
                <div className='card'>
                    <div className='card-body'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label>Username</label>
                                <input
                                    name='username'
                                    className='form-control'
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
                                    className='form-control'
                                    value={formData.password}
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
    );

}

export default LoginForm;