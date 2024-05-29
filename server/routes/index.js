const express = require('express');
const Router = express.Router();
const UserController = require('../controller/User')
const auth = require('../middleware/auth');
const WorkoutController = require('../controller/Workout');
const NutritionController = require('../controller/Nutrition');
//testing
Router.get('/test',(req,res)=>res.json({msg:"Working Backend!"}));

// register user
 Router.post('/reguser',UserController.signup);

 //login
Router.post('/login',UserController.login);

//logout
Router.post('/logout',auth,UserController.logout);

//refresh
Router.get('/refresh',UserController.refresh);

// create workout
Router.post("/createworkout",auth,WorkoutController.createWorkout);

// Users created workouts read
Router.get("/userworkouts/:userId",auth,WorkoutController.userWorkouts);

// search workouts
Router.post("/searchworkout",WorkoutController.searchWorkout);


// Create Diet Plan
Router.post("/creatediet",NutritionController.create);

// User Diets
Router.get("/userdiets/:userId",auth,NutritionController.getuserdiets);

// Searching over diets
Router.post("/searchdiet",NutritionController.searchDiet);



module.exports = Router 