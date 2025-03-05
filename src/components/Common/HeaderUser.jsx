/** @format */

import { IoIosArrowDown, IoIosNotifications } from 'react-icons/io'; // Added IoIosNotifications
import TopHeaderImg from '../../assets/TopHeaderImg.png';
import JohnImg from '../../assets/user.webp'; // Default fallback image
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { logout } from '../../service/operations/authApi';

const HeaderUser = () => {
	const location = useLocation();
	const pathname = location.pathname;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const [notifications, setNotifications] = useState([]); // Store notifications
	const [showDropdown, setShowDropdown] = useState(false); // Dropdown state

	// Map for dynamic heading titles based on routes
	const headingMap = {
		'/dashboard-role2': 'Dashboard-1',
		'/dashboard-1': 'Dashboard-2',
		'/dashboard-3': 'Dashboard-3',
		'/requests': 'Requests',
		'/profiles': 'User Profile',
		'/modal': 'Modal',
		'/requestform': 'Requests',
	};

	const heading = headingMap[pathname] || 'Page Not Found';
	const { user } = useSelector((state) => state.auth);

	// State for profile image to dynamically update it
	const [profileImage, setProfileImage] = useState(JohnImg); // Default image fallback

	useEffect(() => {
		if (user?.image) {
			const imageUrl = `${import.meta.env.VITE_BASE_URL}/${user.image}`;
			console.log('Profile Image URL:', imageUrl);
			setProfileImage(imageUrl); // Update profile image if available from user data
		} else {
			setProfileImage(JohnImg); // Fallback image if no user image available
		}
	}, [user]); // This will run whenever `user` data changes

	// Fetch notifications from API
	useEffect(() => {
		const fetchNotifications = async () => {
			try {
				const response = await fetch(`${import.meta.env.VITE_BASE_URL}/notifications`);
				const data = await response.json();
				setNotifications(data.notifications || []);
			} catch (error) {
				console.error('Error fetching notifications:', error);
			}
		};
		fetchNotifications();
	}, []); // Run only on mount

	const handleLogout = () => {
		dispatch(logout(navigate)); // Perform logout and navigate to login page
	};

	const toggleDropdown = () => {
		setDropdownVisible((prev) => !prev); // Toggle dropdown visibility
	};

	return (
		<div className='w-full flex flex-wrap justify-between items-center bg-[#F8F9FD] drop-shadow-lg py-6 px-6 md:px-10'>
			<div className='flex justify-start items-center gap-2'>
				<img
					src={TopHeaderImg}
					alt='Header'
				/>
				<h1 className='text-xl font-semibold'>{heading}</h1>
			</div>

			<div className='flex justify-end items-center space-x-4 relative'>
				{/* Notification Icon - Visible only for role '2' */}
				{user?.role === '2' && (
					<div className='relative cursor-pointer' onClick={() => setShowDropdown(!showDropdown)}>
					<IoIosNotifications fontSize={30} color='#0071D3' />
					{/* Notification Count */}
					{notifications.length > 0 && (
						<span className='absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2'>
							{notifications.length}
						</span>
					)}
				</div>
				)}
				<img
					src={profileImage} // Dynamically render profile image or fallback
					alt='Profile'
					className='w-8 h-8 md:w-10 md:h-10 rounded-full object-cover'
				/>
				<span className='text-sm md:text-base font-medium text-gray-600'>
					Hi, {user?.contactPerson || 'User'}
				</span>
				<IoIosArrowDown
					fontSize={18}
					color='#0071D3'
					onClick={toggleDropdown}
					className={`cursor-pointer ${dropdownVisible ? '' : '-rotate-90'}`}
				/>

				{/* Dropdown Menu */}
				{dropdownVisible && (
					<div className='absolute right-0 top-14 bg-white border border-gray-300 rounded-lg shadow-lg w-36 z-10'>
						<ul className='py-2'>
							<li
								className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
								onClick={() => navigate('/profiles')}
							>
								Profile
							</li>
							<li
								className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
								onClick={handleLogout}
							>
								Logout
							</li>
						</ul>
					</div>
				)}

				{/* Notification Dropdown */}
				{showDropdown && (
					<div className='absolute right-52 top-14 bg-white border border-gray-300 rounded-lg shadow-lg w-64 z-10'>
						<h3 className='text-center font-semibold py-2 border-b'>Notifications</h3>
						<ul className='max-h-60 overflow-auto'>
							{notifications.length > 0 ? (
								notifications.map((notif, index) => (
									<li key={index} className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
										{notif.message}
									</li>
								))
							) : (
								<li className='px-4 py-2 text-gray-500 text-center'>No notifications</li>
							)}
						</ul>
						<button
							className='w-full text-center bg-gray-100 hover:bg-gray-200 py-2'
							onClick={() => setNotifications([])} // Clear notifications
						>
							Clear All
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default HeaderUser;