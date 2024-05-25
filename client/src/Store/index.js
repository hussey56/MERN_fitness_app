import { configureStore } from '@reduxjs/toolkit';
import user from './UserSlice';

const store = configureStore({
    reducer:{user}
});
export default store;