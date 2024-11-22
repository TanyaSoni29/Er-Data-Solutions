/** @format */

import HeaderUser from '../components/Common/HeaderUser';
import Sidebar from '../components/Common/Sidebar';
import RequestUserContent from '../components/Request/RequestUserContent';

function RequestUser() {
	return (
		<div className='flex h-screen'>
			<Sidebar />
			<div className='flex-1 flex flex-col'>
				<HeaderUser />
				<RequestUserContent />
			</div>
		</div>
	);
}

export default RequestUser;
