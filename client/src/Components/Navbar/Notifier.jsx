import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getalerts } from '../../Api/internal';
import { setAlerts } from '../../Store/UserSlice';

const Notifier = () => {
    const dispatch = useDispatch()
    const user = useSelector((state)=>state.user);
    const fetchAlerts = async()=>{
    const response = await getalerts(user._id);
    if(response.status == 200){
    dispatch(setAlerts(response.data));
    }
    }
    useEffect(()=>{
      setInterval(fetchAlerts,5000)
      
    },[])
  return (
    <> 
    </>
  )
}

export default Notifier
