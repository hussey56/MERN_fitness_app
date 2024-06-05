import * as yup from 'yup';
const passwordPattern =/^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,25}/;
const ErroMessage = 'use atleast 1 lowercase, uppercase and digit'
const PasswordSchema =  yup.object().shape({
    oldpassword:yup.string().min(5).max(30).required('Old Password is required'),
    newpassword:yup.string().min(8).max(25).matches(passwordPattern,{message:ErroMessage}).required("New Password is Required"),
});
export default PasswordSchema