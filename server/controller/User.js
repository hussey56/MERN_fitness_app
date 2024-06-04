const Joi = require("joi");
const User = require("../model/user");
const Nutrition = require("../model/nutrition");
const Workout = require("../model/workout");
const bcrypt = require("bcryptjs");
const UserDTO = require("../dto/user");
const RefreshToken = require("../model/token");
const JWTService = require("../services/JWTservice");
const passwordPattern = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,25}/;
const MongoDbPattern = /^[0-9a-fA-F]{24}$/;

const calculatePercentage = (num1, num2) => {
  if (num1 == 0) {
    return 0;
  } else {
    return Math.floor((num1 / num2) * 100);
  }
};
const UserController = {
  async signup(req, res, next) {
    const userRegisterSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      fullname: Joi.string().max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(passwordPattern).required(),
    });
    const { error } = userRegisterSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { fullname, email, username, password } = req.body;
    try {
      const emailinUse = await User.exists({ email });
      const usernameInUse = await User.exists({ username });
      if (emailinUse) {
        const error = {
          status: 200,
          message: "Email already in use please use another email",
        };
        return res.status(error.status).json(error.message);
      }
      if (usernameInUse) {
        const error = {
          status: 200,
          message: "Username already in use please use another username",
        };
        return res.status(error.status).json(error.message);
      }
      const hashpassword = await bcrypt.hash(password, 10);
      let accessToken;
      let refreshToken;
      let user;
      try {
        const userToRegister = new User({
          username,
          name: fullname,
          email,
          password: hashpassword,
          profileImage: "",
        });
        user = await userToRegister.save();

        accessToken = JWTService.signAccessToken({ _id: user._id }, "30m");
        refreshToken = JWTService.signRefreshToken({ _id: user._id }, "60m");
      } catch (error) {
        return next(error);
      }
      await JWTService.storeRefreshToken(refreshToken, user._id);
      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      const userDto = new UserDTO(user);
      return res.status(201).json({ user: userDto, auth: true });
    } catch (error) {
      return next(error);
    }
  },
  async login(req, res, next) {
    const userLoginSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      password: Joi.string().required(),
    });
    const { error } = userLoginSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    let user;
    const { username, password } = req.body;
    try {
      user = await User.findOne({ username });
      if (!user) {
        const error = {
          status: 401,
          message: "Invalid username",
        };
        return next(error);
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        const error = {
          status: 401,
          message: "Invalid Passwords",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }
    const accessToken = JWTService.signAccessToken({ _id: user._id }, "30m");
    const refreshToken = JWTService.signRefreshToken({ _id: user._id }, "60m");
    try {
      await RefreshToken.updateOne(
        {
          _id: user._id,
        },
        { token: refreshToken },
        { upsert: true }
      );
    } catch (error) {
      return next(error);
    }

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    const userDto = new UserDTO(user);
    return res.status(200).json({ user: userDto, auth: true });
  },
  async logout(req, res, next) {
    console.log(req.user);
    const { refreshToken } = req.cookies;
    try {
      await RefreshToken.deleteOne({ token: refreshToken });
    } catch (error) {
      return next(error);
    }
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ user: null, auth: false });
  },
  async refresh(req, res, next) {
    // 1. get refresh token
    // 2. verify refresh Token
    // 3. generate new token
    // 4. update database , send response
    const OriginalRefreshToken = req.cookies.refreshToken;
    let id;
    try {
      id = JWTService.verifyRefreshToken(OriginalRefreshToken)._id;
    } catch (e) {
      const error = {
        status: 401,
        message: "unauthorized",
      };
      return next(error);
    }
    try {
      const match = await RefreshToken.findOne({
        _id: id,
        token: OriginalRefreshToken,
      });
      if (!match) {
        const error = {
          status: 401,
          message: "unauthorized",
        };
        return next(error);
      }
    } catch (e) {
      return next(e);
    }

    try {
      const accessToken = JWTService.signAccessToken({ _id: id }, "30m");
      const refreshToken = JWTService.signRefreshToken({ _id: id }, "60m");
      await RefreshToken.updateOne({ _id: id }, { token: refreshToken });

      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
    } catch (e) {
      return next(e);
    }
    const user = await User.findOne({ _id: id });
    const userDto = new UserDTO(user);
    return res.status(200).json({ user: userDto, auth: true });
  },
  async adroutinediet(req, res, next) {
    const userSchema = Joi.object({
      uId: Joi.string().regex(MongoDbPattern).required(),
      id: Joi.string().regex(MongoDbPattern).required(),
      name: Joi.string().min(5).max(30).required(),
      time: Joi.string().required(),
    });
    const { error } = userSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { uId, id, name, time } = req.body;
    try {
      const user = await User.findById(uId);
      if (!user) {
        return res.status(404).send("User not found");
      }
      const updateData = {
        id,
        name,
        time,
      };
      user.diets.push(updateData); // Push new workouts to existing array
      await user.save();

      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  },
  async adroutinewaorkout(req, res, next) {
    const userSchema = Joi.object({
      uId: Joi.string().regex(MongoDbPattern).required(),
      id: Joi.string().regex(MongoDbPattern).required(),
      name: Joi.string().min(5).max(30).required(),
      time: Joi.string().required(),
    });
    const { error } = userSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { uId, id, name, time } = req.body;
    try {
      const user = await User.findById(uId);
      if (!user) {
        return res.status(404).send("User not found");
      }
      const updateData = {
        id,
        name,
        time,
      };
      user.workouts.push(updateData); // Push new workouts to existing array
      await user.save();

      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  },
  async getuseralerts(req, res, next) {
    const userFindingSchema = Joi.object({
      userId: Joi.string().regex(MongoDbPattern).required(),
    });
    const { error } = userFindingSchema.validate(req.params);
    if (error) {
      return next(error);
    }
    const { userId } = req.params;
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(404).send("User not found");
      }
      const alerts = user.notifications;
      return res.status(200).json(alerts);
    } catch (error) {
      return next(error);
    }
  },
  async viewAllAlerts(req, res, next) {
    const userFindingSchema = Joi.object({
      userId: Joi.string().regex(MongoDbPattern).required(),
    });
    const { error } = userFindingSchema.validate(req.params);
    if (error) {
      return next(error);
    }
    const { userId } = req.params;
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(404).send("User not found");
      }
      if (user.notifications.length >= 1) {
        for (const alerts of user.notifications) {
          alerts.view = true;
        }
        await user.save();
      }
      return res.status(201).json("success");
    } catch (error) {
      return next(error);
    }
  },
  async checkDiet(req, res, next) {
    const userFindingSchema = Joi.object({
      userId: Joi.string().regex(MongoDbPattern).required(),
      dietId: Joi.string().regex(MongoDbPattern).required(),
    });
    const { error } = userFindingSchema.validate(req.params);
    if (error) {
      return next(error);
    }
    const { userId, dietId } = req.params;
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(404).send("User not found");
      }
      let available = false;

      for (const diet of user.diets) {
        if (diet.id == dietId) {
          available = true;
        }
      }
      return res.status(200).json({ available });
    } catch (error) {
      return next(error);
    }
  },
  async checkWorkout(req, res, next) {
    const userFindingSchema = Joi.object({
      userId: Joi.string().regex(MongoDbPattern).required(),
      workoutId: Joi.string().regex(MongoDbPattern).required(),
    });
    const { error } = userFindingSchema.validate(req.params);
    if (error) {
      return next(error);
    }
    const { userId, workoutId } = req.params;
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(404).send("User not found");
      }
      let available = false;

      for (const workout of user.workouts) {
        if (workout.id == workoutId) {
          available = true;
        }
      }
      return res.status(200).json({ available });
    } catch (error) {
      return next(error);
    }
  },
  async deletedIET(req, res, next) {
    const userFindingSchema = Joi.object({
      userId: Joi.string().regex(MongoDbPattern).required(),
      dietId: Joi.string().regex(MongoDbPattern).required(),
    });
    const { error } = userFindingSchema.validate(req.params);
    if (error) {
      return next(error);
    }
    const { userId, dietId } = req.params;
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(404).send("User not found");
      }
      let filterdiet;
      const diets = user.diets;
      filterdiet = diets.filter((diet) => diet.id != dietId);
      user.diets = filterdiet;
      await user.save();
      return res.status(200).json({ diets: user.diets });
    } catch (error) {
      return next(error);
    }
  },
  async deleteWorkout(req, res, next) {
    const userFindingSchema = Joi.object({
      userId: Joi.string().regex(MongoDbPattern).required(),
      workoutId: Joi.string().regex(MongoDbPattern).required(),
    });
    const { error } = userFindingSchema.validate(req.params);
    if (error) {
      return next(error);
    }
    const { userId, workoutId } = req.params;
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(404).send("User not found");
      }
      let filterw;
      const workouts = user.workouts;
      filterw = workouts.filter((w) => w.id != workoutId);
      user.workouts = filterw;
      await user.save();
      return res.status(200).json({ workout: user.workouts });
    } catch (error) {
      return next(error);
    }
  },
  async getuserdietProgress(req, res, next) {
    const userFindingSchema = Joi.object({
      userId: Joi.string().regex(MongoDbPattern).required(),
    });
    const { error } = userFindingSchema.validate(req.params);
    if (error) {
      return next(error);
    }
    const { userId } = req.params;
    let user;
    let categoryDiets =[]
    try {
      user = await User.findById(userId);
      if (!user) {
        return res.status(404).send("User not Found");
      }
      for (const diet of user.diets) {
        const dt = await Nutrition.findById(diet.id);
        categoryDiets.push(dt.mealType);
      }
      const breakfast = calculatePercentage(
        categoryDiets.filter((diet) => diet == "breakfast").length,
        categoryDiets.length
      );
      const lunch = calculatePercentage(
        categoryDiets.filter((diet) => diet == "lunch").length,
        categoryDiets.length
      );
      const dinner = calculatePercentage(
        categoryDiets.filter((diet) => diet == "dinner").length,
        categoryDiets.length
      );
      const preWorkout = calculatePercentage(
        categoryDiets.filter((diet) => diet == "Pre Workout").length,
        categoryDiets.length
      );
      const postWorkout = calculatePercentage(
        categoryDiets.filter((diet) => diet == "Post Wokrout").length,
        categoryDiets.length
      );
      const data = [breakfast, lunch, dinner, preWorkout, postWorkout];
      return res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  },
  async getuserworkoutProgress(req, res, next) {
    const userFindingSchema = Joi.object({
      userId: Joi.string().regex(MongoDbPattern).required(),
    });
    const { error } = userFindingSchema.validate(req.params);
    if (error) {
      return next(error);
    }
    const { userId } = req.params;
    let user;
    let categoryWorkouts =[]
    try {
      user = await User.findById(userId);
      if (!user) {
        return res.status(404).send("User not Found");
      }
      for (const workout of user.workouts) {
        const dt = await Workout.findById(workout.id);
        categoryWorkouts.push(dt.category);
      }
      const Cardio = calculatePercentage(
        categoryWorkouts.filter((wrk) => wrk == "Cardio").length,
        categoryWorkouts.length
      );
      const Strength = calculatePercentage(
        categoryWorkouts.filter((wrk) => wrk == "Strength Training").length,
        categoryWorkouts.length
      );
      const Flexibility = calculatePercentage(
        categoryWorkouts.filter((wrk) => wrk == "Flexibility & Balance").length,
        categoryWorkouts.length
      );
      const Circuit = calculatePercentage(
        categoryWorkouts.filter((wrk) => wrk == "Circuit training").length,
        categoryWorkouts.length
      );
      const BodyWeight = calculatePercentage(
        categoryWorkouts.filter((wrk) => wrk == "Body Weight Workout").length,
        categoryWorkouts.length
      );
      

      const data = [Cardio,Strength,Flexibility,Circuit,BodyWeight];
      return res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  },
};
module.exports = UserController;
