import React, { useEffect, useState } from 'react'
import {Doughnut} from 'react-chartjs-2'
import {Chart as ChartJs,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import {useSelector} from 'react-redux'
import Loader from '../../../Components/Loader/Loader'
import { getUserDietProgress } from '../../../Api/internal'
ChartJs.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const DietRecord = () => {
  const [mydata,setMyData] = useState([1,1,1,1,1]);
  const [loading,setLoading] =useState(false);
  const userId = useSelector((state)=>state.user._id);

  const fetchUserDiet = async()=>{
    setLoading(true);
    try{
      const response = await getUserDietProgress(userId);
if(response.status == 200){
  setMyData(response.data);
}
    }catch(e){
      console.log(e);
    }
setLoading(false);
  }
    const data ={
        labels:[
          "Breakfast",
          "Lunch",
          "Dinner",
          "Pre Workout",
          "Post Workout",
        ],
        datasets:[
          {
            label:"Daily Diet % ",
            data:mydata,
            backgroundColor:["skyblue","red","purple","green","orange"]
          },
        ]
      }
      const options ={
        responsive:true,
        plugins:{
            legend:{
                display:true,
                position:"bottom"
              },
              title:{
                display:true,
                text:"Diet Conversion",
                padding: {
                  top: 10,
                  bottom: 10
              },
                font: {
                  size: 20,
                  family: 'Arial',
                },
                color: "#000000",

              }
        }
      }
      useEffect(()=>{
        fetchUserDiet()
      },[])
      if(loading){
        return <Loader text="Loading Diet Ratio ..."/>
      }
  return (
    <div className='charts d-flex justify-content-center align-items-center'>
      <Doughnut options={options} data={data}/>
    </div>
  )
}

export default DietRecord
