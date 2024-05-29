import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    diets:[],
}

export const DietSlice = createSlice({
  name: "diet",
  initialState,
  reducers: {
    setDiet: (state, action) => {
      state.diets = action.payload
    },
  },
});

export const { setDiet } = DietSlice.actions;

export default DietSlice.reducer;
