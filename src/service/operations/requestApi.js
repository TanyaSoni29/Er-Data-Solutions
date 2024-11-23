/** @format */

import toast from 'react-hot-toast';
import { apiConnector } from '../apiConnector';
import { requestEndpoints } from '../api';

const { GET_ALL_REQUEST, GET_REQUEST_BY_ID, UPDATE_REQUEST, DELETE_REQUEST } =
	requestEndpoints;

export const createRequest = async (token, data) => {
	try {
		// Step 1: Register the request
		const response = await apiConnector('POST', GET_ALL_REQUEST, data, {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		});

		console.log('Create New request API Response:', response.data);
		if (response.status !== 201) throw new Error('Could not create request');

		toast.success('request profile created successfully');

		return response.data;
	} catch (error) {
		console.log('Create request API Error', error);
		const errorMessage = error.response?.data?.errors || 'An error occurred';
		toast.error(errorMessage);
	}
};

export const getAllRequest = async (token) => {
	let result = [];
	try {
		const response = await apiConnector('GET', GET_ALL_REQUEST, null, {
			Authorization: `Bearer ${token}`,
		});
		console.log('Get All request Api Response..', response);
		if (response.status !== 200) throw new Error('Could not fetch requests');
		result = response.data;
	} catch (error) {
		console.log('Get All request Api Error', error);
		if (error.response.status !== 404) {
			const errorMessage = error.response?.data?.error;
			toast.error(errorMessage);
		}
	}
	return result;
};

export const getRequestById = async (token) => {
	let result;
	try {
		const response = await apiConnector('GET', GET_REQUEST_BY_ID, null, {
			Authorization: `Bearer ${token}`,
		});
		console.log('Get request Api Response..', response);
		if (response.status !== 200) throw new Error('Could not fetch request');
		result = response.data;
	} catch (error) {
		console.log('Get request Api Error', error);
		if (error.response.status !== 404) {
			const errorMessage = error.response?.data?.error;
			toast.error(errorMessage);
		}
	}
	return result;
};

export const updateRequest = async (token, requestId, data) => {
	try {
		const response = await apiConnector(
			'POST',
			UPDATE_REQUEST(requestId),
			data,
			{
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			}
		);

		console.log('Create New request API Response:', response.data);
		if (response.status !== 200) throw new Error('Could not create request');

		toast.success('request profile updated successfully');

		return response.data;
	} catch (error) {
		console.log('Update request API Error', error);
		const errorMessage = error.response?.data?.errors || 'An error occurred';
		toast.error(errorMessage);
	}
};

export const deleteRequestById = async (token, requestId) => {
	let result;
	try {
		const response = await apiConnector(
			'DELETE',
			DELETE_REQUEST(requestId),
			null,
			{
				Authorization: `Bearer ${token}`,
			}
		);
		console.log('Delete request Api Response..', response);
		if (response.status !== 200) throw new Error('Could not Delete request');
		result = true;
	} catch (error) {
		result = false;
		console.log('Delete request Api Error', error);
		if (error.response.status !== 404) {
			const errorMessage = error.response?.data?.error;
			toast.error(errorMessage);
		}
	}
	return result;
};
