import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/NoteState'
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AuthState from './context/auth/AuthState'


function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({ message: message, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  return (
    <Router>
      <AuthState showAlert={showAlert} >
        <NoteState showAlert={showAlert} >
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <SignUp showAlert={showAlert} />
              </Route>
            </Switch>
          </div>
        </NoteState>
      </AuthState>
    </Router>
  );
}

export default App;
