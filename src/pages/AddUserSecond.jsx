/** @format */

import Header from '../components/Common/Header';
import Sidebar from '../components/Common/Sidebar';
import AddUserSecondStep from '../components/Users/AddUserSecondStep';

function AddUserSecond() {
	return (
		<div className='flex flex-col md:flex-row h-screen'>
			<Sidebar />
			<div className='flex-1 flex flex-col overflow-hidden'>
				<Header />
				<div className='flex-1 overflow-y-auto p-4'>
					<AddUserSecondStep />
				</div>
			</div>
		</div>
	);
}

export default AddUserSecond;
