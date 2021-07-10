import React from "react";
import '../../App.css'
import '../Auth/Auth.css'
import './Register.css'
import ReduxRegisterForm from "./RegisterForm";

const Register = (props) => {
    return (
        <div className="register-wrap">
            <ReduxRegisterForm shouldRedirect={props.shouldRedirect} onSubmit={props.onSubmit}/>
        </div>
    );
}

export default Register