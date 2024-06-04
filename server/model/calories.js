const mongoose = require("mongoose");
const { Schema } = mongoose;

const calorieSchema = new Schema({
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
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
