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
const Calories = () => {

    // const data = [
    //     {
    //       name: "Mon",
    //       "Calories Eat": 220,
    //       "Calories Burn": 120,
    //     },
    //     {
    //       name: "Tue",
    //       "Calories Eat": 220,
    //       "Calories Burn": 120,
    //     },
    //     {
    //       name: "Wed",
    //       "Calories Eat": 220,
    //       "Calories Burn": 120,
    //     },
    //     {
    //       name: "Thu",
    //       "Calories Eat": 220,
    //       "Calories Burn": 120,
    //     },
    //     {
    //       name: "Fri",
    //       "Calories Eat": 220,
    //       "Calories Burn": 120,
    //     },
    //     {
    //       name: "Sat",
    //       "Calories Eat": 220,
    //       "Calories Burn": 120,
    //     },
    //     {
    //       name: "Sun",
    //       "Calories Eat": 220,
    //       "Calories Burn": 120,
    //     },
    //   ];
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
      responsive:true
    }
  return (
    <div className='col-md-12'>
    <div className='barchart'>
    <Bar options={options} data={data}/>
    </div>
      {/* <Line options={options} data={data}/> */}
   
    </div>
  )
}

export default Calories
