import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  token: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
//slice
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logOut: (state) => void (state.token = null),
    setCredentials: (state, action) => void (state.token = action.payload),
  },
});

export const { reset, logOut, setCredentials } = authSlice.actions;

export const selectCurrentToken = (state) => state.auth;

export default authSlice.reducer;
