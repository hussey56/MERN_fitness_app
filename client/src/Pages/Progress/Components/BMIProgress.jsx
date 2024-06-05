import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import Loader from '../../../Components/Loader/Loader'
import { getBmiRecord,getBmiData } from '../../../Api/internal'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {Line} from 'react-chartjs-2'
import {Chart as ChartJs,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
} from 'chart.js'
ChartJs.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
)
const BMIProgress = () => {
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
  const [record,setRecords] = useState([1,1,1,1,0,1,0])
  const fetchdata = async(name)=>{
    setLoading(true);
    try{
    const response = await getBmiRecord(userId,name);
    if(response.status == 200){
      setBlabels(response.data.labels);
 setRecords(response.data.bmis)
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
        label:"BMI Records",
        data:record,
        borderColor:"rgb(75,192,192)"
      }
    ]
  }
  const options ={
    responsive:true,
    plugins:{
      legend:{
        position:"bottom",
        display:false
      },
      title:{
        display:true,
        text:"Body Mass Index (BMI) Records",
        padding: {
          top: 10,
          bottom: 20
      },
        font: {
          size: 34,
          style: 'Bold',
          family: 'cursive',
        },
        color: "#000000",

      }
    }
  
  }
  const [gen,setGen] = useState(false);
  const generatePDF = async () => {
    try {
setGen(true)
const response = await getBmiData(userId);
if(response.status == 200){
  const doc = new jsPDF();

  doc.setFontSize(18);
      doc.setTextColor(0, 0, 0); // Black color for the heading
      doc.text('User BMI Records', 105, 20, null, null, 'center');
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
        doc.text(`User: ${user.fullname} ( ${user.email})`, 14, 30);
        doc.setTextColor(255, 0, 0);

  doc.text(`Report Date: ${new Date().toLocaleDateString()}`, 14, 40);

  doc.setTextColor(0, 0, 0);
  const tableColumn = ["no.","BMI", "Status","Time"];
  const tableRows = response.data;



  doc.autoTable(tableColumn, tableRows, { startY: 50 });
  doc.save('bmi-report.pdf');
}
setGen(false)

    } catch (error) {
      console.error("Error fetching data or generating PDF:", error);
    }
  };
  useEffect(()=>{
    fetchdata(sname);
  },[sname])
  if(loading){
    return <Loader text="loading data..."/>
  }
  return (
    <div className='col-md-12 mt-3'>
       <div className="container  genpdf">
      <select  className='form-control bigselect' value={sname} onChange={(e)=>setSname(e.target.value)}  >
        <option value="7">Last 7 Entries</option>
        <option value="30">Last 30 Entries</option>
      </select>{record.length != 0 &&
      <button  className='btn btn-info text-white ' disabled={gen} onClick={generatePDF}>Genrate PDF</button>}
      </div>
      <div className="barchart">
<Line data={data} options={options}/>
      </div>
    </div>
  )
}

export default BMIProgress
