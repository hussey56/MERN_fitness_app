const express = require('express');
const Router = express.Router();
const UserController = require('../controller/User')
const auth = require('../middleware/auth');
const WorkoutController = require('../controller/Workout');
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

module.exports = Router 