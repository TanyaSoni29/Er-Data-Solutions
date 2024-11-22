/** @format */

import DashboardContent from '../components/Dashboard/DashboardContent';
import Header from '../components/Common/Header';
import Sidebar from '../components/Common/Sidebar';

function Dashboard() {
	return (
		<div className='flex flex-col md:flex-row h-screen'>
			<Sidebar />
			<div className='flex-1 flex flex-col overflow-hidden'>
				<Header />
				<div className='flex-1 overflow-y-auto p-4 bg-gray-100'>
					<DashboardContent />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
