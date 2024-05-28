import React, { useState } from 'react';
import axios from 'axios';

const AddWorkout = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [tg, setTg] = useState('');
  const [tags, setTags] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [newExercise, setNewExercise] = useState({
    exerciseName: '',
    sets: 1,
    reps: 12,
    weight: 10,
    notes: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'category':
        setCategory(value);
        break;
      default:
        setNewExercise({ ...newExercise, [name]: value });
    }
  };
  const addTag = ()=>{
    if(tg.length >=1){
        setTags([...tags,tg]);
setTg("");
    }
  }
const removeTag = (tag)=>{
    setTags(tags.filter((tg)=>(tg!==tag)));
}
  const handleAddExercise = (event) => {
    event.preventDefault();

    setExercises([...exercises, newExercise]);
    setNewExercise({ exerciseName: '', sets: 0, reps: 0, weight: 0, notes: '' });
  };

  const handleRemoveExercise = (index) => {
    const updatedExercises = [...exercises];
    updatedExercises.splice(index, 1);
    setExercises(updatedExercises);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const workoutData = {
      name,
      category,
      tags,
      exercises,
    };
console.log(workoutData);
    // try {
    //   const response = await axios.post('/api/workouts', workoutData);
    //   console.log('Workout created:', response.data);
    //   // Clear form after successful submission (optional)
    //   setName('');
    //   setCategory('');
    //   setTags([]);
    //   setExercises([]);
    //   setNewExercise({ exerciseName: '', sets: 0, reps: 0, weight: 0, notes: '' });
    // } catch (error) {
    //   console.error('Error creating workout:', error);
    // }
  };

  return (
    <div className='row '>
        <div className='col-md-6 py-2'>
        <h2 id='createworkoutheading'>Create Your Workout</h2>
        <label className='form-label'>
          Name:
        </label>
        <input type="text" className='form-control' name="name" value={name} onChange={handleInputChange} required />

        <label className='form-label'>
          Category:
        </label>
        <input type="text" className='form-control' name="category" value={category} onChange={handleInputChange} required />
        <label className='form-label'>
          Tags:
        </label>
        <div class="input-group">
  <input type="text" class="form-control" value={tg} placeholder="Enter Tag Name" onChange={(e)=>setTg(e.target.value)}  />
  <span class="input-group-text bg-info text-white" style={{cursor:'pointer'}} id="basic-addon2" onClick={addTag}>+</span>
</div>          <button type='submit' className=' mt-3 btn btn-lg btn-primary'  onClick={handleSubmit}>Add Workout</button>

        </div>    

        <div className='col-md-6 addexercise'>
            <form onSubmit={handleAddExercise} >
        <h4 className='text-light'>Add Exercise</h4>
        <label >
          Exercise Name:
          </label>
          <input
            type="text"
            name="exerciseName"
            value={newExercise.exerciseName}
            onChange={handleInputChange}
            required
            className='form-control'
          />
        
        <label >
          Sets:
        </label>
          <input type="number" className='form-control'  name="sets" value={newExercise.sets} onChange={handleInputChange} required />
        <label >
          Reps:
        </label>
          <input type="number" className='form-control' name="reps" value={newExercise.reps} onChange={handleInputChange} required />
        <label >
          Weight:
        </label>
          <input type="number" className='form-control' name="weight" value={newExercise.weight} onChange={handleInputChange} required />
        <label >
          Notes:
        </label>
          <textarea name="notes" className='form-control' value={newExercise.notes} onChange={handleInputChange} />
        <button type="submit" className='mt-3 float-end btn btn-primary'>
         Add</button>
         </form>
        </div>
        
<hr className='mt-4' />
<hr className='mb-1'  />
         <div className="col-12 my-4 exerciseoverview">
         <h1 className='text-center'>Overview</h1>

         <div className="container">
         <div className="row">
            <h3 className='text-dark'>Name: <span className='text-primary'>{name.length === 0 ?'______?' :name}</span> </h3>
            <h3>Category: <span className='text-primary'> {category.length === 0?'_______?':category}</span></h3>
            {tags.length >=1 && 
            <div className="container">
                <h5>Tags:</h5>
            {tags.map((tag)=>(
               <>
               
 <button className='mx-1 my-1 btn btn-outline-success'>{tag} <span className='text-dark' onClick={()=>removeTag(tag)}>x</span></button>

               </> 
            ))}
            </div>}
           
            <div className="col-12 my-1">
                <h3>Exercises: {exercises.length === 0 && '________?'} </h3>
            </div>
{exercises.map((exercise, index) => (
          <div key={index} className='col-12 col-md-3 card py-2 px-2 mx-1 my-1' >
            <p>
             <strong> Exercise:</strong> {exercise.exerciseName}
            </p>
            <p><strong>Weight: </strong>{exercise.weight}</p>
            <p><strong>Reps: </strong>{exercise.reps}   &nbsp; <strong>Sets:</strong> {exercise.sets}</p>
            <p><strong>Notes:</strong> {exercise.notes.length ===0 ?'None':exercise.notes}</p>
            <button type="button" className='btn btn-danger' onClick={() => handleRemoveExercise(index)}>
              Remove Exercise
            </button>
          </div>
        ))}
</div>
         </div>

       
</div>
<hr className='mt-4' />
<hr className='mb-1'  />

         </div>
  );
}
export default AddWorkout