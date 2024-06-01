const mongoose = require('mongoose');
const {Schema }= mongoose;
const wSchema = new Schema({
    id: { type: mongoose.SchemaTypes.ObjectId, ref: "Workout" },
    name:{type:String,required:true},
    time:{type:String,required:true}
  });
  const dSchema = new Schema({
    id: { type: mongoose.SchemaTypes.ObjectId, ref: "Nutrition" },
    name:{type:String,required:true},
    time:{type:String,required:true}
  });
  const nSchema = new Schema({
    id:{type:String,required:true},
    message:{type:String,required:true},
    time:{type:String,required:true},
    category:{type:String,required:true},
    view:{type:Boolean,required:true}
  });
const userSchema = new Schema(
    {
    name:{type:String,required:true},
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    profileImage:{type:String},
    workouts: [wSchema],
      diets: [dSchema],
      notifications: [nSchema],
},
{timestamps:true},
);
module.exports = mongoose.model('User',userSchema,'users')