import React, { useState } from "react";
import WorkoutSchema from "../../../Schema/WorkoutSchema";
import { useFormik } from "formik";
import TextInput from "../../../Components/TextInput/TextInput";
import { createworkout } from "../../../Api/internal";
import { useSelector } from "react-redux";

const AddWorkout = () => {
  const [loading,setLoading] = useState(false);
  const isAuth = useSelector((state) => state.user);
  const [tg, setTg] = useState("");
  const [category, setCategory] = useState("Cardio");
  const [tags, setTags] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [newExercise, setNewExercise] = useState({
    exerciseName: "",
    sets: 1,
    reps: 12,
    weight: 10,
    notes: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
        setNewExercise({ ...newExercise, [name]: value });
    
  };
  const addTag = () => {
    if (tg.length >= 1) {
      const matchingvalue = tags.find(item => item === tg);
      if(!matchingvalue){
       
        setTags([...tags, tg]);

      }
      setTg("");
    }
  };
  const removeTag = (tag) => {
    setTags(tags.filter((tg) => tg !== tag));
  };
  const handleAddExercise = (event) => {
    event.preventDefault();

    setExercises([...exercises, newExercise]);
    setNewExercise({
      exerciseName: "",
      sets: 1,
      reps: 12,
      weight: 10,
      notes: "",
    });
  };

  const handleRemoveExercise = (index) => {
    const updatedExercises = [...exercises];
    updatedExercises.splice(index, 1);
    setExercises(updatedExercises);
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: WorkoutSchema,
  });
  
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const data = {
      userId:isAuth._id,
      name:values.name,
      category:category,
      tags,
      exercises,
    };
    console.log(data);
    try {
      const response = await createworkout(data);
      if (response.status === 201) {
      // Clear form after successful submission (optional)
     setCategory("")
      values.name = "";
      setTags([]);
      setExercises([]);
      setNewExercise({
        exerciseName: "",
        sets: 1,
        reps: 12,
        weight: 10,
        notes: "",
      });
      alert("Workout Created");
      }
    } catch (error) {
      console.error('Error creating workout:', error);
    }
    setLoading(false);
  };
 
  return (
    <div className="container">
<div className="row ">
      <div className="col-md-6 py-2">
        <h2 id="createworkoutheading">Create Your Workout</h2>
        <label className="form-label">Name:</label>
        <TextInput
                  inputname="Workout"
                  className="form-control"
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Workout Name"
                  error={errors.name && touched.name ? 1 : undefined}
                  errormessage={errors.name}
                />
        <label className="form-label">Category:</label>
        <select name="category" onChange={(e)=>setCategory(e.target.value)} className="form-control">
          <option value="Cardio">Cardio</option>
          <option value="Strength Training">Strength Training</option>
          <option value="Flexibility & Balance">Flexibility & Balance</option>
          <option value="Circuit training">Circuit training</option>
          <option value="Body Weight Workout">Body Weight Workout</option>
        </select>
        <label className="form-label">Tags:</label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={tg}
            placeholder="Enter Tag Name"
            onChange={(e) => {
              let val = e.target.value.toLowerCase();
              setTg(val)
            }}
          />
          <span
            className="input-group-text bg-info text-white"
            style={{ cursor: "pointer" }}
            id="basic-addon2"
            onClick={addTag}
          >
            +
          </span>
        </div>{" "}
        {loading == false &&<button
          type="submit"
          className=" mt-3 btn btn-lg btn-primary"
          onClick={handleSubmit}
          disabled={!values.name  || errors.name || category.length==0 || tags.length==0 || exercises.length==0}
        >
          Add Workout
        </button>}
      </div>

      <div className="col-md-6 addexercise">
        <form onSubmit={handleAddExercise}>
          <h4 className="text-light">Add Exercise</h4>
          <label>Exercise Name:</label>
          <input
            type="text"
            name="exerciseName"
            value={newExercise.exerciseName}
            onChange={handleInputChange}
            required
            className="form-control"
          />

          <label>Sets:</label>
          <input
            type="number"
            className="form-control"
            name="sets"
            value={newExercise.sets}
            onChange={handleInputChange}
            min={1}
            required
          />
          <label>Reps:</label>
          <input
            type="number"
            className="form-control"
            name="reps"
            value={newExercise.reps}
            onChange={handleInputChange}
            required
            min={1}
          />
          <label>Weight (Kg):</label>
          <input
            type="number"
            className="form-control"
            name="weight"
            value={newExercise.weight}
            onChange={handleInputChange}
            min={1}
            required
          />
          <label>Notes:</label>
          <textarea
            name="notes"
            className="form-control"
            value={newExercise.notes}
            onChange={handleInputChange}
          />
          {loading==false && 
          <button type="submit" className="mt-3 float-end btn btn-primary">
            Add
          </button>}
        </form>
      </div>

      <hr className="mt-4" />
      <hr className="mb-1" />
      <div className="col-12 my-4 exerciseoverview">
        <h1 className="text-center">Overview</h1>

        <div className="container">
          <div className="row">
            <h3 className="text-dark">
              Name:{" "}
              <span className="text-primary">
                {values.name.length === 0 ? "______?" : values.name}
              </span>{" "}
            </h3>
            <h3>
              Category:{" "}
              <span className="text-primary">
                {" "}
                {category.length === 0 ? "_______?" : category}
              </span>
            </h3>
            {tags.length >= 1 && (
              <div className="container">
                <h5>Tags:</h5>
                {tags.map((tag) => (
                
                    <button className="mx-1 my-1 btn btn-outline-success" key={tag}>
                      {tag}{" "}
                      <span
                        className="text-dark"
                        onClick={() => removeTag(tag)}
                      >
                        x
                      </span>
                    </button>
                ))}
              </div>
            )}

            <div className="col-12 my-1">
              <h3>Exercises: {exercises.length === 0 && "________?"} </h3>
            </div>
            {exercises.map((exercise, index) => (
              <div
                key={index}
                className="col-12 col-md-3 card py-2 px-2 mx-1 my-1"
              >
                <p>
                  <strong> Exercise:</strong> {exercise.exerciseName}
                </p>
                <p>
                  <strong>Weight: </strong>
                  {exercise.weight}
                </p>
                <p>
                  <strong>Reps: </strong>
                  {exercise.reps} &nbsp; <strong>Sets:</strong> {exercise.sets}
                </p>
                <p>
                  <strong>Notes:</strong>{" "}
                  {exercise.notes.length === 0 ? "None" : exercise.notes}
                </p>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveExercise(index)}
                >
                  Remove Exercise
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <hr className="mt-4" />
      <hr className="mb-1" />
    </div>
    </div>
    
  );
};
export default AddWorkout;
