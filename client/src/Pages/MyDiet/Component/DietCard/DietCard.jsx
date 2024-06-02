import React from 'react'
import './DietCard.css'
import {BiFoodTag} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
const DietCard = ({diet}) => {
  const header = useNavigate();
  const gotoDiet = (data)=>{
    header(`/singlediet/${diet._id}`);
  }
  return (
    <>
   <div class="col-md-4 col-12 col-xs-12 dietcard my-2">
 
 <div class="meal">

   <div class="meal-content">
     <div class="meal-tag">
       <span class="tag tag--vegetarian">{diet.mealType}</span>
       <ion-icon id="view-icon" onClick={gotoDiet}  name="eye"></ion-icon>

     </div>

     <p class="meal-title">{diet.name}</p>
     <ul class="meal-attributes">
       <li class="meal-attribute">
         <ion-icon class="meal-icon" name="flame-outline"></ion-icon><span><strong>{diet.totalCalories}</strong> calories</span>
       </li>
       <li class="meal-attribute">
         <BiFoodTag className='meal-icon'/><span><strong>{diet.totalMacros.protein}</strong> Protien</span>
       </li>
       <li class="meal-attribute">
         <ion-icon class="meal-icon" name="restaurant-outline"></ion-icon><span>Nutrition Items (<strong>{diet.foodItems.length}</strong>)</span>
       </li>
     
     </ul>
   </div>
   

 </div>
 
</div>
    
  </>
  )
}

export default DietCard
