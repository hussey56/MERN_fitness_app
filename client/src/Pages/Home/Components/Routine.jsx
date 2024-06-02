import React from "react";

const Routine = () => {
 const handleSubmit =async(e)=>{
  e.preventDefault();
 }
  return (
    <div className="charts">
      <form onSubmit={handleSubmit}>
<h2>Enter <span className="text-warning" style={{fontFamily:'cursive'}}>Diet</span> Record</h2>
<label htmlFor="intake">Calorie Intake</label>
<input type="number" min={1} className="form-control" placeholder="Enter Calorie Intake" required />
<label htmlFor="intake">Calorie Burn</label>

<input type="number" max={1} className="form-control" placeholder="Enter Calorie Burn" required />
<div className="mt-3">
<button type="submit" className=" w-100 btn btn-warning text-white btn-lg ">Add to Record</button>

</div>
</form>

    </div>
  );
};

export default Routine;
