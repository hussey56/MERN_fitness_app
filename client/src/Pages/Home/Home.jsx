import React from 'react'
import { useSelector } from 'react-redux';
import { signout } from '../../Api/internal';
import { resetUser } from '../../Store/UserSlice';
import {useDispatch} from 'react-redux'
const Home = () => {
  const dispatch = useDispatch();
  const  Auth = useSelector((state)=>state.user);
const Logout = async()=>{
  await signout();
  dispatch(resetUser());
}
  return (
    <div>
      <h1>Hello to {Auth.username}</h1>
      <button onClick={Logout}>Logout</button>
    </div>
  )
}

export default Home
