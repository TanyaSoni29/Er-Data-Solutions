/** @format */

import toast from 'react-hot-toast';
import { usersEndpoints } from '../api';
import { apiConnector } from '../apiConnector';

const {
  GET_ALL_USERS,
  GET_USER_BY_ID,
  UPDATE_USER,
  DELETE_USER,
  RESET_PASSWORD,
} = usersEndpoints;

// Create a new user
export const createUser = async (token, data) => {
  try {
    const response = await apiConnector('POST', GET_ALL_USERS, data, {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    console.log('Create New User API Response:', response.data);
    if (response.status !== 201) throw new Error('Could not create user');

    toast.success('User profile created successfully');
    return response.data;
  } catch (error) {
    console.log('Create User API Error', error);
    const errorMessage = error.response?.data?.errors || 'An error occurred';
    toast.error(errorMessage);
  }
};

// Get all users
export const getAllUsers = async (token) => {
  let result = [];
  try {
    const response = await apiConnector('GET', GET_ALL_USERS, null, {
      Authorization: `Bearer ${token}`,
    });

    console.log('Get All Users API Response:', response);
    if (response.status !== 200) throw new Error('Could not fetch users');
    result = response.data;
  } catch (error) {
    console.log('Get All Users API Error', error);
    const errorMessage = error.response?.data?.error || 'An error occurred';
    toast.error(errorMessage);
  }
  return result;
};

// Get user by ID
export const getUserById = async (token, userId) => {
  try {
    const response = await apiConnector('GET', GET_USER_BY_ID(userId), null, {
      Authorization: `Bearer ${token}`,
    });

    console.log('Get User By ID API Response:', response);
    if (response.status !== 200) throw new Error('Could not fetch user');
    return response.data;
  } catch (error) {
    console.log('Get User By ID API Error', error);
    const errorMessage = error.response?.data?.error || 'An error occurred';
    toast.error(errorMessage);
  }
};

// Update user
export const updateUser = async (token, userId, data) => {
  try {
    const response = await apiConnector('PUT', UPDATE_USER(userId), data, {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    console.log('Update User API Response:', response.data);
    if (response.status !== 200) throw new Error('Could not update user');

    toast.success('User profile updated successfully');
    return response.data;
  } catch (error) {
    console.log('Update User API Error', error);
    const errorMessage = error.response?.data?.errors || 'An error occurred';
    toast.error(errorMessage);
  }
};

// Delete user
export const deleteUserById = async (token, userId) => {
  try {
    const response = await apiConnector('DELETE', DELETE_USER(userId), null, {
      Authorization: `Bearer ${token}`,
    });

    console.log('Delete User API Response:', response);
    if (response.status !== 200) throw new Error('Could not delete user');
    toast.success('User deleted successfully');
    return true;
  } catch (error) {
    console.log('Delete User API Error', error);
    const errorMessage = error.response?.data?.error || 'An error occurred';
    toast.error(errorMessage);
    return false;
  }
};

// Reset password
export const resetPassword = async (data) => {
  try {
    const response = await apiConnector('POST', RESET_PASSWORD, {
      email: data.email,
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });

    console.log('Reset Password API Response:', response);
    if (response.status !== 200) throw new Error('Could not reset password');

    toast.success('Password reset successfully');
    return response.data;
  } catch (error) {
    console.log('Reset Password API Error', error);
    const errorMessage = error.response?.data?.message || 'An error occurred';
    toast.error(errorMessage);
  }
};
