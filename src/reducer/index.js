/** @format */

import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '../slices/authSlice';
import userReducer from '../slices/userSlice';
import requestReducer from '../slices/requestSlice';
import formReducer from "../slices/formSlice";

const rootReducer = combineReducers({
	auth: authReducer,
	user: userReducer,
	request: requestReducer,
	forms: formReducer
});

export default rootReducer;
