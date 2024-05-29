const mongoose = require("mongoose");
const { Schema } = mongoose;

const foodItemSchema = new Schema({
    name: { type: String, required: true },
    quantity: { type: Number },
    calories: { type: Number },
    macros: { type: Object,default:{ protein: 0, carbs: 0, fat: 0 } },
  });
const NutritionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    mealType: { type: String, required: true },
    name: { type: String, required: true },
    foodItems: { type: [foodItemSchema] },
    totalCalories: { type: Number },
    totalMacros: { type: Object,default:{ protein: 0, carbs: 0, fat: 0 } },
},{timestamps:true},
); 


module.exports = mongoose.model("Nutrition", NutritionSchema, "nutrition");
