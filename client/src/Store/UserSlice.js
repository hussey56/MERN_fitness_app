import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  email: "",
  username: "",
  fullname: "",
  auth: false,
  alerts:[],
  newAlert:[]
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { _id, email, username, auth, fullname } = action.payload;
      state._id = _id;
      state.email = email;
      state.username = username;
      state.fullname = fullname;
      state.auth = auth;
    },
    resetUser: (state, action) => {
      state._id = "";
      state.email = "";
      state.username = "";
      state.fullname = "";
      state.auth = false;
    },
    setAlerts:(state,action)=>{
      state.alerts = action.payload;
    }
  },
});

export const { setUser, resetUser ,setAlerts} = UserSlice.actions;

export default UserSlice.reducer;
