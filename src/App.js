import './App.css';
import Auth from "./components/Auth/Auth";
import {Route, Redirect} from "react-router-dom";
import {authThunk, loginThunk, logoutThunk, registerThunk} from "./redux/reducers/AuthReducer";
import {connect} from "react-redux";
import Register from "./components/Register/Register";
import Loader from "./assets/1480.gif"
import React, {useEffect, useState} from "react";
import Posts, {ReduxPostsForm} from "./components/Posts/Posts";
import {postsAPI} from "./api/api";
import {
    addPostsThunk,
    deletePostThunk,
    getPostsById, onPageChanged,
    postsThunk,
    setCurrentPage, setTotalUsersCount,
    updatePost
} from "./redux/reducers/PostReducer";

function App(props) {

    let onSubmitLogin = (formData) => {
        props.loginThunk(formData)
    }

    let onSubmitRegister = (formData) => {
        props.registerThunk(formData)
    }

    let onSubmitAddPost = (formData) => {
        props.addPostsThunk(formData)
    }

    let upPosts = () => {
        props.postsThunk()
    }

    const logout = () => {
        props.logoutThunk()
    }

    useEffect(() => {
        props.authThunk()
    },[])

    // if(props.loader) {
    //     return <div className="limiter">
    //         <div className="container-login100">
    //             <div className="wrap-loader">
    //                 <img src={Loader} alt="Loader"/>
    //             </div>
    //         </div>
    //     </div>
    // }


    return (
        <div className="limiter">
            <div className="container-login100">
                <Route path='/' render={() => <Redirect to='/login'/>}/>
                <Route path='/login' render={() => <Auth isAuth={props.isAuth} onSubmit={onSubmitLogin}/>}/>
                <Route path='/posts' render={() => <ReduxPostsForm totalUsersCount={props.totalUsersCount}
                                                                   currentPage={props.currentPage}
                                                                   setTotalUsersCount={props.setTotalUsersCount}
                                                                   setCurrentPage={props.setCurrentPage}
                                                                   updatePost={props.updatePost}
                                                                   deletePost={props.deletePostThunk}
                                                                   getPostsById={props.getPostsById}
                                                                   postsThunks={props.postsThunk}
                                                                   posts={props.posts}
                                                                   onSubmit={onSubmitAddPost}
                                                                   logout={logout}
                                                                   isAuth={props.isAuth}
                                                                   name={props.name}
                                                                   onPageChanged={props.onPageChanged}
                                                                   pageSize={props.pageSize}
                                                                   lastPage={props.lastPage}
                                                                   id={props.id}/>}/>
                <Route path='/register' render={() => <Register shouldRedirect={props.shouldRedirect} onSubmit={onSubmitRegister}/>}/>
            </div>
        </div>
    );
}

let mapStateToProps = (state) => {
    return {
        email: state.auth.email,
        isAuth: state.auth.isAuth,
        loader: state.auth.loader,
        name: state.auth.name,
        id: state.auth.id,
        posts: state.post.posts,
        totalUsersCount: state.post.totalUsersCount,
        currentPage: state.post.currentPage,
        pageSize: state.post.pageSize,
        shouldRedirect: state.auth.shouldRedirect,
        lastPage: state.post.lastPage
    }
}


let AppContainer = connect(mapStateToProps, {onPageChanged, setCurrentPage, setTotalUsersCount, loginThunk, registerThunk, authThunk, logoutThunk, addPostsThunk, postsThunk, getPostsById, deletePostThunk, updatePost})(App)

export default AppContainer;
