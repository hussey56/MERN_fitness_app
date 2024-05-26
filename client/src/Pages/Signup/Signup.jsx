import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import SignupSchema from "../../Schema/SignupSchema";
import { useFormik } from "formik";
import TextInput from "../../Components/TextInput/TextInput";
import PasswordInput from "../../Components/TextInput/PasswordInput";
import { signup } from '../../Api/internal'
import {setUser} from '../../Store/UserSlice';
import Loader from '../../Components/Loader/Loader'

const Signup = ({isAuth}) => {
  
  const [passwordvisible, setPasswordVisible] = useState(false);
  const [cpasswordvisible, setcPasswordVisible] = useState(false);
const [loading,setLoading] =useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");


  const handleSignUp = async()=>{
    setLoading(true)
    const data = {
        fullname:values.fullname,
        username:values.username,
        email:values.email,
        password:values.password,
    }
       const response = await signup(data);

       if(response.status === 201){
          // 1. set user
    const user ={
        _id :response.data.user._id,
        email:response.data.user.email,
        username:response.data.user.username,
        fullname:response.data.user.fullname,
        auth:response.data.auth
      }
      dispatch(setUser(user));
        // 2. redirect 
        navigate('/');
       }  else if(response.status === 200){
        setError(response.data)
         }
    setLoading(false);
        }
        
  const { values, handleBlur, handleChange, touched, errors } = useFormik({
    initialValues: {
      fullname: "Hassan",
      username: "HSkhan",
      email: "hassankhan032370@gmail.com",
      password: "Password123",
      confirmPassword: "Password123",
    },
    validationSchema: SignupSchema,
  });
  useEffect(()=>{
    if(isAuth){
      navigate('/');
    }
  },
  // eslint-disable-next-line
  [])
  return (
    <div className={`d-lg-flex half`}>
      <div className={`bg order-1 order-md-2 loginimg`}></div>
      <div className={`contents order-2 order-md-1`}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-7">
            <h3 className='text-dark' style={{fontFamily:'monospace'}}>Register to <span className='text-primary' style={{fontFamily:'cursive',fontWeight:'bold'}}>F</span>Tracker  📋🏋️‍♀️</h3>
                <TextInput
                  inputname="Full Name"
                  className="form-control"
                  type="text"
                  name="fullname"
                  value={values.fullname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your full name"
                  error={errors.fullname && touched.fullname ? 1 : undefined}
                  errormessage={errors.fullname}
                />

                <TextInput
                  inputname="Username"
                  className="form-control"
                  type="text"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter username"
                  error={errors.username && touched.username ? 1 : undefined}
                  errormessage={errors.username}
                />
                <TextInput
                  inputname="Email"
                  className="form-control"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your email"
                  error={errors.email && touched.email ? 1 : undefined}
                  errormessage={errors.email}
                />
                <PasswordInput
                  inputname="Password"
                  name="password"
                  passwordvisible={passwordvisible}
                  tooglepassword={() => setPasswordVisible(!passwordvisible)}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your password"
                  error={errors.password && touched.password ? 1 : undefined}
                  errormessage={errors.password}
                />

                <PasswordInput
                  inputname="Confirm Password"
                  name="confirmPassword"
                  passwordvisible={cpasswordvisible}
                  tooglepassword={() => setcPasswordVisible(!cpasswordvisible)}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Confirm your password"
                  error={
                    errors.confirmPassword && touched.confirmPassword
                      ? 1
                      : undefined
                  }
                  errormessage={errors.confirmPassword}
                />

                {error !== "" && (
                  <p className={"text-center text-danger"}>{error}</p>
                )}
                {loading === false &&<>
                  <div className="d-grid gap-2 mb-2 mt-4">
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={handleSignUp}
                    disabled={
                      !values.fullname ||
                      !values.email ||
                      !values.username ||
                      !values.password ||
                      !values.confirmPassword ||
                      errors.fullname ||
                      errors.email ||
                      errors.username ||
                      errors.password ||
                      errors.confirmPassword
                    }
                  >
                    Sign up
                  </button>
                </div>

                <p className="link-text">
                  Already Have an Account? <NavLink to={"/login"}>Sign in .</NavLink>
                </p>
                </>}
                {loading && <>
                <Loader text={'Registering ...'} size={60}/>
                </>}
               
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
