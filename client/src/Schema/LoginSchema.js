import * as yup from 'yup';
const passwordPattern =/^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,25}/;
const ErroMessage = 'use atleast 1 lowercase, uppercase and digit'

const LoginSchema =  yup.object().shape({
    username:yup.string().min(5).max(30).required('username is required'),
    password:yup.string().min(8).max(25).matches(passwordPattern,{message:ErroMessage}).required()
});
export default LoginSchema