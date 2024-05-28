import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    workouts:[],
}

export const WorkoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    setWorkout: (state, action) => {
      state.workouts = action.payload
    },
  },
});

export const { setWorkout } = WorkoutSlice.actions;

export default WorkoutSlice.reducer;
