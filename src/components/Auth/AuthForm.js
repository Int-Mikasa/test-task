import React, {useState} from 'react'
import '../../App.css'
import './Auth.css'
import {NavLink} from "react-router-dom";
import {reduxForm, Field} from "redux-form";




const AuthForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit} className="login100-form validate-form">
					<span className="login100-form-title">
						Login for App
					</span>

                <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                    <Field placeholder={'Email'} type={'text'} className="input100" name={'email'} component={'input'}/>
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
                </div>

                <div className="wrap-input100 validate-input" data-validate="Password is required">
                    <Field placeholder={'Password'} type={'password'} className="input100" name={'password'} component={'input'}/>
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
                </div>

                <div className="container-login100-form-btn">
                    <button className="login100-form-btn">
                        Login
                    </button>
                </div>

                <div className="text-center p-t-136">
                    <NavLink to='/register' className="txt2" href="#">
                        Create your Account
                        <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                    </NavLink>
                </div>
            </form>
        </div>
    );
}

const ReduxAuthForm = reduxForm({form: "login"})(AuthForm)

export default ReduxAuthForm