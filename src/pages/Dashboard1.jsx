/** @format */

import DashboardContent from '../components/Dashboard/DashboardContent';
import Header from '../components/Common/Header';
import Sidebar from '../components/Common/Sidebar';

function Dashboard1() {
	return (
		<div className='flex h-screen'>
			<Sidebar />
			<div className='flex-1 flex flex-col'>
				<Header />
				<DashboardContent />
			</div>
		</div>
	);
}

export default Dashboard1;
