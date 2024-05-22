import React, { useState ,useContext, useEffect} from 'react'
import { UserContext } from '../../context/userContext'
import {Link, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import DeletePost from '../../pages/CRUD/DeletePost'
import Loader from '../../components/loader'

const Dashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {id} = useParams();

  // Redirect to login page for anu user not logged in
  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token;
  useEffect(() => {
    if (!token){
      navigate('/login');
    }
  }, [])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/users/${id}`,{withCredentials:true, headers: {Authorization: `Bearer ${token}`}});
        setPosts(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchPosts();
  })

  if(isLoading) {
    return <Loader />
  }
  return (
    <section className="dashboard">
      {
        posts.length ? <div className="container dashboard__container">
          {
            posts.map(post => {
              return <article key={post.id} className='dashboard__post'>
                <div className="dashboard__post-info">
                  <div className="dashboard__post-thumbnail">
                    <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" />
                  </div>
                  <h5>{post.title}</h5>
                </div>
                <div className="dashboard__post-actions">
                  <Link to={`/posts/${post._id}`} className='btn sm'>View</Link>
                  <Link to={`/posts/${post._id}/edit`} className='btn sm primary'>Edit</Link>
                  <DeletePost postId={post._id} />
                </div>

              </article>

            })

          }
        </div> : <h2 className='center'>You have no posts</h2>
      }
    </section>
  )
}
export default Dashboard
