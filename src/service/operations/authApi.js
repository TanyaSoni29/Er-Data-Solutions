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

const { LOGIN_API, SIGNUP_API, GET_ME_API, FORGET_PASSWORD_API } = endpoints;

export function signUp(data, navigate) {
	return async (dispatch) => {
		dispatch(setLoading(true));
		try {
			const response = await apiConnector('POST', SIGNUP_API, {
				contactPerson: `${data.firstName} ${data.lastName}`,
				email: data.email,
				password: data.password,
				role: data.role || '2',
			});
			console.log('SIGNUP API RESPONSE.........', response);

			if (response.status !== 201) {
				throw new Error(response.data.message);
			}

			const user = response.data.user;
			dispatch(setToken(response.data.token));
			dispatch(setUser(user)); // Assuming `setUser` stores user details
			dispatch(setIsAuth(true));

			localStorage.setItem('token', JSON.stringify(response.data.token));

			console.log(user);

			toast.success('Signup Successfully');
			if (user.role === '1') {
				navigate('/dashboard-role1'); // Admin Dashboard
			} else if (user.role === '2') {
				navigate('/dashboard-role2'); // Regular User Dashboard
			} else {
				navigate('/'); // Default route if no role matches
			}
		} catch (error) {
			console.log('SIGNUP API ERROR.........', error);
			const errorMessage = error.response.data.error;
			toast.error(errorMessage);
			navigate('/');
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

			// Store token and user in Redux
			const { token, user } = response.data;
			dispatch(setToken(token));
			dispatch(setUser(user)); // Assuming `setUser` stores user details
			dispatch(setIsAuth(true));

			// Save token to local storage
			localStorage.setItem('token', JSON.stringify(token));

			// Navigate based on user role
			if (user.role === '1') {
				navigate('/dashboard-role1'); // Admin Dashboard
			} else if (user.role === '2') {
				navigate('/dashboard-role2'); // Regular User Dashboard
			} else {
				navigate('/'); // Default route if no role matches
			}
		} catch (error) {
			console.log('LOGIN API ERROR........', error);
			const errorMessage =
				error.response?.data?.error || 'Something went wrong';
			toast.error(errorMessage);
		}
		dispatch(setLoading(false));
	};
}

// Ensure refreshToken is declared and exported
export const refreshToken = async () => {
	const response = await fetch('/api/auth/refresh', {
		method: 'POST',
		credentials: 'include', // Include cookies if required
	});
	if (!response.ok) {
		throw new Error('Failed to refresh token');
	}
	return await response.json();
};

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
			localStorage.removeItem('hasModalShown');
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
		localStorage.removeItem('hasModalShown');
		toast.success('Logged Out');
		navigate('/');
	};
}

export const forgetPassword = async (email) => {
	try {
		// Fetch current user details using token
		const response = await apiConnector('POST', FORGET_PASSWORD_API, { email });

		console.log('Forget Password API RESPONSE.........', response);

		if (response.status !== 200) {
			throw new Error(response.data);
		}

		return response.data;
	} catch (error) {
		console.log('Forget Password API ERROR........', error);
		toast.error(error.response.data.error || 'Forget Password Error');
	}
};
