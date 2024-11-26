import { useSelector } from 'react-redux';

const Dashboard1Content = () => {
	const { user } = useSelector((state) => state.auth);

	// Log the user data to ensure the link is coming from Redux
	console.log('User data from Redux:', user);

	return (
		<div className='p-6 bg-[#F8F9FD] min-h-screen'>
			{user?.dashboardUrl1 ? (
				<iframe
					src={user.dashboardUrl1} // Power BI link from Redux
					title="Power BI Dashboard"
					width="100%"
					height="640px" // Adjust as needed
					style={{
						border: 'none',
						borderRadius: '8px', // Optional styling for rounded corners
					}}
				></iframe>
			) : (
				<p>No dashboard URL found</p> // Fallback in case the link is missing
			)}
		</div>
	);
};

export default Dashboard1Content;
