/** @format */

import { Link, useLocation } from 'react-router-dom';
import LogoImg from '../../assets/LogoImg.png';
import { AiOutlineAppstore } from 'react-icons/ai';
import { PiUsersThree } from 'react-icons/pi';
import { RxBox } from 'react-icons/rx';
import { IoMdLogOut } from 'react-icons/io';
const Sidebar = () => {
	const location = useLocation();
	const isActive = (path) => location.pathname === path;

	return (
		<div className='bg-white text-black h-screen w-64 p-4 drop-shadow-lg'>
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
					<li>
						<Link
							to='/dashboard'
							className={`flex items-center space-x-2 p-3 rounded ${
								isActive('/dashboard')
									? 'bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white'
									: 'hover:bg-gradient-to-r hover:from-[#00449B] hover:to-[#0071D3] hover:text-white'
							}`}
						>
							<AiOutlineAppstore fontSize={22} />
							<span>Dashboard</span>
						</Link>
					</li>

					{/* Users Dashboard */}
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
							<span>Dashboard - 1</span>
						</Link>
					</li>
					<li>
						<Link
							to='/dashboard-2'
							className={`flex items-center space-x-2 p-3 rounded ${
								isActive('/dashboard-2')
									? 'bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white'
									: 'hover:bg-gradient-to-r hover:from-[#00449B] hover:to-[#0071D3] hover:text-white'
							}`}
						>
							<AiOutlineAppstore fontSize={22} />
							<span>Dashboard - 2</span>
						</Link>
					</li>

					{/* User Profiles */}

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

					{/* Super Admin Users List */}

					<li>
						<Link
							to='/users'
							className={`flex items-center space-x-2 p-3 rounded ${
								isActive('/users')
									? 'bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white'
									: 'hover:bg-gradient-to-r hover:from-[#00449B] hover:to-[#0071D3] hover:text-white'
							}`}
						>
							<PiUsersThree fontSize={22} />
							<span>Users</span>
						</Link>
					</li>

					{/* Super Admin Request */}
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

					{/* Users Request Page */}

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

							<span>Logout</span>
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Sidebar;
