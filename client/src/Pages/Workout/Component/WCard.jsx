import React from 'react'
import './WCard.css'
import {BiRightArrowAlt} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
const WCard = ({workout}) => {
  const header = useNavigate();
  const gotoWorkout = ()=>{
    header(`/singleworkout/${workout._id}`);
  }
  return (
    <>
 
 <div className="col-md-4 col-xs-12">
<div className="dcard my-2 mx-2">
  
  <span className="description"><i className="fa-solid fa-dumbbell"></i>  {workout.category}</span>
  <h3 className="blog-title mt-1">{workout.name}</h3>
<p className="ex-title"><i className="fa-solid fa-person-running"></i> Exercises: <strong>
({workout.exercises.length})  </strong></p>
  <div className="tags">
{workout.tags.map((tag)=>(
  <button className="ctn">#{tag}</button>
))}
  </div>
<div className="fluid-container">
  <div className="text-primary float-end" style={{cursor:'pointer'}} onClick={gotoWorkout}>View <BiRightArrowAlt style={{fontSize:'20px'}}/></div>
</div>

</div> 
 


</div>
    </>
  )
}

export default WCard
