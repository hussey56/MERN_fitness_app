const mongoose = require("mongoose");
const { Schema } = mongoose;

const exerciseSchema = new Schema({
    exerciseName: { type: String, required: true },
    sets: { type: Number },
    reps: { type: Number },
    weight: { type: Number },
    notes: { type: String },
  });

const WorkoutSchema = new Schema(
  {
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    name: { type: String, required: true },
    category: { type: String, required: true },
    tags:{type:Array,default:[]},
    exercises: { type: [exerciseSchema] },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Workout", WorkoutSchema, "workout");
