import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  email: "",
  username: "",
  fullname: "",
  profileImage:"",
  auth: false,
  alerts:[],
  num:0
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { _id, email, username, auth, fullname,profileImage } = action.payload;
      state._id = _id;
      state.email = email;
      state.username = username;
      state.fullname = fullname;
      state.profileImage = profileImage;
      state.auth = auth;
    },
    resetUser: (state, action) => {
      state._id = "";
      state.email = "";
      state.username = "";
      state.fullname = "";
      state.profileImage = "";
      state.auth = false;
    },
    setAlerts:(state,action)=>{
      state.alerts = action.payload;
    },
    counterNum:(state,action)=>{
      state.num +=1; 
    }
  },
});

export const { setUser, resetUser ,setAlerts,counterNum} = UserSlice.actions;

export default UserSlice.reducer;
