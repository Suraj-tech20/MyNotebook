// import { useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "./authContext";

const AuthState = (props) => {
    const history = useHistory();
    const host = 'http://localhost:5000';
    const { showAlert } = props;
    const login = async (email, password) => {
        const response = await fetch(`${host}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.successful) {
            localStorage.setItem('token', json.jwttoken);
            showAlert("Logged in Succesfully", "success");
            history.push('/');
        } else {
            showAlert(json.error, "danger");
        }
    }

    const signup = async (name, email, password) => {
        const response = await fetch(`${host}/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.successful) {
            localStorage.setItem('token', json.jwttoken);
            showAlert("Signed Up Succesfully", "success");
            history.push('/');
        } else {
            showAlert(json.error, "danger");
        }
    }

    const getuser = async (token) => {
        const response = await fetch(`${host}/auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        });
        const json = await response.json();
        return json;
    }
    return (
        <AuthContext.Provider value={{ login, signup, getuser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;