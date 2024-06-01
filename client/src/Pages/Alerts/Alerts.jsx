import React from 'react'
import './Alert.css'
import { BiBullseye, BiRightArrowAlt } from 'react-icons/bi'
const Alerts = () => {
  return (
    <>
      <div className="container">
        <h2 className="alert-heading">Alerts (<span className='text-primary'> 99 </span>)</h2>
        <div className="alert-container">
           <div className="alert-tile">
            <div className="icon-container bg-diet">
            <i class="text-warning fa-solid fa-utensils "></i>
            </div>
            <div className='alert-text'>
                            <span id='alert-time'>09-89-2029</span>
                            <h3>Morning Workout is scheduled tofay at 10.00 am <span className='alert-view'>view </span></h3>
                        </div>
                        
                        
            </div> 
            <div className="alert-tile">
            <div className="icon-container bg-workout">
            <i class="text-info fa-solid fa-dumbbell"></i>
                        </div>
                        <div className='alert-text'>
                            <span id='alert-time'>09-89-2029</span>
                            <h3>Morning Workout is scheduled tofay at 10.00 am                         <span className='alert-view'>view </span>
 </h3>
                        </div>
            </div> 
        </div>
      </div>
    </>
  )
}

export default Alerts
