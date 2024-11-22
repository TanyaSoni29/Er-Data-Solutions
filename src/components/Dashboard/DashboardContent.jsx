/** @format */

import { FaUserGroup } from 'react-icons/fa6';
import ChartImg from '../../assets/Chart.png';

const DashboardContent = () => {
	return (
		<div className='p-6 bg-white flex-1'>
			{/* Metrics Section */}
			<div className='flex flex-wrap justify-start items-start gap-4 mb-6 p-6'>
				<div className='bg-[#EDF0F3] p-4 rounded shadow w-full sm:w-60 h-36 flex justify-center items-center'>
					<div className='flex items-center justify-center space-x-4'>
						<span className='rounded w-8 h-8 p-2 bg-blue-600'>
							<FaUserGroup color='white' />
						</span>

						<div className='flex justify-center items-center space-x-4'>
							<h2 className='text-gray-600 font-medium'>Total Users</h2>
							<p className='text-2xl font-bold'>10</p>
						</div>
					</div>
				</div>
				<div className='bg-[#EDF0F3] p-4 rounded shadow w-full sm:w-60 h-36 flex justify-center items-center'>
					<div className='flex items-center space-x-4'>
						<span className='rounded w-8 h-8 p-2 bg-blue-600'>
							<FaUserGroup color='white' />
						</span>
						<div className='flex justify-center items-center space-x-4'>
							<h2 className='text-gray-600 font-medium'>Client</h2>
							<p className='text-2xl font-bold'>05</p>
						</div>
					</div>
				</div>
				<div className='bg-[#EDF0F3] p-4 rounded shadow w-full sm:w-60 h-36 flex justify-center items-center'>
					<div className='flex items-center space-x-4'>
						<span className='rounded w-8 h-8 p-2 bg-blue-600'>
							<FaUserGroup color='white' />
						</span>
						<div className='flex justify-center items-center space-x-4'>
							<h2 className='text-gray-600 font-medium'>Dashboard</h2>
							<p className='text-2xl font-bold'>04</p>
						</div>
					</div>
				</div>
				<div className='bg-[#EDF0F3] p-4 rounded shadow w-full h-auto sm:w-[39rem] sm:h-[20.2rem] flex flex-col justify-center items-center'>
					<h2 className='text-gray-600 flex w-full justify-start items-start font-medium p-2 border-l-4 border-blue-700'>
						Recent Status
					</h2>
					<div className='mt-4 w-full'>
						{/* Replace with your chart component */}
						<img
							src={ChartImg}
							alt='Chart'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardContent;
