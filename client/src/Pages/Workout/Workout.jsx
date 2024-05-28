import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getworkouts } from '../../Api/internal'
import WSearch from './AddWorkout/WSearch'
import { setWorkout } from '../../Store/WorkoutSlice'
import WCard from './Component/WCard'
const Workout = () => {
  const header = useNavigate();
  const userId = useSelector((state)=>state.user._id);
  const workouts = useSelector((state)=>state.workout.workouts);
  const dispatch = useDispatch();
  const fetchWorkouts = async()=>{
    const response = await getworkouts(userId);
    if(response.status === 200){
dispatch(setWorkout(response.data.workouts))
    }else{
      alert("error");
    }
  }
const gotoaddworkout= ()=>{
  header('/addworkout');
}
  useEffect(()=>{
    fetchWorkouts();
  },[])
  return (
    <div className='workout-container'>
      <div className="container">

<WSearch/>
<div className="row mt-3">
{workouts.length == 0 && <h2 className="text-center">No Workout Found.</h2>}
<div className="col-md-4">
<div className="addcard" onClick={gotoaddworkout}>
  <i class="text-primary fa-solid fa-circle-plus"></i>

<p className='text-center'>Add Workout</p>
</div>
</div>

{workouts.length >= 1 && workouts.map((workout)=>{
  return <WCard key={workout._id} workout={workout}/>
})}
</div>

      </div>
    </div>
  )
}

export default Workout
