import React from 'react'
import '../../App.css'
import './Auth.css'
import {Redirect} from "react-router-dom";
import LoginLogo from '../../assets/images/img-01.png'
import ReduxAuthForm from "./AuthForm";


const Auth = (props) => {

    if(props.isAuth) {
        return <Redirect to='/posts'/>
    }
    return (
        <div className="wrap-login100">
            <div className="login100-pic js-tilt">
                <img src={LoginLogo} alt="IMG"/>
            </div>
            <ReduxAuthForm onSubmit={props.onSubmit}/>
        </div>
    );
}


export default Auth