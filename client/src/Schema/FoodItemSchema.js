import * as yup from 'yup';

const FoodItemSchema =  yup.object().shape({
    name:yup.string().min(3).max(30).required("Item name is required"),
    calories:yup.number().min(1).required('Calories is required'),
    quantity:yup.number().min(1).required('Quantity is required'),
    protein:yup.number().min(1).required('Protein is required'),
    carbs:yup.number().min(1).required('Cardb is required'),
    fat:yup.number().min(1).required('Fat is required'),
});
export default FoodItemSchema