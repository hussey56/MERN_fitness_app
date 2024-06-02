import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DietCard from './Component/DietCard/DietCard';
import DSearch from './Component/SearchBox/DSearch';
import { getdiets } from '../../Api/internal';
import { setDiet } from '../../Store/DietSlice';
import { switchAlert } from '../../Store/WorkoutSlice';
import { MyAlert } from '../../Hooks/useAlert';
import {useNavigate} from 'react-router-dom'
import Loader from '../../Components/Loader/Loader'
import Notifier from '../../Components/Navbar/Notifier';
const MyDiet = () => {

  const [loading,setLoading ] = useState(false);
  const diets = useSelector((state)=>state.diet.diets);
  const userId = useSelector((state)=>state.user._id);
  const dispatch = useDispatch();
 const header = useNavigate();
  const gotoAddDiet=()=>{
 header('/adddiet');
  }

  const fetchDiets = async()=>{
    setLoading(true);
    const response = await getdiets(userId);
    if(response.status === 200){
dispatch(setDiet(response.data.diets))
    }else{
      
      // dispatch(switchAlert(true));
      // const message ={
      //   title:"Server Error",
      //   message:"facing error while fetching diets"
      // }
      // MyAlert({type:"error",message})    
      console.error("Internal Server Error: Diet")

    }
      setLoading(false);

  }
  useEffect(()=>{
    fetchDiets();
  },[])
  return (
    
    <div className="container">
      <Notifier/>
      {loading ===true ? <Loader text='Loading diets... '/> :
      <>
<DSearch/>
      <div className="row my-3">
        {diets.length === 0 && <h2 className='text-center'>No Diet Found</h2>}
      <div className="col-md-4 col-12 my-2">
        <div className='empty-diet-card'>
        <i class="text-warning fa-solid fa-circle-plus" onClick={gotoAddDiet}></i>

<p className='text-center'>Add Diet</p>
</div>
        </div>

{diets.length >=1 && diets.map((diet)=>(
      <DietCard key={diet._id} diet={diet} />

))}

      </div>
      </>

      }
    </div>
  )
}

export default MyDiet
