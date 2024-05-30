import React from 'react'
import { useLocation } from 'react-router-dom';

const SingleDiet = () => {
  
  const location = useLocation();
  const data = location.state?.singlediet; 

  if (!data) {
      return <h2>No data found.</h2>;
  }
  return (
    <div>
      <h2>{data.name}</h2>
    </div>
  )
}

export default SingleDiet
