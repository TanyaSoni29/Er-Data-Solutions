/** @format */

import RequestContent from '../components/Request/RequestContent';
import Sidebar from '../components/Common/Sidebar';
import HeaderUser from '../components/Common/HeaderUser';

function Request() {
	return (
		<div className='flex flex-col md:flex-row h-screen'>
			<Sidebar />
			<div className='flex-1 flex flex-col overflow-hidden'>
				<HeaderUser />
				<div className='flex-1 overflow-y-auto p-4'>
					<RequestContent />
				</div>
			</div>
		</div>
	);
}

export default Request;
