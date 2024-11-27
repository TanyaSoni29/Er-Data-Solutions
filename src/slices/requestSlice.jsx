/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { getAllRequest, getUserRequests } from "../service/operations/requestApi";

const initialState = {
  request: null,
  loading: false,
  requests: [], // All requests
  userRequests: [], // Requests specific to the logged-in user
};

const requestSlice = createSlice({
  name: "request",
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setRequests: (state, action) => {
      state.requests = action.payload; // Sets all requests
      state.loading = false;
    },
    setUserRequests: (state, action) => {
      state.userRequests = action.payload; // Sets user-specific requests
      state.loading = false;
    },
    setRequest: (state, action) => {
      state.request = action.payload; // Sets a single request
      state.loading = false;
    },
    addRequest: (state, action) => {
      state.requests.push(action.payload);
      state.userRequests.push(action.payload); // Add to both lists if necessary
      state.loading = false;
    },
    updateRequest: (state, action) => {
      const indexAll = state.requests.findIndex(
        (request) => request.id === action.payload.id
      );
      const indexUser = state.userRequests.findIndex(
        (request) => request.id === action.payload.id
      );

      if (indexAll !== -1) {
        state.requests[indexAll] = action.payload;
      }

      if (indexUser !== -1) {
        state.userRequests[indexUser] = action.payload;
      }

      state.loading = false;
    },
    removeRequest: (state, action) => {
      state.requests = state.requests.filter(
        (request) => request.id !== action.payload
      );
      state.userRequests = state.userRequests.filter(
        (request) => request.id !== action.payload
      );
      state.loading = false;
    },
  },
});

// Fetch all requests (admin or debugging use)
export function refreshRequest() {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
      dispatch(setLoading(true));
      const response = await getAllRequest(token);
      console.log("All Requests Response:", response);

      dispatch(setRequests(response));
    } catch (error) {
      console.error("Failed to refresh all requests:", error);
      dispatch(setLoading(false));
    }
  };
}

// Fetch user-specific requests
export function refreshUserRequests() {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.user.id; // Assuming user ID is stored in auth slice

    try {
      dispatch(setLoading(true));
      const response = await getUserRequests(token, userId);
      console.log("User Requests Response:", response);

      dispatch(setUserRequests(response));
    } catch (error) {
      console.error("Failed to refresh user requests:", error);
      dispatch(setLoading(false));
    }
  };
}

export const {
  setRequests,
  setUserRequests,
  setLoading,
  setRequest,
  addRequest,
  updateRequest,
  removeRequest,
} = requestSlice.actions;

export default requestSlice.reducer;