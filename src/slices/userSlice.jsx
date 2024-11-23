/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { getAllUser } from '../service/operations/usersApi';

const initialState = {
    user: null,
    loading: false,
    users: [],
    stats: {
        totalUsers: 0, // Includes all users
        clients: 0,    // Includes only users with role === '2'
        dashboardsCount: 0, // Counts all dashboards across users
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
            const response = await getAllUser(token);
            console.log(response);

            // Calculate total users (all users)
            const totalUsers = response.length;

            // Calculate clients (users with role === '2')
            const clients = response.filter((user) => user.role === '2').length;

            // Calculate dashboard counts
            const dashboardsCount = response.reduce((acc, user) => {
                const dashboardKeys = ['dashboardUrl1', 'dashboardUrl2', 'dashboardUrl3'];
                const dashboardFilled = dashboardKeys.filter(key => user[key]).length;
                return acc + dashboardFilled;
            }, 0);

            // Dispatch actions to set users and stats
            dispatch(setUsers(response));
            dispatch(setStats({ totalUsers, clients, dashboardsCount }));
        } catch (error) {
            console.error('Failed to refresh users:', error);
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
