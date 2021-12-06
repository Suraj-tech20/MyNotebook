import React, { useState, useContext } from 'react';
import authContext from '../context/auth/authContext';

export default function Login() {
    const context = useContext(authContext);
    const { reset } = context;
    const [loginCredential, setLoginCredential] = useState({ email: "" });
    const onSubmit = (e) => {
        e.preventDefault();
        reset(loginCredential.email);
    }
    const onChange = (e) => {
        setLoginCredential({ ...loginCredential, [e.target.name]: e.target.value });
    }
    return (
        <div className="d-flex justify-content-center">
            <div className="card my-4" style={{ width: '50rem' }}>
                <div className="card-body">
                    <h1 className="text-center text-info">Reset Password</h1>
                    <form onSubmit={onSubmit}>
                        <div className="my-4">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" name="email" id="email" onChange={onChange} aria-describedby="emailHelp" required value={loginCredential.email} />
                        </div>
                        <button type="submit" className="btn btn-primary">Reset password</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
