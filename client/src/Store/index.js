import { configureStore } from '@reduxjs/toolkit';
import user from './UserSlice';
import workout from './WorkoutSlice';
const store = configureStore({
    reducer:{user,workout}
});
export default store;