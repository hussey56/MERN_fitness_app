import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addcalorie } from "../../../Api/internal";
import { counterNum } from "../../../Store/UserSlice";
const Routine = () => {
  const userId = useSelector((state) => state.user._id);
  const dispatch = useDispatch();
  const [ctake, setCtake] = useState(1);
  const [cburn, setCburn] = useState(1);
  const handleSubmit = async (e) => {
    e.preventDefault();
     const todate = new Date();
  
    const data = {
      userId: userId,
      calorieBurn: cburn,
      calorieIntake: ctake,
      datetime: todate,
    };
    try {
      const response = await addcalorie(data);
      if (response.status == 201) {
        alert("Record Added");
        dispatch(counterNum())
      }
    } catch (e) {
      console.log(e);
    } finally {
      setCburn(1);
      setCtake(1);
    }
  };
  return (
    <div className="charts">
      <form onSubmit={handleSubmit}>
        <h2>
          Enter{" "}
          <span className="text-warning" style={{ fontFamily: "cursive" }}>
            Diet
          </span>{" "}
          Record
        </h2>
        <label htmlFor="intake">Calorie Intake</label>
        <input
          type="number"
          value={ctake}
          min={1}
          onChange={(e) => setCtake(e.target.value)}
          className="form-control"
          placeholder="Enter Calorie Intake"
          required
        />
        <label htmlFor="intake">Calorie Burn</label>

        <input
          type="number"
          value={cburn}
          min={1}
          onChange={(e) => setCburn(e.target.value)}
          className="form-control"
          placeholder="Enter Calorie Burn"
          required
        />
        <div className="mt-3">
          <button
            type="submit"
            className=" w-100 btn btn-warning text-white btn-lg "
          >
            Add to Record
          </button>
        </div>
      </form>
    </div>
  );
};

export default Routine;
