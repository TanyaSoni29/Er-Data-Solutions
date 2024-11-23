/** @format */

import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '../slices/authSlice';
import userReducer from '../slices/userSlice';
import requestReducer from '../slices/requestSlice';

const rootReducer = combineReducers({
	auth: authReducer,
	user: userReducer,
	request: requestReducer
});

export default rootReducer;
