const mongoose = require("mongoose");
const { Schema } = mongoose;

const foodItemSchema = new Schema({
    name: { type: String, required: true },
    quantity: { type: Number },
    calories: { type: Number },
    macros: { type: Object },
  });
const NutritionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    mealType: { type: String, required: true },
    foodItems: { type: [foodItemSchema] },
    totalCalories: { type: Number, virtual: true },
    totalMacros: { type: Object, virtual: true },
});

NutritionSchema.virtual('totalCalories').get(function () {
    return this.foodItems.reduce((sum, item) => sum + (item.calories * item.quantity), 0);
  });
  
  NutritionSchema.virtual('totalMacros').get(function () {
    const macros = { protein: 0, carbs: 0, fat: 0 };
    this.foodItems.forEach((item) => {
      if (item.macros) {
        macros.protein += item.macros.protein * item.quantity;
        macros.carbs += item.macros.carbs * item.quantity;
        macros.fat += item.macros.fat * item.quantity;
      }
    });
    return macros;
  });
module.exports = mongoose.model("Nutrition", NutritionSchema, "nutrition");
