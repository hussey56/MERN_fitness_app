const mongoose = require("mongoose");
const { Schema } = mongoose;

const bmiSchema = new Schema({
  userId: { type: String,required:true },
  result: {
    type: String,
    required: true,
  },
  bmi: {
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

module.exports = mongoose.model("BMI", bmiSchema, "bmi");
