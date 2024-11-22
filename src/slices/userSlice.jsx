/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { getAllUser } from '../service/operations/usersApi';

const initialState = {
	user: null,
	loading: false,
	users: [],
};

const userProfileSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setUsers: (state, action) => {
			state.users = action.payload;
			state.loading = false;
		},
		setUser: (state, action) => {
			state.user = action.payload;
			state.loading = false;
		},
		addUser: (state, action) => {
			state.users.push(action.payload);
			state.loading = false;
		},
		updateUser: (state, action) => {
			const index = state.users.findIndex(
				(user) => user.id === action.payload.id
			);
			if (index !== -1) {
				state.users[index] = action.payload;
			}
			state.loading = false;
		},
		removeUser: (state, action) => {
			state.users = state.users.filter((user) => user.id !== action.payload);
			state.loading = false;
		},
	},
});

export function refreshUser() {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		// const selectedUserId = getState().user.user?.user.id;
		try {
			const response = await getAllUser(token);
			console.log(response);
			const users = response.filter((data) => data?.role !== '1');
			dispatch(setUsers(users));
		} catch (error) {
			console.error('Failed to refresh users:', error);
		}
	};
}

export const {
	setUsers,
	setLoading,
	setUser,
	addUser,
	updateUser,
	removeUser,
} = userProfileSlice.actions;
export default userProfileSlice.reducer;
