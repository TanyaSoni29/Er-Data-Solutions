/** @format */

import HeaderUser from '../components/Common/HeaderUser';
import Sidebar from '../components/Common/Sidebar';
import ModelFile from '../components/modelfile/modelfile';

function Profiles() {
	return (
		<div className='flex flex-col md:flex-row h-screen'>
			<Sidebar />
			<div className='flex-1 flex flex-col overflow-hidden'>
				<HeaderUser />
				<div className='flex-1 overflow-y-auto p-4 bg-gray-100'>
					<ModelFile />
				</div>
			</div>
		</div>
	);
}

export default Profiles;
