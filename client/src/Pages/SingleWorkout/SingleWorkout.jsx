import React, { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import './SingleWorkout.css';
import ReadMore from './Component/ReadMore';
import { deleteworkout } from '../../Api/internal';
import Loader from '../../Components/Loader/Loader';
import { switchAlert } from '../../Store/WorkoutSlice';
import { MyAlert } from '../../Hooks/useAlert';
const SingleWorkout = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const header = useNavigate();
    const ModelRef = useRef();
const [loading,setLoading] = useState(false);
    const data = location.state?.data; 

    if (!data) {
        return <h2>No data found.</h2>;
    }
   const handleDelete = async (e)=>{
    e.preventDefault();
    const cdata ={
        userId:data.userId,
        deleteId:data._id
    }
    const response = await deleteworkout(cdata);
    if(response.status == 200){
ModelRef.current.click();
dispatch(switchAlert(true));
MyAlert({type:"success",message:{title:"Congrats",text:"Workout deleted successfully!"
}})
        header('/workouts')
    }else{
        dispatch(switchAlert(true));
        MyAlert({type:"error",message:{title:"Snaps!",text:"Error Occured in the workout deletion."
        }})
    }
    setLoading(false)
   }
   if(loading){
    return <Loader text='Deleting the Workout ...'/>
   }
  return (
    <div className='container'>
        <div className="singleworkout">
        <span><i class="fa-solid fa-dumbbell"></i>  {data.category}</span>

        </div>
        <div className="swcontainer mt-2 mb-1">
<h2><span>Workout : </span>{data.name}</h2>
<div>
    <button className='btn btn-outline-info mx-1  my-1 btn-lg'>Add to Routine</button>
    <button className='btn btn-danger mx-1 my-1 btn-lg' data-bs-toggle="modal" data-bs-target="#deleteModal">Delete Workout</button>
</div>
        </div>
        <div className="row mt-1 mb-2">
            {data.exercises.map((ex)=>(
                <div className="col-md-4">
        <div className="swcard">
            <div className="dwtitle">
                {ex.exerciseName}
            </div>
            <div className="swcard-body">
                <p><i class="text-danger fa-solid fa-weight-hanging mx-2"></i> <strong>Weight: </strong> {ex.weight} Kg</p>
                <p><i class="text-dark fa-solid fa-arrow-down-1-9 mx-2"></i>  <strong>Reps: </strong> {ex.reps}</p>
                <p><i class="text-danger fa-solid fa-clone mx-2"></i>  <strong>Sets: </strong> {ex.sets}</p>
               {ex.notes.length >= 1 && <> <p><i class="text-warning fa-solid fa-note-sticky mx-2"></i> <strong>Notes : </strong></p>
                <ReadMore maxLength={38} text={ex.notes} /></>}
            </div>
        </div>
    </div>
            ))}
    
</div>
        <div className="container text-center">
           <span className='btn btn-lg btn-primary mx-2'>Tags :</span> {data.tags.map((tag)=>(
                <span className='btn btn-lg btn-outline-primary mx-1'>#{tag}</span>
            ))}
        </div>
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Are you really want to delete the workout?</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
     
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" ref={ModelRef} data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default SingleWorkout
