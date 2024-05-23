const Joi = require("joi");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const UserDTO = require("../dto/user");
const RefreshToken = require("../model/token");
const JWTService = require("../services/JWTservice");
const passwordPattern = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,25}/;

const UserController = {
  async signup(req, res, next) {
    const userRegisterSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      name: Joi.string().max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(passwordPattern).required(),
    });
    const { error } = userRegisterSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { name, email, username, password } = req.body;
    try {
      const emailinUse = await User.exists({ email });
      const usernameInUse = await User.exists({ username });
      if (emailinUse) {
        const error = {
          status: 409,
          message: "Email Already in use Please use another email",
        };
        return next(error);
      }
      if (usernameInUse) {
        const error = {
          status: 409,
          message: "Username Already in use Please use another username",
        };
        return next(error);
      }
      const hashpassword = await bcrypt.hash(password, 10);
      let accessToken;
      let refreshToken;
      let user;
      try {
        const userToRegister = new User({
          username,
          name,
          email,
          password: hashpassword,
          profileImage:""
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
  async login(req,res,next){
    const userLoginSchema = Joi.object({
        username:Joi.string().min(5).max(30).required(),
        password:Joi.string().pattern(passwordPattern).required(),
    });
    const{ error }= userLoginSchema.validate(req.body);
    if(error){
        return next(error);
    }
    let user; 
    const {username,password} = req.body
    try {

       user = await User.findOne({username});
        if(!user){ 
            const error = {
                status:401,
                message:"Invalid username"
            }
            return next(error)
        }
const match = await bcrypt.compare(password,user.password);
if(!match){
const error = {
    status:401,
    message:"Invalid Passwords"
}
return next(error)
}
    } catch (error) {
        return next(error)
    }
    const accessToken = JWTService.signAccessToken({_id:user._id},'30m');
    const refreshToken = JWTService.signRefreshToken({_id:user._id},'60m');
try {
await  RefreshToken.updateOne({
    _id:user._id
},
{token:refreshToken},
{upsert:true}
)
} catch (error) {
return next(error) 
}


    res.cookie('accessToken',accessToken,{
        maxAge:1000*60*60*24,
        httpOnly:true,
          sameSite:"None",
        secure:true
    })
    res.cookie('refreshToken',refreshToken,{
        maxAge:1000*60*60*24,
        httpOnly:true,
          sameSite:"None",
        secure:true
    })
    const userDto = new UserDTO(user);
    return res.status(200).json({user:userDto,auth:true})
},
async logout(req,res,next){
    console.log(req.user);
    const {refreshToken} = req.cookies;
    try {
    await  RefreshToken.deleteOne({token:refreshToken});
    } catch (error) {
      return next(error)
    }
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({user:null,auth:false});
   
},
async refresh(req,res,next){
  // 1. get refresh token 
        // 2. verify refresh Token
        // 3. generate new token
        // 4. update database , send response
        const OriginalRefreshToken = req.cookies.refreshToken;
        let id;
        try {
        id = JWTService.verifyRefreshToken(OriginalRefreshToken)._id;
        } catch (e) {
            const error ={
                status:401,
                message:'unauthorized'
            }
            return next(error)
        }
        try {
          const match = await RefreshToken.findOne({_id:id,token:OriginalRefreshToken});
          if(!match){
            const error = {
                status:401,
                message:'unauthorized'
            }
            return next(error);
          } 
        } catch (e) {
            return next(e);
        }

        try {
            const accessToken = JWTService.signAccessToken({_id:id},'30m');
            const refreshToken = JWTService.signRefreshToken({_id:id},'60m');
            await RefreshToken.updateOne({_id:id},{token:refreshToken});

            res.cookie('accessToken',accessToken,{
                maxAge:1000*60*60*24,
                httpOnly:true,
                  sameSite:"None",
            secure:true
            });
            res.cookie('refreshToken',refreshToken,{
                maxAge:1000*60*60*24,
                httpOnly:true,
                  sameSite:"None",
            secure:true
            });

        } catch (e) {
           return next(e); 
        }
        const user = await User.findOne({_id:id});
        const userDto = new UserDTO(user);
        return res.status(200).json({user:userDto,auth:true})
    
}
}
module.exports = UserController;
