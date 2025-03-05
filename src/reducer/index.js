/** @format */

import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '../slices/authSlice';
import userReducer from '../slices/userSlice';
import requestReducer from '../slices/requestSlice';
import formReducer from "../slices/formSlice";
import userNotificationReducer from "../slices/userNotificationSlice";

const rootReducer = combineReducers({
	auth: authReducer,
	user: userReducer,
	request: requestReducer,
	forms: formReducer,
	userNotifications: userNotificationReducer
});

export default rootReducer;
