import React, { useEffect, useState } from "react";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import PasswordInput from "../../Components/TextInput/PasswordInput";
import LoginSchema from "../../Schema/LoginSchema";
import { useDispatch } from "react-redux";
import { login } from "../../Api/internal";
import TextInput from "../../Components/TextInput/TextInput";
import { useFormik } from "formik";
import { setUser } from "../../Store/UserSlice";
import Loader from '../../Components/Loader/Loader'
import { switchAlert } from "../../Store/WorkoutSlice";
import { MyAlert } from "../../Hooks/useAlert";
const Login = ({isAuth}) => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading,setLoading] =useState(false);

  const handleLogin = async () => {
    setLoading(true)
    const data = {
      username: values.username,
      password: values.password,
    };
    const response = await login(data);
    if (response.status === 200) {
      // 1. set user
      const user = {
        _id: response.data.user._id,
        email: response.data.user.email,
        username: response.data.user.username,
        profileImage:response.data.user.profileImage,
        fullname:response.data.user.fullname,
        auth: response.data.auth,
      };
      dispatch(setUser(user));

      // 2. redirect
      navigate("/");
    } else if (response.response.status === 401) {
      // setError(response.response.data.message);

  setError("Invalid Credentials");
    }
    // console.log(response.response);

    setLoading(false)
  };

  const [passwordvisible, setPasswordVisible] = useState(false);
  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
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
            <div className="col-md-8">
             
       <h2 className='text-dark' style={{fontFamily:'monospace'}}>Welcome to <span className='text-primary' style={{fontFamily:'cursive',fontWeight:'bold'}}>F</span>Tracker  📋🏋️‍♀️</h2>
        
              
              <p className="mb-4">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Inventore doloribus, assumenda provident .
              </p>
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
                  label={true}
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
                {error !== "" && (
                  <p className={"text-center text-danger"}>{error}</p>
                )}
                {loading===false &&<> <div className="d-grid gap-2 mb-2 mt-4">
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={handleLogin}
                    disabled={
                      !values.username ||
                      !values.password ||
                      errors.username ||
                      errors.password
                    }
                  >
                    Sign in
                  </button>
                </div>

               
                <p className="link-text">
                  Don't Have an Account?{" "}
                  <NavLink to={"/signup"}>Register here.</NavLink>
                </p>
                </>
}
                {loading && <>
                <Loader text={'Signing ...'} size={60} />
                </>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
