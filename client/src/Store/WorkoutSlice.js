import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    workouts:[],
    showalert:false
}

export const WorkoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    setWorkout: (state, action) => {
      state.workouts = action.payload
    },
    switchAlert:(state,action)=>{
      state.showalert = action.payload;
    }
  },
});

export const { setWorkout,switchAlert } = WorkoutSlice.actions;

export default WorkoutSlice.reducer;
