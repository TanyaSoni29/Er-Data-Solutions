import { IoIosArrowDown } from 'react-icons/io';
import TopHeaderImg from '../../assets/TopHeaderImg.png';
import JohnImg from '../../assets/JohnImg.png'; // Default fallback image
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { logout } from '../../service/operations/authApi';

const HeaderUser = () => {
	const location = useLocation();
	const pathname = location.pathname;
	const { user } = useSelector((state) => state.auth);
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Map for dynamic heading titles based on routes
	const headingMap = {
		'/dashboard-role2': 'Dashboard-1',
		'/dashboard-1': 'Dashboard-2',
		'/dashboard-3': 'Dashboard-3',
		'/requests': 'Requests',
		'/profiles': 'User Profile',
		'/model': 'Modal',
	};

	// Get the heading based on pathname
	const heading = headingMap[pathname] || 'Page Not Found';

	// Construct absolute profile image URL
	const profileImage = user?.image
		? `${import.meta.env.VITE_BASE_URL}/${user.image}` // Prepend base URL to the relative path
		: JohnImg; // Use fallback image if no image is available

		console.log('Profile Image Path:', profileImage);


	const handleLogout = () => {
		dispatch(logout(navigate)); // Perform logout and navigate to login page
	};

	const toggleDropdown = () => {
		setDropdownVisible((prev) => !prev); // Toggle dropdown visibility
	};

	return (
		<div className='w-full flex flex-wrap justify-between items-center bg-[#F8F9FD] drop-shadow-lg py-6 px-6 md:px-10'>
			<div className='flex justify-start items-center gap-2'>
				<img src={TopHeaderImg} alt='Header' />
				<h1 className='text-xl font-semibold'>{heading}</h1>
			</div>

			<div className='flex justify-end items-center space-x-2 relative'>
				<img
					src={profileImage} // Dynamically render profile image
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
			</div>
		</div>
	);
};

export default HeaderUser;
