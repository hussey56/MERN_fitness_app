import React from 'react'
import {useSelector} from 'react-redux'
import { removeDiet } from '../../../../Api/internal';
import { useNavigate } from 'react-router-dom';

const DietTab = ({diets,refresh}) => {
    let count1=0;
    const userId = useSelector((state)=>state.user._id);

    const RemoveWorkout =async(id)=>{
    let ar = window.confirm("Do u really want to remove this diet from your routine?");
    if(ar){
        const response = await removeDiet(userId,id);
        if(response.status === 200){
        refresh()
        }else{
            alert("Problem");
        } 
    }
    }
    
    const header = useNavigate();
    const gotoPage =(id)=>{
header(`/singlediet/${id}`);
    }
  return (
    <>
     <div className="container">
          <table className=" table my-3 table-responsive py-2">
            <thead>
              <tr className="text-light text-center bg-primary">
                <th>#</th>
                <th>Diet</th>
                <th>Time</th>
                <th>Remove</th>{" "}
              </tr>
            </thead>
            <tbody>
                {diets.length >= 1 && diets.map((diet)=>{
                    count1 +=1;
                    return (<tr className="text-center">
                        <td>{count1}</td>
                        <td style={{cursor:'pointer'}} onClick={()=>gotoPage(diet.id)}>{diet.name}</td>
                        <td>{diet.time}</td>
                        <td><button className="btn btn-danger" onClick={()=>RemoveWorkout(diet.id)}>Remove</button></td>
                    </tr>
               )
            })}
            {diets.length == 0 && <tr className='text-center'>
                <td colSpan={4}>No Diet found in your Routine</td>
                </tr>}
            </tbody>
          </table>
        </div>
      
    </>
  )
}

export default DietTab
