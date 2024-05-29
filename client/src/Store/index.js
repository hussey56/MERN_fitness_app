import { configureStore } from '@reduxjs/toolkit';
import user from './UserSlice';
import workout from './WorkoutSlice';
import diet from './DietSlice'
const store = configureStore({
    reducer:{user,workout,diet}
});
export default store;