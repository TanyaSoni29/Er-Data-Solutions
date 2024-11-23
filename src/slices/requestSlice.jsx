/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { getAllRequest } from '../service/operations/requestApi';

const initialState = {
	request: null,
	loading: false,
	requests: [],
};

const requestSlice = createSlice({
	name: 'request',
	initialState: initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setRequests: (state, action) => {
			state.requests = action.payload;
			state.loading = false;
		},
		setRequest: (state, action) => {
			state.request = action.payload;
			state.loading = false;
		},
		addRequest: (state, action) => {
			state.requests.push(action.payload);
			state.loading = false;
		},
		updateRequest: (state, action) => {
			const index = state.requests.findIndex(
				(request) => request.id === action.payload.id
			);
			if (index !== -1) {
				state.requests[index] = action.payload;
			}
			state.loading = false;
		},
		removeRequest: (state, action) => {
			state.requests = state.requests.filter(
				(request) => request.id !== action.payload
			);
			state.loading = false;
		},
	},
});

export function refreshRequest() {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		// const selectedUserId = getState().user.user?.user.id;
		try {
			const response = await getAllRequest(token);
			console.log(response);

			dispatch(setRequests(response));
		} catch (error) {
			console.error('Failed to refresh users:', error);
		}
	};
}

export const {
	setRequests,
	setLoading,
	setRequest,
	addRequest,
	updateRequest,
	removeRequest,
} = requestSlice.actions;
export default requestSlice.reducer;
