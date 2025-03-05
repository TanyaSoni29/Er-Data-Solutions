import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllNotifications, markNotificationAsRead } from "../service/operations/userNotificationApi";

// ✅ 1. Fetch Notifications Thunk
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchAll",
  async ({ token, userId }, { rejectWithValue }) => {
    try {
      const data = await getAllNotifications(token, userId);
      return data; // API response return karega
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ✅ 2. Mark Notification as Read Thunk
export const markAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async ({ token, notificationId }, { rejectWithValue }) => {
    try {
      await markNotificationAsRead(token, notificationId);
      return notificationId; // Redux store me isRead update karne ke liye
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 📌 Notification Slice
const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch Notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Mark Notification as Read
      .addCase(markAsRead.fulfilled, (state, action) => {
        state.notifications = state.notifications.map((notif) =>
          notif.id === action.payload ? { ...notif, isRead: true } : notif
        );
      });
  },
});

export default notificationSlice.reducer;
