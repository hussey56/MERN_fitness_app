import React from 'react'
import {Bar} from 'react-chartjs-2'
import {Chart as ChartJs,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js'
ChartJs.register(
  CategoryScale,
  LinearScale,
BarElement,
  Title,
  Tooltip,
  Legend
)
const Stat = () => {
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
        text:"Last Week Calories Records"
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
  return (
    <div className='charts'>
         <Bar options={options} data={data}/>
 
    </div>
  )
}

export default Stat
