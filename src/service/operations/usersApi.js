/** @format */

import toast from 'react-hot-toast';
import { usersEndpoints } from '../api';
import { apiConnector } from '../apiConnector';

const {
	GET_ALL_USER,
	GET_USER_BY_ID,
	UPDATE_USER,
	DELETE_USER,
	RESET_PASSWORD,
} = usersEndpoints;

export const createUser = async (token, data) => {
	try {
		// Step 1: Register the user
		const response = await apiConnector('POST', GET_ALL_USER, data, {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		});

		console.log('Create New User API Response:', response.data);
		if (response.status !== 201) throw new Error('Could not create User');

		toast.success('User profile created successfully');

		return response.data;
	} catch (error) {
		console.log('Create User API Error', error);
		const errorMessage = error.response?.data?.errors || 'An error occurred';
		toast.error(errorMessage);
	}
};

export const getAllUser = async (token) => {
	let result = [];
	try {
		const response = await apiConnector('GET', GET_ALL_USER, null, {
			Authorization: `Bearer ${token}`,
		});
		console.log('Get All User Api Response..', response);
		if (response.status !== 200) throw new Error('Could not fetch Users');
		result = response.data;
	} catch (error) {
		console.log('Get All User Api Error', error);
		if (error.response.status !== 404) {
			const errorMessage = error.response?.data?.error;
			toast.error(errorMessage);
		}
	}
	return result;
};

export const getUserById = async (token) => {
	let result;
	try {
		const response = await apiConnector('GET', GET_USER_BY_ID, null, {
			Authorization: `Bearer ${token}`,
		});
		console.log('Get User Api Response..', response);
		if (response.status !== 200) throw new Error('Could not fetch User');
		result = response.data;
	} catch (error) {
		console.log('Get User Api Error', error);
		if (error.response.status !== 404) {
			const errorMessage = error.response?.data?.error;
			toast.error(errorMessage);
		}
	}
	return result;
};

export const updateUser = async (token, userId, data) => {
	try {
		const response = await apiConnector('POST', UPDATE_USER(userId), data, {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		});

		console.log('Create New User API Response:', response.data);
		if (response.status !== 200) throw new Error('Could not create User');

		toast.success('User profile updated successfully');

		return response.data;
	} catch (error) {
		console.log('Update User API Error', error);
		const errorMessage = error.response?.data?.errors || 'An error occurred';
		toast.error(errorMessage);
	}
};

export const deleteUserById = async (token, userId) => {
	let result;
	try {
		const response = await apiConnector('GET', DELETE_USER(userId), null, {
			Authorization: `Bearer ${token}`,
		});
		console.log('Delete User Api Response..', response);
		if (response.status !== 200) throw new Error('Could not Delete User');
		result = true;
	} catch (error) {
		result = false;
		console.log('Delete User Api Error', error);
		if (error.response.status !== 404) {
			const errorMessage = error.response?.data?.error;
			toast.error(errorMessage);
		}
	}
	return result;
};

export const resetPassword = async (token, data) => {
	try {
		const response = await apiConnector(
			'POST',
			RESET_PASSWORD,
			{
				email: data.email,
				password: data.password,
			},
			{
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			}
		);

		console.log('Reset Password Api Response..', response);
		if (response.status !== 200)
			throw new Error('Could not Reset Password Api');
		toast.success('Password Reset Successfully');
		return response.data;
	} catch (error) {
		console.log('Reset Password Api Error', error);
		const errorMessage = error.response?.data.message;
		toast.error(errorMessage);
	}
};
