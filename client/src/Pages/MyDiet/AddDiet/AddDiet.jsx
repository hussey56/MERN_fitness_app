import { useFormik } from "formik";
import React, { useState } from "react";
import FoodItemSchema from "../../../Schema/FoodItemSchema";
import TextInput from "../../../Components/TextInput/TextInput";
import './AddDiet.css'
import { useDispatch, useSelector } from "react-redux";
import { creatediet } from "../../../Api/internal";
import { MyAlert } from "../../../Hooks/useAlert";
import { switchAlert } from "../../../Store/WorkoutSlice";
import Loader from "../../../Components/Loader/Loader";
const AddDiet = () => {
  const userId = useSelector((state)=>state.user._id);
  const [loading,setLoading] = useState(false);
  const [meal, setMeal] = useState("breakfast");
  const [dname, setDname] = useState("");
  const [foodItems, setFoodItems] = useState([]);
const dispatch = useDispatch();
  const handleAddFood = (event) => {
    event.preventDefault();
let newFood ={
  name:values.name,
  quantity:values.quantity,
  calories:values.calories,
  macros:{
    protein:values.protein,
    carbs:values.carbs,
    fat:values.fat
  }
};
    setFoodItems([...foodItems, newFood]);
    values.name = "";
    values.calories= 1;
    values.quantity= 1;
    values.protein= 1;
    values.carbs= 1;
    values.fat= 1;
  };

  const handleRemoveFood = (index) => {
    const updatedFoods = [...foodItems];
    updatedFoods.splice(index, 1);
    setFoodItems(updatedFoods);
  };
  const handleSubmit = async (e)=>{
    e.preventDefault();
    setLoading(true)
    const data = {
userId,
name:dname.trim(),
mealType:meal.trim(),
foodItems:foodItems
    };
    const response = await creatediet(data);
    if (response.status === 201) {
setDname("");
setMeal("breakfast");
setFoodItems([]);
values.name = "";
values.calories= 1;
values.quantity= 1;
values.protein= 1;
values.carbs= 1;
values.fat= 1;

      // dispatch(switchAlert(true));
      // MyAlert({type:"success",message:{title:"Congrats",text:"Diet created successfully!"
      // }})
      alert("Congrats ! Diet Created Sucessfully!!!");
    }else{
alert("Diet Not Created Due to Server Problem")
      // dispatch(switchAlert(true));
      // MyAlert({type:"error",message:{title:"Snaps!",text:"Error Occured in the diet creation."
      // }})
    }
    setLoading(false)

  }
  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      calories: 1,
      quantity: 1,
      protein: 1,
      carbs: 1,
      fat: 1,
    },
    validationSchema: FoodItemSchema,
  });
  if(loading){
    return <Loader text="Adding Diet ...."/>
  }
  return (
    <div className="container">
      <div className="row">
      <div className="text-center add-item mb-2">Register Diet Details</div>

        <div className="container diet-name">
          <div className="row">
          <div className="col-md-6 ">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input type="text" placeholder="Enter Diet Name" value={dname} onChange={(e)=>setDname(e.target.value)} name="name" required className="form-control" />
        </div>
        <div className="col-md-6">
          <label className="form-label">Meal Type:</label>
          <select
            name="category"
            onChange={(e) => setMeal(e.target.value)}
            className="form-control"
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="Pre Workout">Pre Workout</option>
            <option value="Post Workout">Post Workout</option>
          </select>
        </div>
          </div>
      
        </div>
       <div className="text-center add-item mt-2">Add Food Item</div>
        <div className="food-form ">
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="col-md-12">
              <label htmlFor="Item" className="form-label">
                Item Name:
              </label>
              <TextInput
                inputname="Item Name"
                className="form-control"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Item Name"
                error={errors.name && touched.name ? 1 : undefined}
                errormessage={errors.name}
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="quantity" className="form-label">
                Item Qty:
              </label>

              <TextInput
                inputname="Item Quantity"
                className="form-control"
                type="number"
                name="quantity"
                value={values.quantity}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Item Quantity"
                error={errors.quantity && touched.quantity ? 1 : undefined}
                errormessage={errors.quantity}
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="calories" className="form-label">
                Item Calories:
              </label>
              <TextInput
                inputname="Item Calories"
                className="form-control"
                type="number"
                name="calories"
                value={values.calories}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Item Calories"
                error={errors.calories && touched.calories ? 1 : undefined}
                errormessage={errors.calories}
              />
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="col-md-12">
              <label htmlFor="protein" className="form-label">
                Item Protein:
              </label>
              <TextInput
                inputname="Item Protein"
                className="form-control"
                type="number"
                name="protein"
                value={values.protein}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Item Protein"
                error={errors.protein && touched.protein ? 1 : undefined}
                errormessage={errors.protein}
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="carbs" className="form-label">
                Item Carbs:
              </label>
              <TextInput
                inputname="Item Carbs"
                className="form-control"
                type="number"
                name="carbs"
                value={values.carbs}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Item Carbs"
                error={errors.carbs && touched.carbs ? 1 : undefined}
                errormessage={errors.carbs}
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="fat" className="form-label">
                Item Fat:
              </label>
              <TextInput
                inputname="Item Fat"
                className="form-control"
                type="number"
                name="fat"
                value={values.fat}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Item Fat"
                error={errors.fat && touched.fat ? 1 : undefined}
                errormessage={errors.fat}
              />
            </div>
          </div>
          <div className="container text-center mt-3">
          <button className="btn btn-warning text-dark" disabled={!values.name || !values.calories || !values.quantity || !values.carbs || !values.protein || !values.fat || errors.name || errors.calories || errors.quantity || errors.carbs || errors.fat || errors.protein} onClick={handleAddFood}>Add Item</button>

          </div>

        </div>
        </div>
        <hr className="mt-4" />
      <hr className="mb-1" />
      <div className="col-12 my-4 exerciseoverview">
        <h1 className="text-center">Overview</h1>
        <div className="container">
          <div className="row">
          <h3 className="text-dark" >
              Name:{" "}
              <span className="text-primary"  style={{textTransform:'capitalize'}}>
                {dname.length === 0 ? "______?" : dname}
              </span>{" "}
            </h3>
            <h3>
              Meal Type:{" "}
              <span className="text-primary" style={{textTransform:'capitalize'}}>
                {" "}
                {meal.length === 0 ? "_______?" : meal}
              </span>
            </h3>

            <div className="col-12 my-1">
              <h3>Food Item: {foodItems.length === 0 && "________?"} </h3>
            </div>
            {foodItems.length>=1 && foodItems.map((foodItem, index) => (
              <div
                key={index}
                className="col-12 col-md-3 card py-2 px-2 mx-1 my-1"
              >
                <p>
                  <strong>Item Name:</strong> {foodItem.name}
                </p>
                <p>
                  <strong>Quantity: </strong>
                  {foodItem.quantity}  
                </p>
                <p>
                <strong>Calories: </strong>
                  {foodItem.calories}
                </p>
                <p>
                  <strong>Carbs: </strong>
                  {foodItem.macros.carbs} &nbsp;<strong>Protein: </strong>
                  {foodItem.macros.protein}&nbsp;
                  <strong>Fat: </strong>
                  {foodItem.macros.fat}
                </p>
               
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveFood(index)}
                >
                  Remove Item
                </button>
              </div>
            ))}
            </div>
            <div className="container text-center mt-3">
          <button className="btn btn-warning btn-lg text-dark" disabled={dname.length===0 || foodItems.length===0 || meal.length === 0} onClick={handleSubmit}>Proceed to Add</button>
          </div>
            </div>
        </div>
        <hr className="mt-4" />
      <hr className="mb-1" />
      </div>
    </div>
  );
};

export default AddDiet;
