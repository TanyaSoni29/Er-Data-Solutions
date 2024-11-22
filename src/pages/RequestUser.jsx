/** @format */

import Header from '../components/Common/Header';
import Sidebar from '../components/Common/Sidebar';
import RequestUserContent from '../components/Request/RequestUserContent';

function RequestUser() {
	return (
		<div className='flex h-screen'>
			<Sidebar />
			<div className='flex-1 flex flex-col'>
				<Header />
				<RequestUserContent />
			</div>
		</div>
	);
}

export default RequestUser;
