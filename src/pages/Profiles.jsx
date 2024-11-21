/** @format */

import Header from '../components/Common/Header';
import Sidebar from '../components/Common/Sidebar';
import ProfilesContent from '../components/Profiles/ProfilesContent';

function Profiles() {
	return (
		<div className='flex h-screen'>
			<Sidebar />
			<div className='flex-1 flex flex-col'>
				<Header />
				<ProfilesContent />
			</div>
		</div>
	);
}

export default Profiles;
