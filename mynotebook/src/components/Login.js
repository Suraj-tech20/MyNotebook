import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import authContext from '../context/auth/authContext';

export default function Login() {
    const context = useContext(authContext);
    const { login } = context;
    const [loginCredential, setLoginCredential] = useState({ email: "", password: "" });
    const onSubmit = (e) => {
        e.preventDefault();
        login(loginCredential.email, loginCredential.password);
    }
    const onChange = (e) => {
        setLoginCredential({ ...loginCredential, [e.target.name]: e.target.value });
    }
    return (
        <div className="d-flex justify-content-center">
            <div className="card my-4" style={{ width: '50rem' }}>
                <div className="card-body">
                    <h1 className="text-center text-info">Login to continue with Mynotebook</h1>
                    <form onSubmit={onSubmit}>
                        <div className="my-4">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" name="email" id="email" onChange={onChange} aria-describedby="emailHelp" required value={loginCredential.email} />
                        </div>
                        <div className="my-4">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" name="password" id="password" onChange={onChange} minLength={5} required value={loginCredential.password} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <p><Link className="text-info" to='/reset'>Forgot password</Link></p>
                        <h5><Link className="nav-link text-center" to='/signup'>Create a new Account..?</Link></h5>
                    </form>
                </div>
            </div>
        </div>
    )
}
