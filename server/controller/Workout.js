
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
    const userId = req.body.userId;
    let results;
    try{
    const searchQuery = {
      userId,
      $or: [
        { name: { $regex: new RegExp(searchString, 'i') } }, // Case-insensitive search on name
        { category: { $regex: new RegExp(searchString, 'i') } }, // Case-insensitive search on category
        { tags: { $regex: new RegExp(searchString, 'i') } }, // Search tags for exact match
      ],
    };

     results = await Workout.find(searchQuery);
  }catch(error){
    return next(error);
  }
  return res.status(200).json({results} );
  },
  async deleteWorkout(req,res,next){
    const DeleteSchema = Joi.object({
      userId:Joi.string().regex(MongoDbPattern).required(),
      deleteId:Joi.string().regex(MongoDbPattern).required(),
      });
      const { error } = DeleteSchema.validate(req.body);
      if (error) {
        return next(error);
      }
      const {userId,deleteId} = req.body
      let workout;
      try {
        workout = await Workout.findOne({_id:deleteId,userId})
    } catch (error) {
        return next(error);
    }
    if(workout){
      try{
        await Workout.deleteOne({_id:deleteId,userId});

  
      }catch(error){
        return next(error);
      }
      return res.status(200).json({message:'Workout Deleted'});

    }else{
      return res.status(200).json({message:'Workout Not Found'});

    }

  },
  async singleworkout(req,res,next){
    const DeleteSchema = Joi.object({
      id:Joi.string().regex(MongoDbPattern).required(),
      });
      const { error } = DeleteSchema.validate(req.params);
      if (error) {
        return next(error);
      }
      const {id} = req.params
      let data;
      try {
        data = await Workout.findById(id)
    } catch (error) {
        return next(error);
    }
    if(data){
       return res.status(200).json({data});
    }else{
      return res.status(200).json({data:null});

    }
  }
}
module.exports = WorkoutController;