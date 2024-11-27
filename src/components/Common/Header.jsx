/** @format */

// import ProfileImg from '../../assets/ProfileImg.png';
import { IoIosArrowDown } from 'react-icons/io';
import { CgBox } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { logout } from '../../service/operations/authApi';
import ProfileImg from '../../assets/ProfileImg.png';
const Header = () => {
	const location = useLocation();
	const pathname = location.pathname;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [dropDownVissible, setDropDownVissible] = useState(false);

	const headingMap = {
		'/dashboard-role1': 'Dashboard',
		'/users': 'Users',
		'/users/addUser': 'Users',
		'/requestsList': 'Requests',
		'/reqeditlist': 'Edit Requests',
		'/historylist': 'History Request List',
		'/historylistedit': 'Edit Request',

	};
	const heading = headingMap[pathname] || 'Page Not Found';
	const { user } = useSelector((state) => state.auth);

	return (
		<div className='w-full flex flex-wrap justify-between items-center bg-white drop-shadow-lg py-6 px-6 md:px-10'>
			<div className='flex justify-start items-center gap-2'>
				<CgBox className='-rotate-90' />
				<h1 className='text-xl font-semibold'>{heading}</h1>
			</div>
			<div className='flex justify-end items-center space-x-2'>
				<img
					// src={user?.image} // Replace with your profile image path
					src={ProfileImg}
					alt='Profile'
					className='w-8 h-8 md:w-10 md:h-10 rounded-full'
				/>
				<span className='text-sm md:text-base font-medium text-gray-600'>
					Hi, {user?.contactPerson}
				</span>
				<IoIosArrowDown
					fontSize={18}
					color='#0071D3'
					onClick={() => setDropDownVissible((prev) => !prev)}
					className={`${dropDownVissible ? '' : '-rotate-90'} cursor-pointer`}
				/>

				{dropDownVissible && (
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
								onClick={() => dispatch(logout(navigate))}
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

export default Header;
