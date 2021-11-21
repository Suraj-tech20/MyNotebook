import React, { useContext, useEffect, useState } from 'react'
import authContext from '../context/auth/authContext';

export default function UserDetail() {
    const context = useContext(authContext);
    // destructuring of context
    const { getuser } = context;
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({ name: "", email: "" });
    // let newUser = {};
    // const [user, setUser] = useState(initialState)
    useEffect(() => {
        getuser(localStorage.getItem('token')).then(res => {
            setUser(res.user);
            setLoading(false);
        }).catch(err => {
            console.log(err);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle mx-2" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Hello! {!loading ? user.name : ""}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><span className="dropdown-item">
                    {!loading && user.email}</span></li>
                <li><span className="dropdown-item">{!loading && (new Date(user.date).toDateString())}</span></li>
            </ul>
        </div >
    )
}
