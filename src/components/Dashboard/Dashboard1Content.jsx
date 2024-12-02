/** @format */

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllForms, getFormById } from '../../service/operations/formApi';

const Dashboard1Content = () => {
	// const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth); // Get user from Redux
	const [formData, setFormData] = useState(null); // State for form data
	const [isLoading, setIsLoading] = useState(true); // Loading state
	const [isModalOpen, setIsModalOpen] = useState(true); // Modal open state
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
				console.log('Fetched Form Data:', response); // Debug
				setFormData(response); // Save the fetched data
			} catch (error) {
				console.error('Error fetching form data:', error);
			} finally {
				setIsLoading(false); // Set loading to false after API call
			}
		};

		fetchFormData();
	}, [user]);

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
			{isModalOpen && formData && (
				<div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50'>
					<div className='bg-white p-6 rounded-lg w-[80%] md:w-[60%] relative'>
						{/* Close Button */}
						<button
							onClick={closeModal}
							className='absolute top-2 right-2 text-gray-600 text-xl'
						>
							&times;
						</button>

						{/* Modal Content */}
						<div className='text-center'>
							{/* Debugging: Log Full Image URL */}
							<p className='text-sm text-gray-500'>
								Debug Full Image URL: {`${BASE_URL}${formData?.imagePath}`}
							</p>

							{/* Image */}
							{formData?.imagePath ? (
								<img
									src={image} // Cache-busting query parameter
									alt='Modal Image'
									className='w-64 h-64 object-cover rounded-lg mb-4'
								/>
							) : (
								<p className='text-gray-500'>No image available</p>
							)}

							{/* Description */}
							<p className='text-gray-800 text-lg mb-6'>
								{formData.description || 'No description available'}
							</p>

							{/* Visit URL Button */}
							{formData.link ? (
								<button
									onClick={visitUrl}
									className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none'
								>
									Visit URL
								</button>
							) : (
								<p className='text-gray-500'>No link available</p>
							)}
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
