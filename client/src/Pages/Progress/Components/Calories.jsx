import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import Loader from '../../../Components/Loader/Loader'
import {Bar} from 'react-chartjs-2'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {Chart as ChartJs,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js'
import { getsevendaycalorieRecord ,getCalorieData} from '../../../Api/internal'
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
 
  const [gen,setGen] = useState(false);
  const generatePDF = async () => {
    try {
setGen(true)
const response = await getCalorieData(userId);
if(response.status == 200){
  const doc = new jsPDF();

  doc.setFontSize(18);
      doc.setTextColor(0, 0, 0); // Black color for the heading
      doc.text('User Calorie Records', 105, 20, null, null, 'center');
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
        doc.text(`User: ${user.fullname} ( ${user.email})`, 14, 30);
        doc.setTextColor(255, 0, 0);

  doc.text(`Report Date: ${new Date().toLocaleDateString()}`, 14, 40);

  doc.setTextColor(0, 0, 0);
  const tableColumn = ["no.","Calorie Intake", "Calorie Burn","Time"];
  const tableRows = response.data;



  doc.autoTable(tableColumn, tableRows, { startY: 50 });
  doc.save('calorie-report.pdf');
}
setGen(false)

    } catch (error) {
      console.error("Error fetching data or generating PDF:", error);
    }
  };
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
      <div className="container genpdf">
      <select  className='form-control' value={sname} onChange={(e)=>setSname(e.target.value)}  >
        <option value="7">Last 7 Days</option>
        <option value="30">Last 30 Days</option>
      </select>{burnData.length != 0 &&
      <button  className='btn btn-info text-white ' disabled={gen} onClick={generatePDF}>Genrate PDF</button>}
      </div>
      
    <div className='barchart'>
    <Bar options={options} data={data}/>
    </div>
   
    </div>
  )
}

export default Calories
