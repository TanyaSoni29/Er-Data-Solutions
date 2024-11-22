/** @format */

import DashboardContent from '../components/Dashboard/DashboardContent';
import Header from '../components/Common/Header';
import Sidebar from '../components/Common/Sidebar';
import AddNewUser from "../components/Users/AddNewUser"

function Dashboard() {
	return (
		<div className='flex flex-col md:flex-row h-screen'>
			<Sidebar />
			<div className='flex-1 flex flex-col overflow-hidden'>
				<Header />
				<div className='flex-1 overflow-y-auto p-4'>
					<AddNewUser />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
