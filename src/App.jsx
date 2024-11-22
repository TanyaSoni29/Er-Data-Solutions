/** @format */

import { useEffect, useState } from 'react';
import {
	// BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
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
import './App.css';
import AddUserSecond from './pages/AddUserSecond';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from './service/operations/authApi';
import ProtectedRoute from './utils/ProtectedRoute';

const App = () => {
	const dispatch = useDispatch();
	const { token } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.auth);
	const [addUserDate1, setAddUserData1] = useState({});
	const [editUserDate1, setEditUserData1] = useState({});
	const navigate = useNavigate();

	// Fetch user info on app load if token is available
	useEffect(() => {
		if (token) {
			dispatch(getMe(navigate));
		}
	}, [dispatch, token]);

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

				{user?.role === '1' && (
					<Route
						path='/dashboard'
						element={<ProtectedRoute element={<Dashboard />} />}
					/>
				)}
				{user?.role === '2' && (
					<Route
						path='/dashboard'
						element={<ProtectedRoute element={<Dashboard1 />} />}
					/>
				)}
				{user?.role === '2' && (
					<Route
						path='/dashboard-1'
						element={<ProtectedRoute element={<Dashboard2 />} />}
					/>
				)}
				<Route
					path='/users'
					element={
						<ProtectedRoute
							element={
								<Users
									setAddUserData1={setAddUserData1}
									setEditUserData1={setEditUserData1}
									editUserDate1={editUserDate1}
								/>
							}
						/>
					}
				/>

				<Route
					path='/users/addUser'
					element={
						<ProtectedRoute
							element={<AddUserSecond addUserDate1={addUserDate1} />}
						/>
					}
				/>
				<Route
					path='/profiles'
					element={<ProtectedRoute element={<Profiles />} />}
				/>
				<Route
					path='/requests'
					element={<ProtectedRoute element={<Request />} />}
				/>
				<Route
					path='/requestsList'
					element={<ProtectedRoute element={<RequestUser />} />}
				/>
			</Routes>
		</div>
	);
};

export default App;
