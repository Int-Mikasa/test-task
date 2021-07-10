import axios from "axios";

let token = localStorage.getItem('token')

let instanse = axios.create({
    baseURL: 'https://interview.nerdzlab.dev/api/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
    }
})

export const authAPI = {
    checkAuth(toke) {
        token = toke
        return instanse.get(`me`).then(response => response.data)
    },
    login(email,password, toke) {
        return instanse.post(`auth/login`, {
            email,
            password,
        })
    },
    register(email, name, password) {
        return instanse.post('auth/register', {
            email,
            name,
            password
        })
    }
}

export const postsAPI = {
    getPost(currentPage, count) {
        return instanse.get(`posts?page=${currentPage}&count=${count}`)
    },
    addPost(title, price, is_available) {
        return instanse.post(`posts`, {
            title,
            price,
            is_available
        })
    },
    getPostById(id) {
        return instanse.get(`posts/${id}`)
    },
    deletePost(id) {
        return instanse.delete(`posts/${id}`)
    },
    updatePost(title, price, id, is_available) {
        return instanse.post(`posts/${id}`, {
            title,
            price,
            is_available
        })
    }
}