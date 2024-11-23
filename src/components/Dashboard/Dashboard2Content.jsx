/** @format */

import { useSelector } from 'react-redux';

const Dashboard2Content = () => {
	const { user } = useSelector((state) => state.auth);
	return (
		<div className='p-6 bg-[#F8F9FD] min-h-screen'>
			<img src={user?.dashboardUrl2} />
		</div>
	);
};

export default Dashboard2Content;
