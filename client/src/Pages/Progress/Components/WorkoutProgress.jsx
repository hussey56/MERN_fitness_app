import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import Loader from '../../../Components/Loader/Loader'
import { getUserWorkoutProgress } from '../../../Api/internal'
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  plugins,
} from "chart.js";
ChartJs.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
const WorkoutProgress = () => {
  const [mydata,setMyData] = useState([1,1,1,1,1]);
  const [loading,setLoading] =useState(false);
  const userId = useSelector((state)=>state.user._id);

  const fetchUserWorkout = async()=>{
    setLoading(true);
    try{
      const response = await getUserWorkoutProgress(userId);
if(response.status == 200){
  setMyData(response.data);
}
    }catch(e){
      console.log(e);
    }
setLoading(false);
  }
  const data = {
    labels: ["Cardio", "Strength Training", "Flexibility & Balance", "Circuit training", "Body Weight Workout"],
    datasets: [
      {
        label: "Daily Workout % ",
        data: mydata,
        backgroundColor: ["skyblue", "orange", "purple", "green", "orange"],
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Daily Workout Conversion Ratio",
        position: "bottom",
        padding: {
          top: 10,
          bottom: 10,
        },
        font: {
          size: 20,
          family: "Arial",
        },
        color: "#000000",
      },
    },
  };
  useEffect(()=>{
    fetchUserWorkout()
  },[])
  if(loading){
    return <Loader text="Loading Workout Ratio ..."/>
  }
  return (
    
    <div className="piechart">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default WorkoutProgress;
