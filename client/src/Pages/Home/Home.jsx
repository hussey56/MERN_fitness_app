import React from 'react'
import { useSelector } from 'react-redux';
import { signout } from '../../Api/internal';
import { resetUser } from '../../Store/UserSlice';
import {useDispatch} from 'react-redux'
import { NavLink } from 'react-router-dom';
import Card from '../../Components/Card/Card';
import Routine from './Components/Routine';
import Stat from './Components/Stat';
import Graphs from './Graphs';
const Home = () => {
  const dispatch = useDispatch();
  const  Auth = useSelector((state)=>state.user);

  return (
    <>
    <h1 className='welcome'><span style={{fontWeight:'600'}}>Welcome to </span><span  className="text-primary"
              style={{ fontFamily: "cursive", fontWeight: "bold" }}>F</span>Tracker ! <span id='name'>{Auth.username}</span></h1>
   
   <Graphs/>
   <Card/>
  
  
    </>
  )
}

export default Home
