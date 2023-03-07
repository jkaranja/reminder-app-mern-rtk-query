import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//slice not used

const initialState = {
  user: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    reset: (state) => initialState,
  },
});

export const { reset } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
