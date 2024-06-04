import React, { useEffect, useState } from 'react'
import {Bar} from 'react-chartjs-2'
import {useSelector} from 'react-redux'
import Loader from '../../../Components/Loader/Loader'
import {Chart as ChartJs,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js'
import { getsevendaycalorieRecord } from '../../../Api/internal'
ChartJs.register(
  CategoryScale,
  LinearScale,
BarElement,
  Title,
  Tooltip,
  Legend
)
const Stat = () => {
  const user =useSelector((state)=>state.user);
  const userId = user._id;
  const counter = user.num;
  const [loading,setLoading]=useState(false);
  const [blabels,setBlabels] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ])
  const [intakeData,setIntakeData] = useState([12,23,34,24,24,12,40])
  const [burnData,setBurnData] = useState([32,33,14,44,54,72,1])
  const fetchdata = async()=>{
setLoading(true);
try{
const response = await getsevendaycalorieRecord(userId,"7");
if(response.status == 200){
  setBlabels(response.data.labels);
  setIntakeData(response.data.calorieIntake)
  setBurnData(response.data.calorieBurn)
}
}catch(e){
  console.log(e)
}

setLoading(false)
  }

  const data ={
    labels:blabels,
    datasets:[
      {
        label:"Calories Intake",
        data:intakeData,
        backgroundColor:"rgb(75,192,192)"
      },
      {
        label:"Calories Burn",
        data:burnData,
        backgroundColor:"#00000",
      }
    ]
  }
  const options ={
    responsive:true,
    plugins:{
      legend:{
        position:"bottom"
      },
      title:{
        display:true,
        text:"Last 7 Days Calories Records"
      }
    },scales:{
      x: {
        ticks: {
          display: true,
        },
  
        // to remove the x-axis grid
        grid: {
          drawBorder: false,
          display: false,
        },
      },
      y:{
        ticks: {
          display: true,
        },
  
        // to remove the x-axis grid
        grid: {
          drawBorder: false,
          display: false,
        },
      },
    }
  }
  useEffect(()=>{
    fetchdata();
  },[counter])
  if(loading){
    return <Loader text="loading data..."/>
  }
  return (
    <div className='charts'>
         <Bar options={options} data={data}/>
 
    </div>
  )
}

export default Stat
