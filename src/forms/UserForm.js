import React, { useState, useContext } from "react";
import Alert from "../Alert";
import JoblyApi from "../api";
import UserContext from "../hooks/userContext";
import useTimedMessage from '../hooks/useTimedMessage'

// form to show and update user info

function UserForm() {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const initialData = {
        username: currentUser.username,
        password: "",
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email
    }

    const [ formData, setFormData ] = useState(initialData);
    const [ formErrors, setFormErrors ] = useState([]);
    const [ saveConfirmed, setSaveConfirmed ] = useTimedMessage();

    async function handleSubmit(e) {
        e.preventDefault();
        
        let profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,        
        };

        let username = formData.username;
        let userUpdate;

        try {
            userUpdate = await JoblyApi.saveProfileData(username, profileData);
        } catch (e) {
            setFormErrors(e);
            return;
        }

        setFormData(data => ({...data, password: ""}));
        setFormErrors([]);
        setSaveConfirmed(true);

        setCurrentUser(userUpdate)
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({...data, [name]: value }));
        setFormErrors([]);
    }

    return (
        <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
            <h3>Profile</h3>
            <div className="card">
                <div className="card-body">
                <form>
                    <div className="form-group">
                        <label>Username</label>
                        <p className="form-control-plaintext">{formData.username}</p>
                    </div>
                    <div className="form-group">
                    <label>First Name</label>
                    <input
                        name="firstName"
                        className="form-control"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    </div>
                    <div className="form-group">
                    <label>Last Name</label>
                    <input
                        name="lastName"
                        className="form-control"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    </div>
                    <div className="form-group">
                    <label>Email</label>
                    <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                    />
                    </div>
                    <div className="form-group">
                    <label>Confirm password to make changes:</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    </div>
  
                    {formErrors.length
                        ? <Alert type="danger" messages={formErrors} />
                        : null}
    
                    {saveConfirmed
                        ?
                        <Alert type="success" messages={["Updated successfully."]} />
                        : null}
    
                    <button
                        className="btn btn-primary btn-block mt-4"
                        onClick={handleSubmit}
                    >
                    Save Changes
                    </button>
                </form>
                </div>
            </div>
        </div>
    );    
}

export default UserForm;