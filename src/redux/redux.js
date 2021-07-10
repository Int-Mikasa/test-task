import authReducer from "./reducers/AuthReducer";
import { reducer as formReducer} from 'redux-form'
import {applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import postReducer from "./reducers/PostReducer";

const {combineReducers} = require("redux");
const {createStore} = require("redux");


let redusers = combineReducers({
    auth: authReducer,
    post: postReducer,
    form: formReducer
})

let store = createStore(redusers, applyMiddleware(thunkMiddleware))

window.store = store

export default store