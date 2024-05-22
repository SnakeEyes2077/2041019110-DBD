import React from 'react'
import { Link } from "react-router-dom"
import PostAuthor from './PostAuthor'

const PostItem = ({ postID, category, title, description, authorID, thumbnail, createdAt }) => {
    const shortDescription = description.length > 125 ? description.substr(0, 125) + ' . . .' : description;
    const postTitle = description.length > 30 ? title.substr(0, 30) + ' . . .' : title;
    return (
        <article className="post">
            <Link to={`/posts/${postID}`}>
                <div className="post__thumb">
                    <img className="post__thumb_img" src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`} alt={title} />
                </div>
                <div className="post__content">
                    <Link to={`/posts/${postID}`}>
                        <h3>{postTitle}</h3>
                    </Link>
                    <p dangerouslySetInnerHTML={{__html :shortDescription}}></p>
                    <div className="post__btm">
                        <PostAuthor authorID={authorID} createdAt={createdAt} />
                        <div>
                            <Link to={`/posts/categories/${category}`} className='btn category'>{category}</Link>
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    )
}

export default PostItem
