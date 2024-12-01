/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { getAllForms } from "../service/operations/formApi";

const initialState = {
  forms: [], // All forms
  form: null, // Single form
  loading: false,
};

const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setForms: (state, action) => {
      state.forms = action.payload;
      state.loading = false;
    },
    setForm: (state, action) => {
      state.form = action.payload;
      state.loading = false;
    },
    addForm: (state, action) => {
      state.forms.push(action.payload);
      state.loading = false;
    },
    updateForm: (state, action) => {
      const index = state.forms.findIndex((form) => form.id === action.payload.id);
      if (index !== -1) state.forms[index] = action.payload;
      state.loading = false;
    },
    removeForm: (state, action) => {
      state.forms = state.forms.filter((form) => form.id !== action.payload);
      state.loading = false;
    },
  },
});

// Fetch all forms
export function fetchAllForms() {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
      dispatch(setLoading(true));
      const response = await getAllForms(token);

      console.log("Fetched All Forms:", response);
      dispatch(setForms(response));
    } catch (error) {
      console.error("Failed to fetch forms:", error);
      dispatch(setLoading(false));
    }
  };
}

export const { setLoading, setForms, setForm, addForm, updateForm, removeForm } =
  formSlice.actions;

export default formSlice.reducer;
