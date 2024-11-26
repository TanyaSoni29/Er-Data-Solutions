/** @format */

import { useSelector } from 'react-redux';

const Dashboard2Content = () => {
	const { user } = useSelector((state) => state.auth);

	// Log the user data to ensure the link is coming from Redux
	console.log('User data from Redux:', user);

	return (
		<div className='p-6 bg-[#F8F9FD] min-h-screen'>
			{user?.dashboardUrl2 ? (
				<iframe
					src={user.dashboardUrl2} // Power BI or other dashboard link from Redux
					title="Power BI Dashboard 2"
					width="100%"
					height="640px" // Adjust height as necessary
					style={{
						border: 'none',
						borderRadius: '8px', // Optional rounded corners for better visuals
					}}
				></iframe>
			) : (
				<p>No dashboard URL found</p> // Fallback in case the link is missing
			)}
		</div>
	);
};

export default Dashboard2Content;
