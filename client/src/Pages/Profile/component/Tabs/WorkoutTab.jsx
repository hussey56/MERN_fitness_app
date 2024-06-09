import React from 'react'
import { removeWorkout } from '../../../../Api/internal';
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
const WorkoutTab = ({workouts,refresh}) => {
    let count2=0;
    const userId = useSelector((state)=>state.user._id);

    const RemoveWorkout =async(id)=>{
    let ar = window.confirm("Do u really want to remove this workout from your routine?");
    if(ar){
        const response = await removeWorkout(userId,id);
        if(response.status === 200){
        refresh()
        }else{
            alert("Problem");
        } 
    }
    }
    const header = useNavigate();
    const gotoPage =(id)=>{
header(`/singleworkout/${id}`);
    }
  return (
    <>
     <div className="container">
          <table className=" table my-3 table-responsive py-2">
            <thead>
              <tr className="text-light text-center bg-secondary">
                <th>#</th>
                <th>Workout</th>
                <th>Time</th>
                <th>Remove</th>{" "}
              </tr>
            </thead>
            <tbody>
            {workouts.length >= 1 && workouts.map((diet)=>{
                count2+=1;
                    return <tr className="text-center">
                        <td>{count2}</td>
                        <td style={{cursor:'pointer'}} onClick={()=>gotoPage(diet.id)}>{diet.name}</td>
                        <td>{diet.time}</td>
                        <td><button className="btn btn-danger" onClick={()=>RemoveWorkout(diet.id)}>Remove</button></td>
                    </tr>
                })}
                 {workouts.length == 0 && <tr className='text-center'>
                <td colSpan={4}>No Workouts found in your Routine</td>
                </tr>}
            </tbody>
          </table>
        </div> 
    </>
  )
}

export default WorkoutTab
