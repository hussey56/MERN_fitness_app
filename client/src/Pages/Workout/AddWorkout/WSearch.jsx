import React, { useState } from 'react'
import {BiSearch} from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux';
import { setWorkout } from '../../../Store/WorkoutSlice';
import {  searchworkouts } from '../../../Api/internal';

const WSearch = () => {
    const workouts = useSelector((state)=>state.workout.workouts);
    const userId = useSelector((state)=>state.user._id);
    
const dispatch = useDispatch();

    const [search,setSearch] = useState("");
    const handleSearch = async()=>{
        const data ={
            searchString:search
        }
        const response = await searchworkouts(data);
        if(response.status === 200){
    dispatch(setWorkout(response.data.results))
        }else{
          alert("error");
        }
      }

  return (
    <div className="w-search-box m-auto mt-4">
    <input type="text" placeholder='e.g: Cardio Workouts' onChange={(e)=>setSearch(e.target.value.toLowerCase())} />
    <BiSearch className='search-icon text-primary' onClick={handleSearch}/>
    
              </div>
  )
}

export default WSearch
