import React, { useRef, useState } from 'react'
import { adddiet } from '../../../Api/internal';
import {useSelector} from'react-redux'
const RoutineButton = ({data}) => {
    const userId = useSelector((state)=>state.user._id)
    const [time, setTime] = useState('08:00'); // Initial time

const handleTimeChange = (e) => {
  console.log(e.target.value)
  setTime(e.target.value);
};
const openRef = useRef();
const closeRef = useRef();
const handelAddRoutine = async(e)=>{
e.preventDefault();
const cdata = {
    uId:userId,
    id:data._id,
name:data.name,
time:time
}
const response = await adddiet(cdata);
if(response.status === 200){
    alert("added to diet");
}else{
    alert("not added to diet");
}
closeRef.current.click();

}
  return (
    <>
      <button className="btn btn-outline-success mx-1  my-1 btn-lg" ref={openRef}  data-bs-toggle="modal"
            data-bs-target="#OpenDietModal">
            Add to Routine
          </button>

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
    </>
  )
}

export default RoutineButton
