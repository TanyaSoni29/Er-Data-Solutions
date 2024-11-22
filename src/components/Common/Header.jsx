/** @format */

import ProfileImg from '../../assets/ProfileImg.png';
import { IoIosArrowDown } from 'react-icons/io';
import { CgBox } from 'react-icons/cg';
const Header = () => {
	return (
		<div className='w-full flex flex-wrap justify-between items-center bg-white drop-shadow-lg py-6 px-6 md:px-10'>
			{/* <h1 className='text-xl font-semibold'>Dashboard</h1> */}
			<CgBox className='-rotate-90' />
			<div className='flex justify-end items-center space-x-2'>
				<img
					src={ProfileImg} // Replace with your profile image path
					alt='Profile'
					className='w-8 h-8 md:w-10 md:h-10 rounded-full'
				/>
				<span className='text-sm md:text-base font-medium text-gray-600'>
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
