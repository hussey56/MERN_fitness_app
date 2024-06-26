const { required } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const calorieSchema = new Schema({
  userId: { type: String,required:true },
  calorieIntake: {
    type: Number,
    required: true,
  },
  calorieBurn: {
    type: Number,
    required: true,
  },
  datetime: {
    type: Date,
    default: Date.now,
  },
},{
    timestamps:true
});

module.exports = mongoose.model("Calorie", calorieSchema, "calorie");
