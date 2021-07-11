import React, {useEffect, useState} from "react";
import './Posts.css'
import Photo from '../../assets/images/000000843.jpg'
import {Redirect} from "react-router-dom";
import ReduxEditPostForm from "./EditPost";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {postsThunk} from "../../redux/reducers/PostReducer";
import EditPost from "./EditPost";


const Posts = (props) => {
    let [textId, setTextId] = useState('')
    let portionSize = 10

    const logout = () => {
        props.logout()
    }

    const deletePost = (id) => {
        props.deletePost(id)
    }

    const getPostsById = (id) => {
        props.getPostsById(id)
    }

    useEffect(() => {
        props.postsThunks()
    }, [])

    let pagesCount = props.lastPage
    if(props.posts == false) {
        pagesCount = 0
    }
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let [pageNumber, setPageNumber] = useState(1)
    if(pageNumber === null) setPageNumber(1)

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    useEffect(() => {
        props.onPageChanged(leftPortionPageNumber)
    }, [leftPortionPageNumber])

    if (!props.isAuth) {
        return <Redirect to='/login'/>
    }
    return (
        <div className="wrap-posts">
                <div className="posts">
                    <div className="posts-post">
                        <input type="number" onChange={(e) => setTextId(e.target.value)} className="input100" value={textId} placeholder='Search'/>
                        <button onClick={() => getPostsById(textId)} className='btn-add'>Search id</button>
                        <button onClick={() => props.postsThunks()} className='btn-all'>Search all</button>
                        <div className=''>
                            {props.posts.map(p => <Post updatePost={props.updatePost} deletePost={deletePost} id={p.id} key={p.id} title={p.title} price={p.price} isAvaliable={p.is_available}/>)}
                        </div>
                        <div className="user-pages">
                            {
                                portionNumber > 1 &&
                                <button onClick={() => {
                                    setPortionNumber(portionNumber - 1)
                                }}>Prev</button>
                            }
                            {
                                pages
                                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                                    .map(p => {
                                        return <span className={props.currentPage === p ? "current-page" : 'page'}
                                                     onClick={() => {
                                                         props.onPageChanged(p)
                                                     }}>{p}</span>
                                    })
                            }
                            {
                                portionCount > portionNumber &&
                                <button onClick={() => {
                                    setPortionNumber(portionNumber + 1)
                                }}>Next</button>
                            }
                        </div>
                    </div>
                    <form onSubmit={props.handleSubmit}>
                    <div className="posts-second-block">
                        <div className="posts-user-name">
                            Your name: <span>{props.name}</span>
                            <div>
                                <button className='btn-add'>
                                   AddPost
                                </button>
                                <div>
                                    <div className="">
                                        <div className='add-title'>
                                            <Field placeholder={'AddTitle'} type={'text'} className="input100" name={'title'} component={'input'}/>
                                        </div>
                                        <div>
                                            <Field placeholder={'AddPrice'} type={'number'} className="input100" name={'price'} component={'input'}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="posts-user-logout">
                            <button onClick={() => logout()}>Logout</button>
                        </div>
                    </div>
                    </form>
                </div>
        </div>
    )
}

export const ReduxPostsForm = reduxForm({form: "addPost"})(Posts)

const Post = (props) => {
    let [edit, setEdit] = useState(false)

    return (
        <div>
            {edit ? <EditPost id={props.id} updatePost={props.updatePost} title={props.title} price={props.price} setEdit={setEdit}/>
                : <div className="wrapper">
                    <div className="post">
                        <span>Id:{props.id} Title: </span>
                        {props.title}
                    </div>
                    <div className="post">
                        <span>Price: </span>
                        {props.price}
                    </div>
                    <div className="post-edit">
                        <button onClick={() => setEdit(true)}>Edit</button>
                    </div>
                    <div>
                        <button onClick={() => props.deletePost(props.id)} className="post-btn">&times;</button>
                    </div>
                </div>
            }
        </div>
    );

}

export default Posts
