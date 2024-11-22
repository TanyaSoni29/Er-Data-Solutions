/** @format */

import { FaUserGroup } from 'react-icons/fa6';
import ChartImg from '../../assets/Chart.png';

const DashboardContent = () => {
	return (
		<div className="p-6 bg-gray-100 flex-1 min-h-screen">
			{/* Metrics Section */}
			<div className="flex flex-wrap justify-start items-start gap-6 mb-6">
				{/* Total Users Card */}
				<div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow w-full sm:w-60 h-36 flex justify-center items-center">
					<div className="flex items-center space-x-4">
						<span className="rounded-full w-10 h-10 p-2 bg-blue-600 flex justify-center items-center">
							<FaUserGroup color="white" />
						</span>
						<div className="flex flex-col">
							<h2 className="text-gray-700 font-medium">Total Users</h2>
							<p className="text-3xl font-bold text-gray-900">10</p>
						</div>
					</div>
				</div>
				
				{/* Client Card */}
				<div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow w-full sm:w-60 h-36 flex justify-center items-center">
					<div className="flex items-center space-x-4">
						<span className="rounded-full w-10 h-10 p-2 bg-green-500 flex justify-center items-center">
							<FaUserGroup color="white" />
						</span>
						<div className="flex flex-col">
							<h2 className="text-gray-700 font-medium">Client</h2>
							<p className="text-3xl font-bold text-gray-900">05</p>
						</div>
					</div>
				</div>

				{/* Dashboard Card */}
				<div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow w-full sm:w-60 h-36 flex justify-center items-center">
					<div className="flex items-center space-x-4">
						<span className="rounded-full w-10 h-10 p-2 bg-yellow-500 flex justify-center items-center">
							<FaUserGroup color="white" />
						</span>
						<div className="flex flex-col">
							<h2 className="text-gray-700 font-medium">Dashboard</h2>
							<p className="text-3xl font-bold text-gray-900">04</p>
						</div>
					</div>
				</div>

				{/* Recent Status Section */}
				<div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow w-full sm:w-[39rem] sm:h-[20.2rem] flex flex-col justify-start items-center">
					<h2 className="text-gray-700 font-medium text-lg w-full text-left mb-4 border-l-4 pl-2 border-blue-700">
						Recent Status
					</h2>
					<div className="w-full flex justify-center items-center">
						<img
							src={ChartImg}
							alt="Chart"
							className="w-full h-auto rounded-md shadow-sm"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardContent;
