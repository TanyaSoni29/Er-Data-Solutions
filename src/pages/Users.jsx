/** @format */

import UsersContent from '../components/Users/UsersContent';
import Header from '../components/Common/Header';
import Sidebar from '../components/Common/Sidebar';

function Users() {
	return (
		<div className='flex h-screen'>
			<Sidebar />
			<div className='flex-1 flex flex-col'>
				<Header />
				<UsersContent />
			</div>
		</div>
	);
}

export default Users;
