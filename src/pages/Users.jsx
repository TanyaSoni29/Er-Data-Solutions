/** @format */

import UsersContent from '../components/Users/UsersContent';
import Header from '../components/Common/Header';
import Sidebar from '../components/Common/Sidebar';

function Users() {
	return (
		<div className='flex flex-col md:flex-row h-screen'>
			<Sidebar />
			<div className='flex-1 flex flex-col overflow-hidden'>
				<Header />
				<div className='flex-1 overflow-y-auto p-4'>
					<UsersContent />
				</div>
			</div>
		</div>
	);
}

export default Users;
