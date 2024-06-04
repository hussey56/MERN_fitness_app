import React from 'react'

const BMIcalculator = () => {
    const handleSubmit =async(e)=>{
        e.preventDefault();
       }
        return (
          <div className="charts">
            <form onSubmit={handleSubmit}>
      <h2>Calculate <span className="text-info" style={{fontFamily:'cursive'}}>BMI</span></h2>
      <label htmlFor="intake">Height</label>
      <input type="number" min={1} className="form-control" placeholder="Enter Calorie Intake" required />
      <label htmlFor="intake">Weight</label>
      
      <input type="number" max={1} className="form-control" placeholder="Enter Calorie Burn" required />
      <div className="mt-3">
      <button type="submit" className=" w-100 btn btn-info text-white btn-lg ">Calculate</button>
      
      </div>
      </form>
      
          </div>
        );
}

export default BMIcalculator
