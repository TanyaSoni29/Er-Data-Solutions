/** @format */

import JohnImg from '../../assets/JohnImg.png';
import { IoIosArrowDown } from 'react-icons/io';
// import { FaBell } from 'react-icons/fa';
import TopHeaderImg from '../../assets/TopHeaderImg.png';
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

	const headingMap = {
		'/dashboard-role2': 'Dashboard-1',
		'/dashboard-1': 'Dashboard-2',
		'/requests': 'Request',
		'/profiles': 'Profile',
	};

	// Get the heading based on pathname, or a default if not found
	const heading = headingMap[pathname] || 'Page Not Found';

	const handleLogout = () => {
		dispatch(logout(navigate));
		// Redirect to login after logout
	};

	// Toggle dropdown visibility
	const toggleDropdown = () => {
		setDropdownVisible((prev) => !prev);
	};

	return (
		<div className='w-full flex flex-wrap justify-between items-center bg-[#F8F9FD] drop-shadow-lg py-6 px-6 md:px-10'>
			<div className='flex justify-start items-center gap-2'>
				<img src={TopHeaderImg} />
				<h1 className='text-xl font-semibold'>{heading}</h1>
			</div>

			<div className='flex justify-end items-center space-x-2'>
				{/* <FaBell
					fontSize={18}
					color='#000000'
				/> */}
				<img
					src={user?.image} // Replace with your profile image path
					alt='Profile'
					className='w-8 h-8 md:w-10 md:h-10 rounded-full'
				/>
				<span className='text-sm md:text-base font-medium text-gray-600'>
					Hi, {user?.contactPerson}
				</span>
				<IoIosArrowDown
					fontSize={18}
					color='#0071D3'
					onClick={toggleDropdown}
					className={`${dropdownVisible ? '' : '-rotate-90'} cursor-pointer`}
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
