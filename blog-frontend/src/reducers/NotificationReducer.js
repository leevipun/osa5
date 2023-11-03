import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "Notifications",
  initialState,
  reducers: {
    voteNotification(state, action) {
      console.log("mentiin tänne");
      const notification = action.payload;
      return `${notification}`;
    },
    addingNotification(state, action) {
      console.log("täällä ollaan");
      const notification = action.payload;
      return `${notification}`;
    },
    clearNotification() {
      const notification = "";
      return notification;
    },
  },
});

export const { voteNotification, addingNotification, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
