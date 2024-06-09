import React, { useEffect, useState } from "react";
import "./Tabbar.css";
import {useSelector} from 'react-redux'
import { userdata } from "../../../Api/internal";
import DietTab from "./Tabs/DietTab";
import WorkoutTab from "./Tabs/WorkoutTab";
import CalorieTab from "./Tabs/CalorieTab";
import BMITab from "./Tabs/BMITab";
const Tabbar = () => {
  const [num, setNum] = useState(1);
  const userId = useSelector((state)=>state.user._id);
const [workouts,setWorkouts]=useState([]);
const [diets,setDiets]=useState([]);
const [counter,setCounter]=useState(1);
const fetchRoutine = async()=>{
const response = await userdata(userId);
if(response.status == 200){
    setDiets(response.data.diets);
    setWorkouts(response.data.workouts);
}
}
useEffect(()=>{
    fetchRoutine()
},[counter])
  return (
    <div className="tc">
      <div className="tabbar">
        <li
          className="list-item"
          id={num == 1 && "tabactive"}
          onClick={() => setNum(1)}
        >
          <i className="fa-solid fa-utensils"></i>
          <span className="list-item-name">Routine Diets</span>
        </li>
        <li
          className="list-item"
          id={num == 2 && "tabactive"}
          onClick={() => setNum(2)}
        >
          <i className="fa-solid fa-dumbbell"></i>
          <span className="list-item-name">Routine Workouts</span>
        </li>
        {/* <li
          className="list-item"
          id={num == 3 && "tabactive"}
          onClick={() => setNum(3)}
        >
          <i className="fa-solid fa-fire-flame-curved"></i>
          <span className="list-item-name">Calorie Records</span>
        </li>
        <li
          className="list-item"
          id={num == 4 && "tabactive"}
          onClick={() => setNum(4)}
        >
          <i className="fa-solid fa-file-waveform"></i>{" "}
          <span className="list-item-name">BMI Records</span>
        </li> */}
      </div>
      {num == 1 && (
       <DietTab diets={diets} refresh={()=>setCounter(counter+1)}/>
      )}
      {num == 2 && (
        <WorkoutTab workouts={workouts} refresh={()=>setCounter(counter+1)}/>
      )}
      {/* {num == 3 && (
       <CalorieTab/>
      )}
      {num == 4 && (
       <BMITab/>
      )} */}
    </div>
  );
};

export default Tabbar;
