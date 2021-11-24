import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useContext } from 'react/cjs/react.development';
import authContext from '../context/auth/authContext';

export default function SignUp(props) {
    const context = useContext(authContext);
    const { signup } = context;
    const [credential, setCredential] = useState({ name: "", email: "", password: "", cpassword: "" });
    const onSubmit = (e) => {
        e.preventDefault();
        if (credential.password === credential.cpassword)
            signup(credential.name, credential.email, credential.password, credential.cpassword);
        else
            props.showAlert("Password must be same", "danger");

    }
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    }
    return (
        <div className="d-flex justify-content-center ">
            <div className="card my-4" style={{ width: '50rem' }}>
                <div className="card-body">
                    <h1 className="text-center text-info">Sign Up to continue with MyNotebook</h1>
                    <form onSubmit={onSubmit}>
                        <div className="my-4">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" name="name" id="name" onChange={onChange} aria-describedby="emailHelp" required value={credential.name} />
                        </div>
                        <div className="my-4">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" name="email" id="email" onChange={onChange} aria-describedby="emailHelp" required value={credential.email} />
                        </div>
                        <div className="my-4">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" name="password" id="password" onChange={onChange} minLength={5} required value={credential.password} />
                        </div>
                        <div className="my-4">
                            <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" name="cpassword" id="cpassword" onChange={onChange} minLength={5} required value={credential.cpassword} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <h5><Link className="nav-link text-center" to='/login'>Already have an Account..?</Link></h5>
                    </form>
                </div>
            </div>
        </div>
    )
}
