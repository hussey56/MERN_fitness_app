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
const Calories = () => {
  const [sname,setSname] =useState("7");
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
  const fetchdata = async(name)=>{
setLoading(true);
try{
const response = await getsevendaycalorieRecord(userId,name);
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
        text:`Last ${sname} Days Calories Records`
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
    fetchdata(sname);
  },[sname])
  if(loading){
    return <Loader text="loading data..."/>
  }
  return (
    <div className='col-md-12 mt-3'>
      <div className="container  genpdf">
      <select  className='form-control' value={sname} onChange={(e)=>setSname(e.target.value)}  >
        <option value="7">Last 7 Days</option>
        <option value="30">Last 30 Days</option>
      </select>
      <button  className='btn btn-info text-white '>Genrate PDF</button>
      </div>
      
    <div className='barchart'>
    <Bar options={options} data={data}/>
    </div>
      {/* <Line options={options} data={data}/> */}
   
    </div>
  )
}

export default Calories
