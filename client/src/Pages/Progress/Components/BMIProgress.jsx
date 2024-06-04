import React from 'react'
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
  const data ={
    labels:[
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    datasets:[
      {
        label:"BMI Record",
        data:[12,23,34,24,24,12,40],
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
  return (
    <div className='col-md-12 mt-3'>
       <div className="container  genpdf">
      <select  className='form-control'  >
        <option value="7">Last 7 Days</option>
        <option value="30">Last 30 Days</option>
      </select>
      <button  className='btn btn-info text-white '>Genrate PDF</button>
      </div>
      <div className="barchart">
<Line data={data} options={options}/>
      </div>
    </div>
  )
}

export default BMIProgress
