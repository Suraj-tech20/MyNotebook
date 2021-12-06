import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import authContext from '../context/auth/authContext';

export default function Login(props) {
    const context = useContext(authContext);
    const { newpassword } = context;
    const token = useParams();
    const [credential, setCredential] = useState({ password: "", cpassword: "" });
    const onSubmit = (e) => {
        e.preventDefault();
        if (credential.password === credential.cpassword)
            newpassword(credential.password, token.id);
        else
            props.showAlert("Password must be same", "danger");
    }
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    }
    return (
        <div className="d-flex justify-content-center">
            <div className="card my-4" style={{ width: '50rem' }}>
                <div className="card-body">
                    <h1 className="text-center text-info">Enter new password</h1>
                    <form onSubmit={onSubmit}>
                        <div className="my-4">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" name="password" id="password" onChange={onChange} minLength={5} required value={credential.password} />
                        </div>
                        <div className="my-4">
                            <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" name="cpassword" id="cpassword" onChange={onChange} minLength={5} required value={credential.cpassword} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
