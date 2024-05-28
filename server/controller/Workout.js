
const Joi = require("joi");
const Workout = require("../model/workout");
const MongoDbPattern = /^[0-9a-fA-F]{24}$/
const WorkoutController ={
   async createWorkout(req,res,next){
    const workoutRegisterSchema = Joi.object({
      userId:Joi.string().regex(MongoDbPattern).required(),
        name: Joi.string().min(5).max(30).required(),
        category: Joi.string().max(30).required(),
        tags: Joi.array().required(),
        exercises: Joi.array().required(),
      });
      const { error } = workoutRegisterSchema.validate(req.body);
      if (error) {
        return next(error);
      }
      const {userId,name,category,tags,exercises}  = req.body;
      let workout;
     try{
  workout  = new Workout({
        userId,
        name:name.trim(),
        category:category.trim(),
        tags,
        exercises
      });
    await  workout.save();
  } catch (error) {
    return next(error)
  }
      return res.status(201).json({"success":workout});
   } ,
   async userWorkouts(req,res,next){

    const workoutFindingSchema = Joi.object({
      userId:Joi.string().regex(MongoDbPattern).required(),
   });
   const { error } = workoutFindingSchema.validate(req.params);
   if (error) {
     return next(error);
   }
   const {userId} = req.params;
   let workouts;
   try{
workouts = await Workout.find({userId:userId});
return res.status(200).json({workouts})

   }catch (error) {
    return next(error)
  }
  },
  async searchWorkout(req,res,next){

    const searchString = req.body.searchString;
    let results;
    try{
    const searchQuery = {
      $or: [
        { name: { $regex: new RegExp(searchString, 'i') } }, // Case-insensitive search on name
        { category: { $regex: new RegExp(searchString, 'i') } }, // Case-insensitive search on category
        { tags: { $in: [searchString] } }, // Search tags for exact match
      ],
    };

     results = await Workout.find(searchQuery);
  }catch(error){
    return next(error);
  }
  return res.status(200).json({results} );
  }
}
module.exports = WorkoutController;