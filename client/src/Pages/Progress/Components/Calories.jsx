import React from 'react'
import {Bar} from 'react-chartjs-2'
import {Chart as ChartJs,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js'
ChartJs.register(
  CategoryScale,
  LinearScale,
BarElement,
  Title,
  Tooltip,
  Legend
)
const Calories = () => {
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
          label:"Calories Intake",
          data:[12,23,34,24,24,12,40],
          backgroundColor:"rgb(75,192,192)"
        },
        {
          label:"Calories Burn",
          data:[32,33,14,44,54,72,1],
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
          text:"Calories Records",
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
      
    <div className='barchart'>
    <Bar options={options} data={data}/>
    </div>
      {/* <Line options={options} data={data}/> */}
   
    </div>
  )
}

export default Calories
