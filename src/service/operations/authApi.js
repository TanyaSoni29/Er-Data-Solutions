/** @format */

import { toast } from 'react-hot-toast';
import { endpoints } from '../api';
import { apiConnector } from '../apiConnector';
import {
	setIsAuth,
	setLoading,
	setToken,
	setUser,
} from '../../slices/authSlice';

const { LOGIN_API, SIGNUP_API, GET_ME_API } = endpoints;

export function signUp(data, navigate) {
	return async (dispatch) => {
		dispatch(setLoading(true));
		try {
			const response = await apiConnector('POST', SIGNUP_API, {
				firstName: data.firstName || '',
				lastName: data.lastName || '',
				email: data.email,
				dob: data.dob || '', // Added Date of Birth field
				password: data.password,
				password_confirmation: data.confirmPassword,
				phone_number: data.phone_number,
				address: data.address || '',
				preferred_location: data.preferred_location || '',
				referred_by: data.referred_by || '',
				gender: data.gender || '',
				post_code: data.post_code,
				role: data.role,
			});
			console.log('SIGNUP API RESPONSE.........', response);

			if (!response.data.success) {
				throw new Error(response.data.message);
			}
			toast.success('Signup Successfully');
			navigate('/login');
		} catch (error) {
			console.log('SIGNUP API ERROR.........', error);
			const errorMessage = error.response.data.error;
			toast.error(errorMessage);
			navigate('/signup');
		}
		dispatch(setLoading(false));
	};
}

export function login(email, password, navigate) {
	return async (dispatch) => {
		dispatch(setLoading(true));
		try {
			const response = await apiConnector('POST', LOGIN_API, {
				email,
				password,
			});

			console.log('LOGIN API RESPONSE.........', response);

			if (response.status !== 200) {
				throw new Error(response.data);
			}
			toast.success('Login Successfully');

			dispatch(setToken(response.data.token));
			dispatch(setIsAuth(true));

			localStorage.setItem('token', JSON.stringify(response.data.token));
			// Store expiration time

			navigate('/dashboard');
		} catch (error) {
			console.log('LOGIN API ERROR........', error);
			const errorMessage = error.response.data.message;
			toast.error(errorMessage);
		}
		dispatch(setLoading(false));
	};
}

export function getMe(navigate) {
	return async (dispatch, getState) => {
		// Check for token in Redux state or localStorage
		const storedToken = getState().auth.token || localStorage.getItem('token');

		if (!storedToken) {
			console.log('No token provided, redirecting to sign-in.');
			toast.error('No token found. Please log in.');
			dispatch(setToken(null));
			dispatch(setIsAuth(false));
			dispatch(setUser(null));
			navigate('/'); // Redirect to login
			return;
		}
		dispatch(setLoading(true));

		try {
			// Fetch current user details using token
			const response = await apiConnector('POST', GET_ME_API, null, {
				'Authorization': `Bearer ${storedToken}`,
				'Content-Type': 'application/json',
			});

			console.log('GET ME API RESPONSE.........', response);

			if (response.status !== 200) {
				throw new Error(response.data);
			}

			// Save user info and mark the user as authenticated
			dispatch(setUser(response.data.user));
			dispatch(setIsAuth(true));

			// Redirect user to locationStep or other relevant page
			// navigate('/about');
		} catch (error) {
			console.log('GET ME API ERROR........', error);

			// const errorMessage = error?.response?.data?.error || '';
			// toast.error(errorMessage);

			// Log user out on failure
			dispatch(setToken(null));
			dispatch(setIsAuth(false));
			localStorage.removeItem('token');
			// Redirect to login page
			navigate('/');
		} finally {
			dispatch(setLoading(false));
		}
	};
}

export function logout(navigate) {
	return (dispatch) => {
		console.log('LOGOUT');
		dispatch(setToken(null));
		dispatch(setUser(null));
		dispatch(setIsAuth(false));
		localStorage.removeItem('token');
		toast.success('Logged Out');
		navigate('/');
	};
}
