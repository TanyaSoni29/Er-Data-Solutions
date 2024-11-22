/** @format */

import HeaderUser from '../components/Common/HeaderUser';
import Sidebar from '../components/Common/Sidebar';
import ProfilesContent from '../components/Profiles/ProfilesContent';

function Profiles() {
	return (
		<div className='flex flex-col md:flex-row h-screen'>
			<Sidebar />
			<div className='flex-1 flex flex-col overflow-hidden'>
				<HeaderUser />
				<div className='flex-1 overflow-y-auto p-4 bg-gray-100'>
					<ProfilesContent />
				</div>
			</div>
		</div>
	);
}

export default Profiles;
