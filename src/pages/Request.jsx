/** @format */

import RequestContent from '../components/Request/RequestContent';
import Header from '../components/Common/Header';
import Sidebar from '../components/Common/Sidebar';

function Request() {
	return (
		<div className='flex h-screen'>
			<Sidebar />
			<div className='flex-1 flex flex-col'>
				<Header />
				<RequestContent />
			</div>
		</div>
	);
}

export default Request;
