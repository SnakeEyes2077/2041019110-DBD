import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { FaCheck } from 'react-icons/fa';
import { UserContext } from '../../context/userContext'
import axios from 'axios';



const UserProfile = () => {
  const navigate = useNavigate();
  // Redirect to login page for anu user not logged in
  const { currentUser } = useContext(UserContext)
  const token = currentUser?.token;
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [])

  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const [isAvatarTouched, setIsAvatarTouched] = useState(false)


  const changeAvatarHandler = async () => {
    setIsAvatarTouched(false);
    try {
      const postData = new FormData();
      postData.set('avatar', avatar);
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/change-avatar`, postData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
      setAvatar(response?.data.avatar)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${currentUser.id}`, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
      const {name, email, avatar} = response.data;
      setName(name);
      setEmail(email);
      setAvatar(avatar);
    }
  })

  return (
    <section className="profile">
      <div className="container profile_container">
        <Link to={`/myposts/${currentUser.id}`} className='btn'>My posts</Link>
        <div className="profile_details">
          <div className="avatar_wrapper">
            <div className="profile_avatar">
              <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`} alt="Profile Picture" />
            </div>
            <form className="avatar_form">
              <input type="file" name="avatar" id="avatar" onChange={e => setAvatar(e.target.files[0])} accept="png, jpg, jpeg" />
              <label htmlFor="avatar" onClick={() => setIsAvatarTouched(true)}><FaEdit fill="white" /></label>
            </form>
            {isAvatarTouched &&
              <button className="profile__avatar-btn" onClick={changeAvatarHandler}>
                <FaCheck fill="white" />
              </button>}
          </div>
          <h2>{currentUser.name}</h2>
          <form className="form profile_form">
            <p className="form_errMessage">This is an error message</p>
            <input type="text" placeholder='Full Name' value={name} onChange={e => setName(e.target.value)} />
            <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder='Current password' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
            <input type="password" placeholder='New password' value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            <input type="password" placeholder='Confirm new password' value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} />
            <button type="submit" className='btn primary'>Update details</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UserProfile