import React, {useEffect, useState} from 'react'
import '../../App.css'
import '../Auth/Auth.css'
import {NavLink, Redirect} from "react-router-dom";
import {reduxForm, Field} from "redux-form";



const RegisterForm = (props) => {
    console.log(props.shouldRedirect)
    if(props.shouldRedirect) {
        return <Redirect to='/posts'/>
    }

    return (
        <div>
            <form onSubmit={props.handleSubmit} className="login100-form validate-form">
					<span className="login100-form-title">
						Create your account
					</span>

                <div className="wrap-input100 validate-input m-t-40 m-b-40" data-validate = "Valid email is required: ex@abc.xyz">
                    <Field placeholder={'Enter your name'} type={'text'} className="input100" name={'name'} component={'input'}/>
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
                </div>

                <div className="wrap-input100 validate-input m-t-40 m-b-40" data-validate = "Valid email is required: ex@abc.xyz">
                    <Field placeholder={'Enter your email'} type={'text'} className="input100" name={'email'} component={'input'}/>
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
                </div>

                <div className="wrap-input100 validate-input m-b-50 m-t-40" data-validate="Password is required">
                    <Field placeholder={'Enter your password'} type={'text'} className="input100" name={'password'} component={'input'}/>
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
                </div>

                <div className="container-login100-form-btn">
                    <button className="login100-form-btn">
                        Create account
                    </button>
                </div>

                <div className="text-center p-t-20">
                    <NavLink to='/login' className="txt2" href="#">
                        Already have an account?
                        <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                    </NavLink>
                </div>
            </form>
        </div>
    );
}

const ReduxRegisterForm = reduxForm({form: "register"})(RegisterForm)

export default ReduxRegisterForm