import React from 'react'
import './WCard.css'
import {BiRightArrowAlt} from 'react-icons/bi'
const WCard = ({workout}) => {
    
  return (
    <>
 
 <div class="col-md-4 col-xs-12">
<div class="dcard my-2 mx-2">
  
  <span class="description"><i class="fa-solid fa-dumbbell"></i>  {workout.category}</span>
  <h3 class="blog-title mt-1">{workout.name}</h3>
<p className="ex-title"><i class="fa-solid fa-person-running"></i> Exercises: <strong>
({workout.exercises.length})  </strong></p>
  <div className="tags">
{workout.tags.map((tag)=>(
  <button class="ctn">#{tag}</button>
))}
  </div>
<div className="fluid-container">
  <div className="text-primary float-end">View <BiRightArrowAlt style={{fontSize:'20px'}}/></div>
</div>

</div> 
 


</div>
    </>
  )
}

export default WCard
