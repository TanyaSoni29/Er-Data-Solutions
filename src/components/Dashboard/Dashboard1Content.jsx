/** @format */

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllForms, getFormById } from '../../service/operations/formApi';
// import Logintime from '../../assets/LoginImg.png';

const Dashboard1Content = () => {
	const { user } = useSelector((state) => state.auth); // Get user from Redux
	const [formData, setFormData] = useState(null); // State for form data
	const [isLoading, setIsLoading] = useState(true); // Loading state
	const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
	const BASE_URL = import.meta.env.VITE_BASE_URL; // Backend base URL

	// Fetch the form data when the component mounts
	useEffect(() => {
		const fetchFormData = async () => {
			try {
				const token = user?.token;
				const formsData = await getAllForms(token);
				const formDataId = formsData.reduce((max, curr) => {
					return curr?.id > max?.id ? curr : max;
				}, formsData[0]);
				const formId = formDataId?.id; // Replace with the specific form ID
				const response = await getFormById(token, formId); // Fetch form by ID
				setFormData(response); // Save the fetched data
			} catch (error) {
				console.error('Error fetching form data:', error);
			} finally {
				setIsLoading(false); // Set loading to false after API call
			}
		};

		fetchFormData();
	}, [user]);

	useEffect(() => {
		// Check if the modal has already been shown during this session
		const hasModalShown = localStorage.getItem('hasModalShown');
		if (!hasModalShown) {
			setIsModalOpen(true); // Open the modal for the first time
			localStorage.setItem('hasModalShown', 'true'); // Set the flag in session storage
		}
	}, []);

	// Handle modal close
	const closeModal = () => {
		setIsModalOpen(false);
	};

	// Handle visit URL
	const visitUrl = () => {
		if (formData?.link) {
			window.open(formData.link, '_blank');
		} else {
			console.error('No link available in form data.');
		}
	};

	// Show loader while waiting for API response
	if (isLoading) {
		return (
			<div className='p-6 bg-[#F8F9FD] min-h-screen flex items-center justify-center'>
				<p>Loading...</p>
			</div>
		);
	}

	const image = `${BASE_URL}${
		formData?.imagePath
	}?timestamp=${new Date().getTime()}`;

	return (
		<div className='p-6 bg-[#F8F9FD] min-h-screen'>
			{/* Modal */}
			{isModalOpen && (
				<div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50'>
					<div
						className='bg-white rounded-lg relative shadow-lg'
						style={{
							width: '600px', // Fixed modal width
							height: '500px', // Fixed modal height
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						{/* Close Button */}
						<button
							onClick={closeModal}
							className='absolute top-4 right-4 text-gray-600'
							style={{
								fontSize: '30px', // Larger close icon
								width: '40px',
								height: '40px',
								borderRadius: '50%',
								backgroundColor: '#fff',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								cursor: 'pointer',
							}}
						>
							&times;
						</button>
						{/* Modal Title */}
						<h2 className='text-xl font-semibold text-blue-600 mt-4'>
							Client Notification
						</h2>

						{/* Modal Content */}
						<div
							className='w-full h-full'
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
								padding: '16px',
							}}
						>
							{/* Image */}
							<div
								style={{
									width: '100%',
									height: '60%',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									overflow: 'hidden',
									borderRadius: '8px',
									marginBottom: '16px',
								}}
							>
								<img
									src={image}
									alt='Modal Image'
									style={{
										width: '100%',
										height: '100%',
										objectFit: 'cover', // Ensure image fills the container proportionally
									}}
								/>
							</div>

							{/* Description */}
							<p className='text-gray-800 text-lg mb-6 text-center'>
								{formData?.description || 'Sample description for the form'}
							</p>

							{/* Visit URL Button */}
							<div className='text-center'>
								{formData?.link ? (
									<button
										onClick={visitUrl}
										className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none text-lg font-medium'
									>
										Visit URL
									</button>
								) : (
									<p className='text-gray-500'>No link available</p>
								)}
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Dashboard iframe */}
			{user?.dashboardUrl1 ? (
				<iframe
					src={user.dashboardUrl1} // Power BI link from Redux
					title='Power BI Dashboard'
					width='100%'
					height='640px'
					style={{
						border: 'none',
						borderRadius: '8px',
					}}
				></iframe>
			) : (
				<p>No dashboard URL found</p>
			)}
		</div>
	);
};

export default Dashboard1Content;
