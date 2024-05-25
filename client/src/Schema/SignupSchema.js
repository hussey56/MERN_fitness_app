import * as yup from 'yup';
const passwordPattern =/^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,25}/;
const ErroMessage = 'use atleast 1 lowercase, uppercase and digit'
const SignupSchema =  yup.object().shape({
    username:yup.string().min(5).max(30).required('username is required'),
    fullname:yup.string().max(30).required("Name is Required"),
    email:yup.string().email('enter a valid email').required("Email is Required"),
    password:yup.string().min(8).max(25).matches(passwordPattern,{message:ErroMessage}).required("Password is Required"),
    confirmPassword:yup.string().oneOf([yup.ref('password')],'Password must match').required("password is required")
});
export default SignupSchema