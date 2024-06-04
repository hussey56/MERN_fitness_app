const Joi = require("joi");
const Nutrition = require("../model/nutrition");
const MongoDbPattern = /^[0-9a-fA-F]{24}$/;
const User = require("../model/user");

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
    const userId = req.body.userId;
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
        "totalMacros.protein": -1,
      };
    }
    if (sortValue == "foodItem") {
      sortOption = { "foodItems.length": -1 };
    }
    let results;
    try {
      const searchQuery = {
        userId,
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
  async deleteDiet(req, res, next) {
    const DeleteSchema = Joi.object({
      userId: Joi.string().regex(MongoDbPattern).required(),
      deleteId: Joi.string().regex(MongoDbPattern).required(),
    });
    const { error } = DeleteSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { userId, deleteId } = req.body;
    let diet;
    let user;
    try {
      user = await User.findById(userId);
      const alerts = user.notifications;
      const updatedAlerts = alerts.filter((alert)=>(alert.category != "diet" && alert.id != deleteId));
      user.notifications = updatedAlerts;
      const diets = user.diets;
      const updatedDiets = diets.filter((wrk)=>(wrk.id != deleteId));
      user.diets = updatedDiets;
      await user.save();
      diet = await Nutrition.findOne({ _id: deleteId, userId });
    } catch (error) {
      return next(error);
    }
    if (diet) {
      try {
        await Nutrition.deleteOne({ _id: deleteId, userId });
      } catch (error) {
        return next(error);
      }
      return res.status(200).json({ message: "Diet Deleted" });
    } else {
      return res.status(200).json({ message: "Diet Not Found" });
    }
  },
  async singleDiet(req, res, next) {
    const DeleteSchema = Joi.object({
      id: Joi.string().regex(MongoDbPattern).required(),
    });
    const { error } = DeleteSchema.validate(req.params);
    if (error) {
      return next(error);
    }
    const { id } = req.params;
    let data;
    try {
      data = await Nutrition.findOne({_id:id});
    } catch (error) {
      return next(error);
    }
    if (data) {
      return res.status(200).json({ data:data });
    } else {
      return res.status(200).json({ data: null });
    }
  },
};

module.exports = NutritionController;
