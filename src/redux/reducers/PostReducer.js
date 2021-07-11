import {postsAPI} from "../../api/api";
import {loaderState} from "./AuthReducer";

const ADD_POST = "ADD_POST"
const ADD_POST_BY_ID = "ADD_POST_BY_ID"
const TOTAL_USERS_COUNT = "TOTAL_USERS_COUNT"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const LAST_PAGE = "LAST_PAGE"

let initialState = {
    posts: [],
    pageSize: 1,
    totalUsersCount: 0,
    lastPage: 0,
    currentPage: 1,
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...action.payload]
            }
        case ADD_POST_BY_ID:
            return {
                ...state,
                posts: [action.payload]
            }
        case TOTAL_USERS_COUNT: {
            return  {
                ...state,
                totalUsersCount : action.totalUsersCount }
        }
        case SET_CURRENT_PAGE: {
            return  {
                ...state,
                lastPage : action.lastPage }
        }
        case LAST_PAGE: {
            return  {
                ...state,
                lastPage : action.lastPage }
        }

        default:
            return state
    }
}

export const setPosts = (posts) => {
    return {
        type: ADD_POST,
        payload: posts
    }
}

export const setLastPage = (lastPage) => {
    return {
        type: LAST_PAGE,
        lastPage
    }
}

export const setTotalUsersCount = (totalUsersCount) => {
    return {
        type: TOTAL_USERS_COUNT,
        totalUsersCount
    }
}

export const setCurrentPage = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    }
}


export const setPostsById = (post) => {
    return {
        type: ADD_POST_BY_ID,
        payload: post
    }
}

export const getPostsById = (id) => {
    return (dispatch) => {
        return postsAPI.getPostById(id)
            .then(response => {
                dispatch(setPostsById(response.data.data))
            })
    }
}

export const updatePost = (title, price, id) => {
    let is_available = true
    return (dispatch) => {
        return postsAPI.updatePost(title,price, id, is_available)
            .then(() => {
                dispatch(postsThunk())
            })
    }
}

export const postsThunk = (currentPage = initialState.currentPage, pageSize = initialState.pageSize) => {
    return (dispatch) => {
        dispatch(loaderState(true))
        return  postsAPI.getPost(currentPage, pageSize)
            .then(response => {
                dispatch(setTotalUsersCount(response.data.data.length))
                dispatch(setPosts(response.data.data))
                dispatch(setLastPage(response.data.meta.last_page))
            })
            .finally(() => {
                dispatch(loaderState(false))
            })
    }
}

export const onPageChanged = (currentPage, pageSize = initialState.pageSize) => {
    return (dispatch) => {
        dispatch(setCurrentPage(currentPage))
        postsAPI.getPost(currentPage, pageSize)
            .then(response => {
                dispatch(setTotalUsersCount(response.data.data.length))
                dispatch(setLastPage(response.data.meta.last_page))
                dispatch(setPosts(response.data.data))
            })
    }
}

export const deletePostThunk = (id) => {
    return (dispatch) => {
        dispatch(loaderState(true))
        return  postsAPI.deletePost(id)
            .then(response => {
                dispatch(postsThunk())
            })
            .finally(() => {
                dispatch(loaderState(false))
            })
    }
}
export const addPostsThunk = (formData) => {
    let {title, price} = formData
    let is_available = true
    return (dispatch) => {
        dispatch(loaderState(true))
        postsAPI.addPost(title, price, is_available)
            .then(response => {
                dispatch(postsThunk())
            })
            .finally(response => {
                dispatch(loaderState(false))
            })
    }
}


export default postReducer