import toast from 'react-hot-toast';
import { usernotificationEndpoints } from '../api';
import { apiConnector } from '../apiConnector';

const {
	GET_ALL_NOTIFICATIONS,
    MARK_AS_READ
} = usernotificationEndpoints;


// Get all notifications for a user
export const getAllNotifications = async (token, userId) => {
	try {
		const response = await apiConnector('GET', GET_ALL_NOTIFICATIONS(userId), null, {
			Authorization: `Bearer ${token}`,
		});

		console.log('Get All Notifications API Response:', response);
		if (response.status !== 200) throw new Error('Could not fetch notifications');

		return response.data;
	} catch (error) {
		console.log('Get All Notifications API Error', error);
		const errorMessage = error.response?.data?.error || 'An error occurred';
		toast.error(errorMessage);
	}
};

// Mark a notification as read
export const markNotificationAsRead = async (token, notificationId) => {
	try {
		const response = await apiConnector('PUT', MARK_AS_READ(notificationId), null, {
			Authorization: `Bearer ${token}`,
		});

		console.log('Mark Notification As Read API Response:', response);
		if (response.status !== 200) throw new Error('Could not mark notification as read');

		toast.success('Notification marked as read');
		return response.data;
	} catch (error) {
		console.log('Mark Notification As Read API Error', error);
		const errorMessage = error.response?.data?.error || 'An error occurred';
		toast.error(errorMessage);
	}
};
