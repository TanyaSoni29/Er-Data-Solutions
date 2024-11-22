/** @format */

import React, { useEffect, useState } from 'react';
import {
	// BrowserRouter as Router,
	Route,
	Routes,
	// useNavigate,
} from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getMe } from './service/operations/authApi';
// import ProtectedRoute from './utils/ProtectedRoute';
import './App.css';
import LoginForm from './components/Authentication/LoginForm';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Request from './pages/Request';
import ForgotPassword from './components/Authentication/ForgetPassword';
import Dashboard1 from './pages/Dashboard1';
import Dashboard2 from './pages/Dashboard2';
import Profiles from './pages/Profiles';
import RequestUser from './pages/RequestUser';

const App = () => {
	// const dispatch = useDispatch();
	// const { token } = useSelector((state) => state.auth);

	// const navigate = useNavigate();

	// Fetch user info on app load if token is available
	// useEffect(() => {
	// 	if (token) {
	// 		dispatch(getMe(navigate));
	// 	}
	// }, [dispatch, token]);

	return (
		<div className='flex flex-col h-screen w-screen bg-white'>
			<Routes>
				<Route
					path='/'
					element={<LoginForm />}
				/>
				<Route
					path='/forgot-password'
					element={<ForgotPassword />}
				/>

				{/* <Route
					path='/dashboard'
					element={<ProtectedRoute element={<Dashboard />} />}
				/> */}
				<Route
					path='/dashboard'
					element={<Dashboard />}
				/>
				<Route
					path='/dashboard-1'
					element={<Dashboard1 />}
				/>
				<Route
					path='/dashboard-2'
					element={<Dashboard2 />}
				/>
				<Route
					path='/users'
					element={<Users />}
				/>
				<Route
					path='/profiles'
					element={<Profiles />}
				/>
				<Route
					path='/requests'
					element={<Request />}
				/>
				<Route
					path='/requestsList'
					element={<RequestUser />}
				/>
			</Routes>
		</div>
	);
};

export default App;
