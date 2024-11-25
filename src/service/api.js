/** @format */

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const endpoints = {
	SIGNUP_API: `${BASE_URL}/auth/register`,
	LOGIN_API: `${BASE_URL}/auth/login`,
	GET_ME_API: `${BASE_URL}/auth/me`,
	FORGET_PASSWORD_API: `${BASE_URL}/auth/forgetPassword`,
};

export const requestEndpoints = {
	GET_ALL_REQUEST: `${BASE_URL}/requests`,
	GET_REQUEST_BY_ID: (id) => `${BASE_URL}/requests/${id}`,
	UPDATE_REQUEST: (id) => `${BASE_URL}/requests/${id}`,
	DELETE_REQUEST: (id) => `${BASE_URL}/requests/${id}`,
};

export const usersEndpoints = {
	GET_ALL_USER: `${BASE_URL}/users`,
	GET_USER_BY_ID: (id) => `${BASE_URL}/users/${id}`,
	UPDATE_USER: (id) => `${BASE_URL}/users/${id}`,
	DELETE_USER: (id) => `${BASE_URL}/users/${id}`,
	RESET_PASSWORD: `${BASE_URL}/users/resetPassword`,
};
