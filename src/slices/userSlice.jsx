/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { getAllUsers } from '../service/operations/usersApi';

const initialState = {
	user: null,
	loading: false,
	users: [],
	stats: {
		totalUsers: 0, // Total users in the system
		clients: 0, // Users with role === '2'
		dashboardsCount: 0, // Total dashboard URLs across users
	},
};

const userSlice = createSlice({
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
		setStats: (state, action) => {
			state.stats = action.payload;
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
		try {
			dispatch(setLoading(true)); // Set loading to true while fetching users
			const response = await getAllUsers(token);
			console.log('Users fetched successfully:', response);

			// Calculate total users (all users)
			const totalUsers = response.length;

			// Calculate clients (users with role === '2')
			const clients = response.filter((user) => user.role === '2').length;

			// Calculate dashboard counts
			const usersWithDashboards = response
				.map((user) => {
					const dashboardKeys = [
						'dashboardUrl1',
						'dashboardUrl2',
						'dashboardUrl3',
					];
					return {
						userName: user?.contactPerson,
						userId: user.id,
						d1: !!user.dashboardUrl1, // Boolean for Dashboard 1
						d2: !!user.dashboardUrl2, // Boolean for Dashboard 2
						d3: !!user.dashboardUrl3, // Boolean for Dashboard 3
					};
				})
				.filter((user) => user.d1 || user.d2 || user.d3);

			// Dispatch actions to set users and stats
			dispatch(setUsers(response));
			dispatch(
				setStats({
					totalUsers,
					clients,
					dashboardsCount: usersWithDashboards.length,
					usersWithDashboards,
				})
			);
		} catch (error) {
			console.error('Failed to refresh users:', error);
			dispatch(setLoading(false)); // Reset loading in case of error
		}
	};
}

export const {
	setUsers,
	setLoading,
	setStats,
	setUser,
	addUser,
	updateUser,
	removeUser,
} = userSlice.actions;

export default userSlice.reducer;
