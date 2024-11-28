/** @format */

import Dashboard3Content from '../components/Dashboard/Dashboard3Content';
import Sidebar from '../components/Common/Sidebar';
import HeaderUser from '../components/Common/HeaderUser';

function Dashboard2() {
	return (
		<div className='flex flex-col md:flex-row h-screen'>
			<Sidebar />
			<div className='flex-1 flex flex-col overflow-hidden'>
				<HeaderUser />
				<Dashboard3Content />
			</div>
		</div>
	);
}

export default Dashboard2;
