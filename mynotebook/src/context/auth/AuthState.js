// import { useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "./authContext";

const AuthState = (props) => {
    const history = useHistory();
    const host = 'https://mynote-book1.herokuapp.com';
    // const host = 'http://localhost:5000';
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
        if (json.successful) {
            localStorage.setItem('token', json.jwttoken);
            showAlert("Logged in Succesfully", "success");
            history.push('/');
        } else {
            showAlert(json.error, "danger");
        }
    }
    const reset = async (email) => {
        const response = await fetch(`${host}/auth/user/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });
        const json = await response.json();
        if (json.successful) {
            showAlert(json.msg, "success");
            history.push('/login');
        } else {
            showAlert(json.error, "danger");
        }
    }
    const newpassword = async (password, token) => {
        const response = await fetch(`${host}/auth/user/newpassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password, token })
        });
        const json = await response.json();
        if (json.successful) {
            showAlert(json.msg, "success");
            history.push('/login');
        } else {
            showAlert(json.error, "danger");
        }
        // console.log(password, token, 'aasdfkajs');
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
        if (json.successful) {
            localStorage.setItem('token', json.jwttoken);
            showAlert("Signed Up Succesfully", "success");
            history.push('/login');
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
        <AuthContext.Provider value={{ login, signup, getuser, reset, newpassword }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;