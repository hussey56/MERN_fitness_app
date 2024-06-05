import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import './SingleWorkout.css';
import ReadMore from './Component/ReadMore';
import { deleteworkout, singleWorkout } from '../../Api/internal';
import Loader from '../../Components/Loader/Loader';
import { switchAlert } from '../../Store/WorkoutSlice';
import { MyAlert } from '../../Hooks/useAlert';
import WRoutineButton from './Component/RoutineWButton';
import Notifier from '../../Components/Navbar/Notifier';
const SingleWorkout = () => {
    
    const location = useLocation();
    const dispatch = useDispatch();
    const header = useNavigate();
    const ModelRef = useRef();
const [loading,setLoading] = useState(false);
const [data,setData] = useState(null)
const [lText,setLtext] = useState("Fetching Workout ...");
let { id } = useParams();
const fetchDetaisl =async()=>{
  setLoading(true);
  setLtext("Fetching Diet ...")
  const reponse = await singleWorkout(id);
  if(reponse.status == 200){
    setData(reponse.data.data);
  }else{
    setData(reponse.data.data)
  }
  setLoading(false);
}
   const handleDelete = async (e)=>{
    setLtext("Deleting Workout ...")
    e.preventDefault();
    const cdata ={
        userId:data.userId,
        deleteId:data._id
    }
try{
  const response = await deleteworkout(cdata);
  if(response.status == 200){
// dispatch(switchAlert(true));
// MyAlert({type:"success",message:{title:"Congrats",text:"Workout deleted successfully!"
// }})
alert("Congrats! Workout deleted successfully!")
ModelRef.current.click();
      header('/workouts')

  }else{
      // dispatch(switchAlert(true));
      // MyAlert({type:"error",message:{title:"Snaps!",text:"Error Occured in the workout deletion."
      // }})
      console.log("something went wrong Workout deleted ")
  }
}catch(e){
  console.log(e)
}

    
    setLoading(false)
   }
   useEffect(()=>{
    fetchDetaisl();
   },[])
   if (!data) {
    return <></>;
}
   if(loading){
    return <Loader text={lText}/>
   }
  return (
    <div className='container'>
        <Notifier/>
        <div className="singleworkout">
        <span><i className="fa-solid fa-dumbbell"></i>  {data.category}</span>

        </div>
        <div className="swcontainer mt-2 mb-1">
<h2><span>Workout : </span>{data.name}</h2>
<div>
    <WRoutineButton data={data}/>
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
                <p><i className="text-danger fa-solid fa-weight-hanging mx-2"></i> <strong>Weight: </strong> {ex.weight} Kg</p>
                <p><i className="text-dark fa-solid fa-arrow-down-1-9 mx-2"></i>  <strong>Reps: </strong> {ex.reps}</p>
                <p><i className="text-danger fa-solid fa-clone mx-2"></i>  <strong>Sets: </strong> {ex.sets}</p>
               {ex.notes.length >= 1 && <> <p><i className="text-warning fa-solid fa-note-sticky mx-2"></i> <strong>Notes : </strong></p>
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
        <div className="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Are you really want to delete the workout?</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
     
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" ref={ModelRef} data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default SingleWorkout
