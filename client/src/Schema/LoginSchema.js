import * as yup from 'yup';

const LoginSchema =  yup.object().shape({
    username:yup.string().min(5).max(30).required('username is required'),
    password:yup.string().required('Password is required')
});
export default LoginSchema