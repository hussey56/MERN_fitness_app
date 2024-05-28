import * as yup from 'yup';

const WorkoutSchema =  yup.object().shape({
    name:yup.string().min(5).max(30).required('Workout Name is required'),
});
export default WorkoutSchema