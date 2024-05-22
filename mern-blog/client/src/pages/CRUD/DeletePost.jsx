// import React, { useContext, useEffect } from 'react'
// import { UserContext } from '../../context/userContext'
// import { Link, useNavigate, useLocation } from 'react-router-dom'
// import axios from 'axios';


// const DeletePost = ({ postId: id }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   // Redirect to login page for anu user not logged in
//   const { currentUser } = useContext(UserContext)
//   const token = currentUser?.token;
//   useEffect(() => {
//     if (!token) {
//       navigate('/login');
//     }

//     const removePost = async (id) => {
//       try {
//         const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })
//         if (response.status == 200) {
//           if (location.pathname == `/myposts/${currentUser.id}`) {
//             navigate(0)
//           } else {
//             navigate('/')
//           }
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }



//   }, [])
//   return (
//     <link className="btn sm danger" onClick={() => removePost(id)}>Delete</link>
//   )
// }

// export default DeletePost
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const DeletePost = ({ postId: id }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  // Declare removePost outside the useEffect
  const removePost = async (id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        if (location.pathname === `/myposts/${currentUser.id}`) {
          navigate(0);
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);

  return <Link className="btn sm danger" onClick={() => removePost(id)}>Delete</Link>;
};

export default DeletePost;
