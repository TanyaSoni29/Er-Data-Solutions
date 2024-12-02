/** @format */

import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from './service/operations/authApi';
import ProtectedRoute from './utils/ProtectedRoute';
import './App.css';
import LoginForm from './components/Authentication/LoginForm';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Request from './pages/Request';
import ReqListEdit from './components/Request/ReqListEdit';
import Historylist from './components/Request/Historylist';
import Historylistedit from './components/Request/Historylistedit';
import ForgotPassword from './components/Authentication/ForgetPassword';
import Dashboard1 from './pages/Dashboard1';
import Dashboard2 from './pages/Dashboard2';
import Dashboard3 from './pages/Dashboard3';
import Profiles from './pages/Profiles';
import ModelFile from './pages/model.jsx';
import RequestUser from './pages/RequestUser';
import AddUserSecond from './pages/AddUserSecond';

const App = () => {
	const dispatch = useDispatch();
	const { token } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	const [addUserDate1, setAddUserData1] = useState({});
	const [editUserDate1, setEditUserData1] = useState({});

	// Fetch user info on app load if token is available
	useEffect(() => {
		if (token) {
			dispatch(getMe(navigate));
		}
	}, [dispatch, token]);

	return (
		<div className='flex flex-col h-screen w-screen bg-white'>
			<Routes>
				{/* Public Routes */}
				<Route
					path='/'
					element={<LoginForm />}
				/>
				<Route
					path='/forgot-password'
					element={<ForgotPassword />}
				/>

				{/* Protected Routes */}
				<Route
					path='/dashboard-role1'
					element={
						<ProtectedRoute
							element={<Dashboard />}
							allowedRoles={['1']} // Only role 1 can access
						/>
					}
				/>
				<Route
					path='/dashboard-role2'
					element={
						<ProtectedRoute
							element={<Dashboard1 />}
							allowedRoles={['2']} // Only role 2 can access
						/>
					}
				/>
				<Route
					path='/dashboard-1'
					element={
						<ProtectedRoute
							element={<Dashboard2 />}
							allowedRoles={['2']} // Only role 2 can access
						/>
					}
				/>
				<Route
					path='/dashboard-3'
					element={
						<ProtectedRoute
							element={<Dashboard3 />}
							allowedRoles={['2']} // Only role 2 can access
						/>
					}
				/>
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
							allowedRoles={['1']} // Only role 1 can access
						/>
					}
				/>
				<Route
					path='/users/addUser'
					element={
						<ProtectedRoute
							element={<AddUserSecond addUserDate1={addUserDate1} />}
							allowedRoles={['1']} // Only role 1 can access
						/>
					}
				/>
				<Route
					path='/profiles'
					element={
						<ProtectedRoute
							element={<Profiles />}
							allowedRoles={['1', '2']} // Both roles 1 and 2 can access
						/>
					}
				/>
				<Route
					path='/model'
					element={
						<ProtectedRoute
							element={<ModelFile />}
							allowedRoles={['1', '2']} // Both roles 1 and 2 can access
						/>
					}
				/>
				<Route
					path='/requests'
					element={
						<ProtectedRoute
							element={<Request />}
							allowedRoles={['2']} // Both roles 1 and 2 can access
						/>
					}
				/>
				<Route
					path='/reqeditlist'
					element={
						<ProtectedRoute
							element={<ReqListEdit />}
							allowedRoles={['1']} // Both roles 1 and 2 can access
						/>
					}
				/>
				<Route
					path='/historylist'
					element={
						<ProtectedRoute
							element={<Historylist />}
							allowedRoles={['2']} // Both roles 1 and 2 can access
						/>
					}
				/>
				<Route
					path='/historylistedit'
					element={
						<ProtectedRoute
							element={<Historylistedit />}
							allowedRoles={['2']} // Both roles 1 and 2 can access
						/>
					}
				/>
				<Route
					path='/requestsList'
					element={
						<ProtectedRoute
							element={<RequestUser />}
							allowedRoles={['1', '2']} // Both roles 1 and 2 can access
						/>
					}
				/>
			</Routes>
		</div>
	);
};

export default App;
