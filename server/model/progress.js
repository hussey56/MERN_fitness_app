const mongoose = require("mongoose");
const { Schema } = mongoose;
const progressSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  weight: { type: Number },
  measurements: { type: Object },
  performanceMetrics: { type: Object },
});

module.exports = mongoose.model('Progress',userSchema,'progress')
