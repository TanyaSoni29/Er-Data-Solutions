/** @format */

import ProfileImg from '../../assets/ProfileImg.png';
import { IoIosArrowDown } from 'react-icons/io';
import { CgBox } from 'react-icons/cg';
const Header = () => {
	return (
		<div className='flex justify-between items-center bg-white drop-shadow-lg py-6 px-10'>
			{/* <h1 className='text-xl font-semibold'>Dashboard</h1> */}
			<CgBox className='-rotate-90' />
			<div className='flex justify-end items-center space-x-2'>
				<img
					src={ProfileImg} // Replace with your profile image path
					alt='Profile'
					className='w-10 h-10 rounded-full'
				/>
				<span className='text-sm font-medium text-gray-600'>
					Hi, Super Admin
				</span>
				<IoIosArrowDown
					fontSize={18}
					color='#0071D3'
				/>
			</div>
		</div>
	);
};

export default Header;
