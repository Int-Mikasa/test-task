import React, {useState} from "react";

const EditPost = (props) => {
    let [title, setTitle] = useState(props.title)
    let [price, setPrice] = useState(props.price)

    const updatePost = (title, price, id) => {
        props.updatePost(title, price, id)
        props.setEdit(false)
    }

    return (
        <div className="wrapper">
                <div className="post">
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="input100" placeholder="Title"/>
                </div>
                <div className="post">
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="input100" placeholder="Price"/>
                </div>
                <div className="post-edit">
                    <button onClick={() => updatePost(title, price, props.id)}>Save</button>
                </div>
                <div>
                    <button onClick={() => props.setEdit(false)} className="">Cancel</button>
                </div>
        </div>
    )
}

export default EditPost