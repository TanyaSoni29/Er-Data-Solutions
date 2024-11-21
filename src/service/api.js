/** @format */

const BASE_URL = import.meta.env.BASE_URL;

export const endpoints = {
	SIGNUP_API: BASE_URL + '/register',
	LOGIN_API: BASE_URL + '/login',
	GET_ME_API: BASE_URL + '/me',
	// UPDATE_PASSWORD_API: BASE_URL + "/user/updatePassword",
	// RESET_PASSWORD_API: BASE_URL + '/password/reset',
	// FORGET_PASSWORD_API: BASE_URL + '/password/forget',
};
