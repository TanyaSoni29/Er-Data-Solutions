/** @format */

import Dashboard1Content from '../components/Dashboard/Dashboard1Content';
import Sidebar from '../components/Common/Sidebar';
import HeaderUser from '../components/Common/HeaderUser';

function Dashboard1() {
	return (
		<div className='flex flex-col md:flex-row h-screen'>
			<Sidebar />
			<div className='flex-1 flex flex-col overflow-hidden'>
				<HeaderUser />
				<Dashboard1Content />
			</div>
		</div>
	);
}

export default Dashboard1;
