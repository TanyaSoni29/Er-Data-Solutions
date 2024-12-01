/** @format */

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const endpoints = {
	SIGNUP_API: `${BASE_URL}/auth/register`,
	LOGIN_API: `${BASE_URL}/auth/login`,
	GET_ME_API: `${BASE_URL}/auth/me`,
	FORGET_PASSWORD_API: `${BASE_URL}/auth/forgetPassword`,
};

export const requestEndpoints = {
	GET_ALL_REQUEST: `${BASE_URL}/requests`, // Get all requests (admin/debugging)
	GET_REQUESTS_BY_USER: (userId) => `${BASE_URL}/requests/user/${userId}`, // Get requests by userId
	GET_REQUEST_BY_ID: (id) => `${BASE_URL}/requests/${id}`, // Get request by ID
	UPDATE_REQUEST: (id) => `${BASE_URL}/requests/${id}`, // Update request by ID
	DELETE_REQUEST: (id) => `${BASE_URL}/requests/${id}`, // Delete request by ID
};

export const usersEndpoints = {
	GET_ALL_USERS: `${BASE_URL}/users`, // Fetch all users
	GET_USER_BY_ID: (id) => `${BASE_URL}/users/${id}`, // Fetch user by ID
	UPDATE_USER: (id) => `${BASE_URL}/users/${id}`, // Update user by ID
	DELETE_USER: (id) => `${BASE_URL}/users/${id}`, // Delete user by ID
	CREATE_USER: `${BASE_URL}/users`, // Create a new user
	RESET_PASSWORD: `${BASE_URL}/users/resetPassword`, // Reset password
};

export const formEndpoints = {
	GET_ALL_FORMS: `${BASE_URL}/forms`, // Fetch all forms
	GET_FORM_BY_ID: (id) => `${BASE_URL}/forms/${id}`, // Get form by ID
	CREATE_FORM: `${BASE_URL}/forms`, // Create a new form
	UPDATE_FORM: (id) => `${BASE_URL}/forms/${id}`, // Update form by ID
	DELETE_FORM: (id) => `${BASE_URL}/forms/${id}`, // Delete form by ID
  };

