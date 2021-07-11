import {authAPI} from "../../api/api";

const SET_AUTH = "SET_AUTH"
const SET_REG = "SET_REG"
const LOADER_STATE = "LOADER_STATE"
const SHOULD_REDIRECT = "SHOULD_REDIRECT"

let initialState = {
    id: null,
    name: null,
    email: null,
    isAuth: false,
    loader: false,
    shouldRedirect: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                ...action.payload
            }
        case SET_REG:
            return {
                ...state,
                ...action.payload
            }
        case LOADER_STATE:
            return {
                ...state,
                loader: action.loader
            }
        case SHOULD_REDIRECT:
            return {
                ...state,
                shouldRedirect: action.shouldRedirect
            }
        default:
            return state
    }
}

export const loaderState = (boolen) => {
    return {
        type: LOADER_STATE,
        loader: boolen
    }
}

export const shouldRedirect = (boolen) => {
    return {
        type: SHOULD_REDIRECT,
        shouldRedirect: boolen
    }
}

export const registerThunk = (formData) => {
    let {email, name, password} = formData
    return (dispatch) => {
        dispatch(loaderState(true))
        return authAPI.register(email, name, password)
            .then(response => {
                localStorage.setItem('token', response.data.token)
                return new Promise(resolve => {
                    setTimeout(() => {
                        dispatch(loaderState(true))
                        dispatch(authThunk(localStorage.getItem('token')))
                        resolve()
                    }, 2000)
                }).then(() => dispatch(loaderState(false)))
            })
            .finally(response => {
                dispatch(loaderState(false))
            })
    }
}

export const setAuth = (id, name, email, isAuth, token) => {
    return {
        type: SET_AUTH,
        payload: {
            id,
            name,
            email,
            isAuth
        }
    }
}

export const logoutThunk = (token) => {
    return (dispatch) => {
        localStorage.removeItem('token')
        dispatch(setAuth(null, null, null, false))
        dispatch(shouldRedirect(false))
    }
}

export const authThunk = (token) => {
    return (dispatch) => {
        dispatch(loaderState(true))
        return authAPI.checkAuth(token)
            .then(response => {
                let {id, name, email} = response.data
                dispatch(setAuth(id, name, email, true, token))
                dispatch(shouldRedirect(true))
            })
            .finally(() => {
                dispatch(loaderState(false))
            })
    }
}

export const loginThunk = (formData) => {
    let {email, password} = formData
    return (dispatch) => {
        dispatch(loaderState(true))
        authAPI.login(email, password)
            .then(response => {
                localStorage.setItem('token', response.data.token)
                return new Promise(resolve => {
                    setTimeout(() => {
                        dispatch(loaderState(true))
                        dispatch(authThunk(response.data.token))
                        resolve()
                    }, 2000)
                }).then(() => dispatch(loaderState(false)))
            })
            .finally(response => {
                dispatch(loaderState(false))
            })
    }
}

export default authReducer