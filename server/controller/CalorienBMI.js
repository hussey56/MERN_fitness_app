const Calorie = require("../model/calories");
const MongoDbPattern = /^[0-9a-fA-F]{24}$/;
const Joi = require("joi");
const BMI = require("../model/bmi");
function formatDateTime(isoString) {
  // Create a new Date object from the ISO 8601 string
  const date = new Date(isoString);

  // Options for formatting the date
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Change to true for 12-hour format
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(date);
}

function getLast7DaysRange() {
  const today = new Date();
  const last7Days = new Date();
  last7Days.setDate(today.getDate() - 6); // To include today, we subtract 6

  // Set time to the start of the day for consistency
  last7Days.setHours(0, 0, 0, 0);
  today.setHours(23, 59, 59, 999);

  return { start: last7Days, end: today };
}
function getLast30DaysRange() {
  const today = new Date();
  const last30Days = new Date();
  last30Days.setDate(today.getDate() - 29);

  last30Days.setHours(0, 0, 0, 0);
  today.setHours(23, 59, 59, 999);

  return { start: last30Days, end: today };
}
function getDayName(date) {
  if (typeof date === "string") {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new Error(
        "Invalid input: Please provide a date string in YYYY-MM-DD format."
      );
    }

    date = new Date(date);
    if (isNaN(date.getTime())) {
      throw new Error(
        "Invalid date: The provided date string does not represent a valid date."
      );
    }
  }

  const day = date.getDay();

  // Array of day names
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Return the day name using the index
  return days[day];
}
const StatController = {
  async addCalorieRecord(req, res, next) {
    const userRegisterSchema = Joi.object({
      userId: Joi.string().regex(MongoDbPattern).required(),
      calorieIntake: Joi.number().required(),
      calorieBurn: Joi.number().required(),
      datetime: Joi.required(),
    });
    const { error } = userRegisterSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { userId, calorieBurn, calorieIntake, datetime } = req.body;
    let data;
    try {
      data = new Calorie({
        userId,
        calorieBurn,
        calorieIntake,
        datetime,
      });
      await data.save();
      return res.status(201).json(data);
    } catch (error) {
      return next(error);
    }
  },
  async addBMIrecord(req, res, next) {
    const userRegisterSchema = Joi.object({
      userId: Joi.string().regex(MongoDbPattern).required(),
      result: Joi.string().min(5).required(),
      bmi: Joi.number().required(),
      datetime: Joi.required(),
    });
    const { error } = userRegisterSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { userId, result, bmi, datetime } = req.body;
    let data;
    try {
      data = new BMI({
        userId,
        result,
        bmi,
        datetime,
      });
      await data.save();
      return res.status(201).json(data);
    } catch (error) {
      return next(error);
    }
  },
  async SevendayCalorieRecord(req, res, next) {
    const UserSchema = Joi.object({
      userId: Joi.string().regex(MongoDbPattern).required(),
      day: Joi.string().required(),
    });
    const { error } = UserSchema.validate(req.params);
    if (error) {
      return next(error);
    }
    const { userId, day } = req.params;
    try {
      let data;
      let calorieIntake = [];
      let calorieBurn = [];
      let labels = [];
      if (day == 7) {
        const { start, end } = getLast7DaysRange();
        data = await Calorie.aggregate([
          {
            $match: {
              userId: userId,
              datetime: {
                $gte: start,
                $lte: end,
              },
            },
          },
          {
            $project: {
              date: {
                $dateToString: { format: "%Y-%m-%d", date: "$datetime" },
              },
              calorieIntake: 1,
              calorieBurn: 1,
            },
          },
          {
            $group: {
              _id: "$date",
              totalCalorieIntake: { $sum: "$calorieIntake" },
              totalCalorieBurn: { $sum: "$calorieBurn" },
            },
          },
          {
            $sort: { _id: 1 }, // Sort by date
          },
        ]);
        calorieIntake = [];
        calorieBurn = [];
        labels = [];
        if (data.length >= 1) {
          for (const calorie of data) {
            calorieIntake.push(calorie.totalCalorieIntake);
            calorieBurn.push(calorie.totalCalorieBurn);
            labels.push(getDayName(calorie._id));
          }
        }
      } else {
        const { start, end } = getLast30DaysRange();
        data = await Calorie.aggregate([
          {
            $match: {
              userId: userId,
              datetime: {
                $gte: start,
                $lte: end,
              },
            },
          },
          {
            $project: {
              date: {
                $dateToString: { format: "%Y-%m-%d", date: "$datetime" },
              },
              calorieIntake: 1,
              calorieBurn: 1,
            },
          },
          {
            $group: {
              _id: "$date",
              totalCalorieIntake: { $sum: "$calorieIntake" },
              totalCalorieBurn: { $sum: "$calorieBurn" },
            },
          },
          {
            $sort: { _id: 1 }, // Sort by date
          },
        ]);
        calorieIntake = [];
        calorieBurn = [];
        labels = [];
        if (data.length >= 1) {
          for (const calorie of data) {
            calorieIntake.push(calorie.totalCalorieIntake);
            calorieBurn.push(calorie.totalCalorieBurn);
            labels.push(calorie._id);
          }
        }
      }

      return res.json({ calorieBurn, calorieIntake, labels });
    } catch (e) {
      return next(e);
    }
  },
  async getBMIRecords(req, res, next) {
    const UserSchema = Joi.object({
      userId: Joi.string().regex(MongoDbPattern).required(),
      day: Joi.string().required(),
    });
    const { error } = UserSchema.validate(req.params);
    if (error) {
      return next(error);
    }
    const { userId, day } = req.params;
    let bmis = [];
    let labels = [];

    let data;
    try {
      data = await BMI.find({ userId: userId })
        .limit(day)
        .sort({ datetime: -1 });
      if (data != null) {
        for (const b of data) {
          labels.push(formatDateTime(b.datetime));
          bmis.push(b.bmi);
        }
      }

      return res.status(200).json({ labels, bmis });
    } catch (error) {
      return next(error);
    }
  },
  async getBmiData(req, res, next) {
    const UserSchema = Joi.object({
      userId: Joi.string().regex(MongoDbPattern).required(),
    });
    const { error } = UserSchema.validate(req.params);
    if (error) {
      return next(error);
    }
    const { userId } = req.params;
    try {
      let result = [];
      const data = await BMI.find({ userId: userId }).sort({ datetime: -1 });
      if (data.length != 0) {
        let i = 1;
        for (const dt of data) {
          result.push([i, dt.bmi, dt.result, formatDateTime(dt.datetime)]);
          i++;
        }
      }
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  },
  async getCalorieData(req, res, next) {
    const UserSchema = Joi.object({
      userId: Joi.string().regex(MongoDbPattern).required(),
    });
    const { error } = UserSchema.validate(req.params);
    if (error) {
      return next(error);
    }
    const { userId } = req.params;
    try {
      let result = [];
      const data = await Calorie.find({ userId: userId }).sort({ datetime: -1 });
      if (data.length != 0) {
        let i = 1;
        for (const dt of data) {
          result.push([i, dt.calorieIntake, dt.calorieBurn, formatDateTime(dt.datetime)]);
          i++;
        }
      }
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  },
};
module.exports = StatController;
