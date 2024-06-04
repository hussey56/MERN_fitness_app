import React from 'react'
import Calories from './Components/Calories'
import DietProgress from './Components/DietProgress'
import WorkoutProgress from './Components/WorkoutProgress'
import BMIProgress from './Components/BMIProgress'

const Progress = () => {
  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-12 container my-1">
          <h1 style={{fontWeight:'700'}} className='welcome text-center'>Progress <span className='text-primary'>&</span> Statistics</h1>
        </div>
        <div className="col-md-6">
        <DietProgress/>
        </div>
        <div className="col-md-6">
        <WorkoutProgress/>
        </div>

        <Calories/>
        <BMIProgress/>

      </div>
    </div>
  )
}

export default Progress
