import React from 'react'
import { useDispatch } from 'react-redux';
import { MyAlert } from '../../Hooks/useAlert';
import {switchAlert} from '../../Store/WorkoutSlice'
const MyDiet = () => {
  const dispatch = useDispatch();
 
  const showAlert=()=>{
    dispatch(switchAlert(true));

MyAlert({type:"success",message:{title:"Login Successful",text:"Welcome to Ftracker"
}})
  }
  return (
    <div>
      <h2>Nutrition Tracking</h2>
      <button type="button" className="btn btn-primary" onClick={showAlert}>Ald</button>
    </div> 
  )
}

export default MyDiet
