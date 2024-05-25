import React from 'react'
import { useSelector } from 'react-redux';

const Home = () => {
  const  Auth = useSelector((state)=>state.user);

  return (
    <div>
      <h1>Hello to {Auth.username}</h1>
    </div>
  )
}

export default Home
