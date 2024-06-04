import React from 'react'
import BMIcalculator from './Components/BMIcalculator'
import DietRecord from './Components/DietRecord'

const BMInChart = () => {
  return (
    <div className="container my-3">
    <div className="row">
  
        <div className="col-md-6">
            <BMIcalculator/>
        </div>
        <div className="col-md-6">
            <DietRecord/>
        </div>
       
        </div>
      
    </div>
  )
}

export default BMInChart
