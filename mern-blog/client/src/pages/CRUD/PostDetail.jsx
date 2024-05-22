import React, { useContext, useEffect, useState } from 'react'
import PostAuthor from '../../components/PostAuthor'
import DeletePost from '../../pages/CRUD/DeletePost'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../../context/userContext'
import Loader from '../../components/loader'
import axios from 'axios'



const PostDetail = () => {

  const { currentUser } = useContext(UserContext)


  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`)
        setPost(response.data)
      } catch (err) {
        setError(err)
      }
      setIsLoading(false)
    }
    getPost()
  }, [])

 
  if(isLoading) {
    return <Loader/>
  }

  return (
    <section className="post-detail">
      {error && <p className="form_errMessage">{error}</p>}
      {post && <div className="container post-detail_container">
          <div className="post-detail__header">
            <PostAuthor authorID={post?.creator} createdAt={post.createdAt}/>
            {currentUser?.id == post?.creator && <div className="post-btn_list">
                  <Link to={`/posts/${post?._id}/edit`} className='btn sm primary'>Edit</Link>
                  {/* <Link to={'/posts/werwer/edit'} className='btn sm danger'>Delete</Link> */}
                  <DeletePost postId={id} />
            </div>
            }
          </div>
          <h1>{post.title}</h1>
          <div className='postThumbWrap'>
            <img className='postDetailImg' src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post?.thumbnail}`} alt="" />
          </div>
          <p dangerouslySetInnerHTML={{__html: post?.description}}></p>
        </div>}
    </section>
  )
}

export default PostDetail
