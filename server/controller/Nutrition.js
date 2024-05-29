const Joi = require("joi");
const Nutrition = require("../model/nutrition");
const MongoDbPattern = /^[0-9a-fA-F]{24}$/;
const NutritionController = {
  async create(req, res, next) {
    const nutritionRegisterSchema = Joi.object({
      userId: Joi.string().regex(MongoDbPattern).required(),
      name: Joi.string().min(5).max(30).required(),
      mealType: Joi.string().max(30).required(),
      foodItems: Joi.array().required(),
    });
    const { error } = nutritionRegisterSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { userId, name, mealType, foodItems } = req.body;

    let totalCals = 0;
    if (foodItems.length >= 1) {
      totalCals = foodItems.reduce(
        (sum, item) => sum + item.calories * item.quantity,
        0
      );
    }
    let macros = { protein: 0, carbs: 0, fat: 0 };
    if (foodItems.length >= 1) {
      foodItems.forEach((item) => {
        if (item.macros) {
          macros.protein += item.macros.protein * item.quantity;
          macros.carbs += item.macros.carbs * item.quantity;
          macros.fat += item.macros.fat * item.quantity;
        }
      });
    }
    let nutrition;
    try {
      nutrition = new Nutrition({
        userId,
        name: name.trim(),
        mealType: mealType.trim(),
        foodItems,
        totalCalories: totalCals,
        totalMacros: macros,
      });
      await nutrition.save();
    } catch (error) {
      return next(error);
    }
    return res.status(201).json({ success: nutrition });
  },
  async getuserdiets(req, res, next) {
    const dietFindingSchema = Joi.object({
      userId: Joi.string().regex(MongoDbPattern).required(),
    });
    const { error } = dietFindingSchema.validate(req.params);
    if (error) {
      return next(error);
    }
    const { userId } = req.params;
    let diets;
    try {
      diets = await Nutrition.find({ userId: userId }).sort({
        totalCalories: -1,
      });
      return res.status(200).json({ diets });
    } catch (error) {
      return next(error);
    }
  },
  async searchDiet(req, res, next) {
    const searchString = req.body.searchString;
    const sortValue = req.body.sortValue;
    let sortOption;
    if (sortValue == null) {
      sortOption = {
        totalCalories: -1,
      };
    }
    if (sortValue == "totalCalories") {
      sortOption = {
        totalCalories: -1,
      };
    }
    if (sortValue == "protein") {
      sortOption = {
        'totalMacros.protein': -1
      };
    }
    if (sortValue == "foodItem") {
      sortOption = { "foodItems.length": -1 };
    }
    let results;
    try {
      const searchQuery = {
        $or: [
          { name: { $regex: new RegExp(searchString, "i") } }, // Case-insensitive search on name
          { mealType: { $regex: new RegExp(searchString, "i") } }, // Case-insensitive search on category
        ],
      };

      results = await Nutrition.find(searchQuery).sort(sortOption);
    } catch (error) {
      return next(error);
    }
    return res.status(200).json({ results });
  },
};

module.exports = NutritionController;