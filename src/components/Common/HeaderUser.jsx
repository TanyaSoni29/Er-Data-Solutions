/** @format */

import JohnImg from '../../assets/JohnImg.png';
import { IoIosArrowDown } from 'react-icons/io';
import { FaBell } from 'react-icons/fa';
import TopHeaderImg from '../../assets/TopHeaderImg.png';
import { useLocation } from 'react-router-dom';
const HeaderUser = () => {
	const location = useLocation();
	const pathname = location.pathname;

	const headingMap = {
		'/dashboard-1': 'Dashboard-1',
		'/dashboard-2': 'Dashboard-2',
		'/requestsList': 'Request',
		'/profile': 'Profile',
	};

	// Get the heading based on pathname, or a default if not found
	const heading = headingMap[pathname] || 'Page Not Found';

	return (
		<div className='flex justify-between items-center bg-white drop-shadow-lg py-6 px-10'>
			<div className='flex justify-start items-center gap-2'>
				<img src={TopHeaderImg} />
				<h1 className='text-xl font-semibold'>{heading}</h1>
			</div>

			<div className='flex justify-end items-center space-x-2'>
				<FaBell
					fontSize={18}
					color='#000000'
				/>
				<img
					src={JohnImg} // Replace with your profile image path
					alt='Profile'
					className='w-10 h-10 rounded-full'
				/>
				<span className='text-sm font-medium text-gray-600'>Jonathan Doe</span>
				<IoIosArrowDown
					fontSize={18}
					color='#0071D3'
				/>
			</div>
		</div>
	);
};

export default HeaderUser;
