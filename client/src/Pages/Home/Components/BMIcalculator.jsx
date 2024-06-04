import React, { useEffect, useState } from 'react'
import {BiSolidBookAdd} from 'react-icons/bi'
const BMIcalculator = () => {
  const [height, setHeight] = useState(1);
  const [weight, setWeight] = useState(1);
  const [bmi, setBMI] = useState(null);
  const [message, setMessage] = useState("");

    const handleSubmit =async(e)=>{
      e.preventDefault();
        const weightInKg = parseFloat(weight);
        const heightInM = parseFloat(height) / 100; 
          const bmiValue = (weightInKg / (heightInM * heightInM));
          setBMI(bmiValue.toFixed(2)); 
       }
       useEffect(()=>{
        if (bmi < 18.5) {
          setMessage("Underweight")
         } else if (bmi >= 18.5 && bmi <= 25) {
           setMessage("Normal weight");
         } else if (bmi > 25 && bmi <= 29.9) {
           setMessage("Overweight");
         } else {
           setMessage("Obese");
         }
             
       },[bmi])
      
        return (
          <div className="dcharts">
      <h2>Calculate <span className="text-info" style={{fontFamily:'cursive'}}>BMI</span></h2>
      <label htmlFor="intake">Height (cm)</label>
      <input type="number" className="form-control"  value={height}
            onChange={(e) => setHeight(e.target.value)} placeholder="Enter Your Height" required />
      <label htmlFor="intake">Weight (kg)</label>
      
      <input type="number"  className="form-control"  value={weight}
            onChange={(e) => setWeight(e.target.value)} placeholder="Enter Your Weight" required />
      <div className="mt-3">
      <button onClick={handleSubmit} disabled={height==0 || weight == 0} className=" w-100 btn btn-info text-white btn-lg ">Calculate</button>
      {bmi && (
        <div className='mt-2'>
          <h5 className='text-center my-2'>Your BMI is: {bmi}  <span className='text-dark'>( <span className='text-info'>{message}</span> )</span>             <button className=' my-1 btn btn-outline-info '><BiSolidBookAdd/> Add to Record</button>
</h5>
        </div>
      )}
    
      </div>
      
          </div>
        );
}

export default BMIcalculator
