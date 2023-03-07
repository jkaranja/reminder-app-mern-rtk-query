import { createSlice } from "@reduxjs/toolkit";

//slice
const initialState = {
  uploadProgress: 0,
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
  },
});

export const { setUploadProgress } = notesSlice.actions;

export const selectNotes = (state) => state.notes;

export default notesSlice.reducer;
