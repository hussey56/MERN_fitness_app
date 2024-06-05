import React, { useState } from 'react'
import './ProfileCard.css'
import {useDispatch, useSelector} from 'react-redux'
import img from './emp.jpg'
import {signout} from '../../../Api/internal'
import {resetUser} from '../../../Store/UserSlice'
const ProfileCard = () => {
    const [image,setImage]=useState(img)
    const dispatch = useDispatch()
    const user = useSelector((state)=>state.user);
    const Logout = async () => {
        await signout();
        dispatch(resetUser());
        
    
      };
  return (
    <div className='profilecenter'>
     <div className="card-container">
	{user.profileImage != "" &&<img className="round" src={user.profileImage} alt="user" />}
    {user.profileImage == "" &&<img className="round" src={image} alt="user" />}

    <h3 id='profilename text-dark'>{user.fullname}</h3>
	<h6 id='profilesub text-secondary'>@{user.username}</h6>
	<p id='profilep text-dark'>{user.email}</p>
	<div className="d-flex align-items-center justify-content-center gap-2">
		<button className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#profileModal">Edit Profile</button>
		<button className='btn btn-outline-info' onClick={Logout}>Logout</button>
	</div>	
</div>
 
    </div>
  )
}

export default ProfileCard
