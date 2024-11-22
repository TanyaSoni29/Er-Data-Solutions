/** @format */

import { useSelector } from 'react-redux';

const Dashboard1Content = () => {
	const { user } = useSelector((state) => state.auth);
	return (
		<div className='p-6 bg-[#F8F9FD] min-h-screen'>
			<img src={user?.dashboardUrl1} />
		</div>
	);
};

export default Dashboard1Content;
