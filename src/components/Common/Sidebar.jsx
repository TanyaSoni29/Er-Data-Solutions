/** @format */

import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoImg from '../../assets/LogoImg.png';
import { AiOutlineAppstore } from 'react-icons/ai';
import { PiUsersThree } from 'react-icons/pi';
import { RxBox } from 'react-icons/rx';
import { IoMdLogOut } from 'react-icons/io';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../service/operations/authApi';
const Sidebar = () => {
	const { user } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// console.log(user);
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();
	const isActive = (path) => location.pathname === path;

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};
	return (
		<>
			{/* Hamburger Menu */}
			<div className='md:hidden bg-white p-4 shadow w-full flex justify-between items-center'>
				<div className='flex items-center'>
					<button
						onClick={toggleSidebar}
						className='text-xl focus:outline-none'
						aria-label='Toggle Sidebar'
					>
						<GiHamburgerMenu />
					</button>
				</div>
			</div>

			{/* Sidebar Menu */}
			<div
				className={`bg-white text-black h-screen w-64 p-4 drop-shadow-lg fixed z-50 transform transition-transform ${
					isOpen ? 'translate-x-0' : '-translate-x-full'
				} md:relative md:translate-x-0 md:block`}
			>
				<div className='mb-8 flex justify-start items-center'>
					<img
						src={LogoImg} // Replace with your logo path
						alt='ER Data Solutions'
					/>
					<span className='font-bold w-20'>ER Data Solution</span>
				</div>
				<nav>
					<ul className='space-y-1'>
						{/* Super Admin Dashboard */}
						{user?.role === '1' && (
							<li>
								<Link
									to='/dashboard-role1'
									className={`flex items-center space-x-2 p-3 rounded ${
										isActive('/dashboard-role1')
											? 'bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white'
											: 'hover:bg-gradient-to-r hover:from-[#00449B] hover:to-[#0071D3] hover:text-white'
									}`}
								>
									<AiOutlineAppstore fontSize={22} />
									<span>Dashboard</span>
								</Link>
							</li>
						)}

						{/* Users Dashboard */}
						{user?.role === '2' && (
							<li>
								<Link
									to='/dashboard-role2'
									className={`flex items-center space-x-2 p-3 rounded ${
										isActive('/dashboard-role2')
											? 'bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white'
											: 'hover:bg-gradient-to-r hover:from-[#00449B] hover:to-[#0071D3] hover:text-white'
									}`}
								>
									<AiOutlineAppstore fontSize={22} />
									<span>Dashboard - 1</span>
								</Link>
							</li>
						)}
						{user?.role === '2' && (
							<li>
								<Link
									to='/dashboard-1'
									className={`flex items-center space-x-2 p-3 rounded ${
										isActive('/dashboard-1')
											? 'bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white'
											: 'hover:bg-gradient-to-r hover:from-[#00449B] hover:to-[#0071D3] hover:text-white'
									}`}
								>
									<AiOutlineAppstore fontSize={22} />
									<span>Dashboard - 2</span>
								</Link>
							</li>
						)}

						{/* User Profiles */}

						{user?.role === '2' && (
							<li>
								<Link
									to='/profiles'
									className={`flex items-center space-x-2 p-3 rounded ${
										isActive('/profiles')
											? 'bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white'
											: 'hover:bg-gradient-to-r hover:from-[#00449B] hover:to-[#0071D3] hover:text-white'
									}`}
								>
									<AiOutlineAppstore fontSize={22} />
									<span>Profiles</span>
								</Link>
							</li>
						)}

						{/* Super Admin Users List */}

						{user?.role === '1' && (
							<li>
								<Link
									to='/users'
									className={`flex items-center space-x-2 p-3 rounded ${
										isActive('/users') || isActive('/users/addUser')
											? 'bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white'
											: 'hover:bg-gradient-to-r hover:from-[#00449B] hover:to-[#0071D3] hover:text-white'
									}`}
								>
									<PiUsersThree fontSize={22} />
									<span>Users</span>
								</Link>
							</li>
						)}

						{/* User Request */}
						{user?.role === '2' && (
							<li>
								<Link
									to='/requests'
									className={`flex items-center space-x-2 p-3 rounded ${
										isActive('/requests')
											? 'bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white'
											: 'hover:bg-gradient-to-r hover:from-[#00449B] hover:to-[#0071D3] hover:text-white'
									}`}
								>
									<RxBox fontSize={22} />

									<span>Request</span>
								</Link>
							</li>
						)}

						{/* Super Admin Request Page */}

						{user?.role === '1' && (
							<li>
								<Link
									to='/requestsList'
									className={`flex items-center space-x-2 p-3 rounded ${
										isActive('/requestsList')
											? 'bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white'
											: 'hover:bg-gradient-to-r hover:from-[#00449B] hover:to-[#0071D3] hover:text-white'
									}`}
								>
									<RxBox fontSize={22} />

									<span>Request</span>
								</Link>
							</li>
						)}

						<li>
							<Link
								to='/'
								className={`flex items-center space-x-2 p-3 rounded ${
									isActive('/logout')
										? 'bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white'
										: 'hover:bg-gradient-to-r hover:from-[#00449B] hover:to-[#0071D3] hover:text-white'
								}`}
							>
								<IoMdLogOut
									fontSize={22}
									className=' -rotate-90'
								/>

								<span onClick={() => dispatch(logout(navigate))}>Logout</span>
							</Link>
						</li>
					</ul>
				</nav>
			</div>

			{/* Overlay for smaller screens */}
			{isOpen && (
				<div
					className='fixed inset-0 bg-black opacity-50 z-40 md:hidden'
					onClick={toggleSidebar}
				></div>
			)}
		</>
	);
};

export default Sidebar;
