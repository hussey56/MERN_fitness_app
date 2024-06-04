const express = require('express');
const Router = express.Router();
const UserController = require('../controller/User')
const auth = require('../middleware/auth');
const WorkoutController = require('../controller/Workout');
const NutritionController = require('../controller/Nutrition');
const StatController = require('../controller/CalorienBMI');
//testing
Router.get('/test',(req,res)=>res.json({msg:"Working Backend!"}));;

// register user
 Router.post('/reguser',UserController.signup);

 //login
Router.post('/login',UserController.login); 

//logout
Router.post('/logout',auth,UserController.logout);

//refresh
Router.get('/refresh',UserController.refresh);

// add diet to routine
Router.post('/addroutinediet',auth,UserController.adroutinediet);

// add workout to routine
Router.post('/addroutineworkout',auth,UserController.adroutinewaorkout);

// create workout
Router.post("/createworkout",auth,WorkoutController.createWorkout);

// Users created workouts read
Router.get("/userworkouts/:userId",auth,WorkoutController.userWorkouts);

// uSER dIET pROGRESS
Router.get("/userdietprogress/:userId",auth,UserController.getuserdietProgress);


// uSER Workout pROGRESS
Router.get("/userworkoutprogress/:userId",auth,UserController.getuserworkoutProgress);
// search workouts
Router.post("/searchworkout",auth,WorkoutController.searchWorkout);
// delete workout
Router.post("/deleteworkout",auth,WorkoutController.deleteWorkout);
// Create Diet Plan
Router.post("/creatediet",auth,NutritionController.create);

// User Diets
Router.get("/userdiets/:userId",auth,NutritionController.getuserdiets);


// User Alerts
Router.get("/alerts/:userId",auth,UserController.getuseralerts);

// View User all alerts at once
Router.get("/viewAllAlerts/:userId",auth,UserController.viewAllAlerts);

// check a diet is in user diet list

Router.get("/checkdiet/:userId/:dietId",auth,UserController.checkDiet);

// check a workout is in user diet list

Router.get("/checkworkout/:userId/:workoutId",auth,UserController.checkWorkout);

// delete a diet from user routine
Router.get("/removediet/:userId/:dietId",auth,UserController.deletedIET);
 //remove diet from user routine
 Router.get("/removeworkout/:userId/:workoutId",auth,UserController.deleteWorkout);

// Delete a diet
Router.post('/deletediet',auth,NutritionController.deleteDiet);

// Searching over diets
Router.post("/searchdiet",auth,NutritionController.searchDiet);

// single diet
Router.get("/diet/:id",auth,NutritionController.singleDiet);

// single workout
Router.get("/workout/:id",auth,WorkoutController.singleworkout);

// add calorie record
Router.post("/addcalorierecord",auth,StatController.addCalorieRecord);

// calories record
Router.get("/sevendaycaloriesrecord/:userId/:day",StatController.SevendayCalorieRecord);

 
module.exports = Router 