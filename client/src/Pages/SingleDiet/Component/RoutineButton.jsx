import React, { useEffect, useRef, useState } from 'react'
import { adddiet, checkDiet, removeDiet } from '../../../Api/internal';
import {useSelector} from'react-redux'
const RoutineButton = ({data}) => {
    const userId = useSelector((state)=>state.user._id)
    const [time, setTime] = useState('08:00'); // Initial time
const [availabe,setAvailable] = useState(false);
const [loading,setLoading] = useState(false);
const handleTimeChange = (e) => {
  console.log(e.target.value)
  setTime(e.target.value);
};
const openRef = useRef();
const closeRef = useRef();
const handelAddRoutine = async(e)=>{
  e.preventDefault();

  if(availabe == false){
    const cdata = {
      uId:userId,
      id:data._id,
  name:data.name,
  time:time
  }
  const response = await adddiet(cdata);
  if(response.status === 200){
      check();
  }else{
      alert("not added to diet");
  }
  closeRef.current.click();
  }else{
    const response = await removeDiet(userId,data._id);
  if(response.status === 200){
      check();
  }else{
      alert("Not Removed");
  }
  }

}
const check = async()=>{
  setLoading(true)
  const response = await checkDiet(userId,data._id);
  if(response.status == 200){
    setAvailable(response.data.available);
  }
  setLoading(false)
}
useEffect(()=>{
  check();
},[data])
if(loading){
  return<></>
}
  return (
    <>
    {availabe == true ? 
     <button className="btn btn-success mx-1  my-1 btn-lg" onClick={handelAddRoutine}>
     Remove from Routine
   </button>
    
    : <>
    <button className="btn btn-outline-success mx-1  my-1 btn-lg" onClick={()=>openRef.current.click()}>
    Add to Routine
  </button>
    
     
<input type="hidden" ref={openRef}  data-bs-toggle="modal"
            data-bs-target="#OpenDietModal" />
      <div
        className="modal fade"
        id="OpenDietModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-6" id="exampleModalLabel">
                Do you want to add this diet plan into your routine?
              </h1>
            </div>
<form onSubmit={handelAddRoutine} >
<div className="modal-body">
  <label htmlFor="time">Schedule Timing:  
  </label>
  <input type="time" name="time" value={time} onChange={handleTimeChange} className="form-control" required />

</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={closeRef}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-success"
              >
                Add
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
      </>}
    </>
  )
}

export default RoutineButton
