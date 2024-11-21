/** @format */

import Dashboard1Content from '../components/Dashboard/Dashboard1Content';
import Header from '../components/Common/Header';
import Sidebar from '../components/Common/Sidebar';

function Dashboard1() {
	return (
		<div className='flex h-screen'>
			<Sidebar />
			<div className='flex-1 flex flex-col'>
				<Header />
				<Dashboard1Content />
			</div>
		</div>
	);
}

export default Dashboard1;
