import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DietCard from './Component/DietCard/DietCard';
import DSearch from './Component/SearchBox/DSearch';
import { getdiets } from '../../Api/internal';
import { setDiet } from '../../Store/DietSlice';
const MyDiet = () => {
  const diets = useSelector((state)=>state.diet.diets);
  const userId = useSelector((state)=>state.user._id);
  const dispatch = useDispatch();
 
  const gotoAddDiet=()=>{
 
  }
  const fetchDiets = async()=>{
    const response = await getdiets(userId);
    if(response.status === 200){
dispatch(setDiet(response.data.diets))
    }else{
      alert("error");
    }
  }
  useEffect(()=>{
    fetchDiets();
  },[])
  return (
    <div className="container">
<DSearch/>
      <div className="row my-3">
        {diets.length === 0 && <h2 className='text-center'>No Diet Found</h2>}
      <div className="container col-md-4 col-12 my-2">
        <div className='empty-diet-card'>
        <i class="text-warning fa-solid fa-circle-plus"></i>

<p className='text-center'>Add Diet</p>
</div>
        </div>

{diets.length >=1 && diets.map((diet)=>(
      <DietCard key={diet._id} diet={diet}/>

))}

      </div>
    </div>
  )
}

export default MyDiet
