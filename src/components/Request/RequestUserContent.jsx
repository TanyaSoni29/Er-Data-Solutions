/** @format */

import HideSourceIcon from '@mui/icons-material/HideSource';
import { FiEdit } from 'react-icons/fi';
import { FaRegCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { refreshRequest } from '../../slices/requestSlice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation to edit page

const RequestUserContent = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate(); // Initialize navigation
	const { requests } = useSelector((state) => state.request);
	const { token } = useSelector((state) => state.auth);

	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState('');
	const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
	const [showHidden, setShowHidden] = useState(false); // New state to toggle hidden requests
	const [hiddenRequests, setHiddenRequests] = useState([]);

	const requestPerPage = 5; // Adjusted pagination to show 5 requests per page

	useEffect(() => {
		dispatch(refreshRequest());

		// Retrieve the hidden state from localStorage on page load
		const savedHiddenRequests =
			JSON.parse(localStorage.getItem('hiddenRequests')) || [];
		const savedShowHidden =
			JSON.parse(localStorage.getItem('showHidden')) || false;

		setHiddenRequests(savedHiddenRequests);
		setShowHidden(savedShowHidden);
	}, [dispatch]);

	useEffect(() => {
		// Save the hidden state to localStorage whenever it changes
		localStorage.setItem('hiddenRequests', JSON.stringify(hiddenRequests));
		localStorage.setItem('showHidden', JSON.stringify(showHidden));
	}, [hiddenRequests, showHidden]);

	const handleHide = (id) => {
		// Toggle the hidden state for the request
		setHiddenRequests((prevHiddenRequests) => {
			if (prevHiddenRequests.includes(id)) {
				return prevHiddenRequests.filter((requestId) => requestId !== id); // Remove from hidden
			} else {
				return [...prevHiddenRequests, id]; // Add to hidden
			}
		});
	};

	const handleEdit = (id) => {
		// Navigate to the edit page with the request ID as a query parameter
		navigate(`/reqeditlist?id=${id}`);
	};

	// Search logic
	const filteredRequests = requests.filter(
		(request) =>
			[
				request.requestorName,
				request.communicationMethod,
				request.description,
				request.completionStatus,
			]
				.map((field) => field?.toLowerCase() || '')
				.some((field) => field.includes(searchQuery.toLowerCase())) &&
			(!hiddenRequests.includes(request.id) || showHidden) // Show hidden if showHidden is true
	);

	// Sorting logic
	const sortedRequests = [...filteredRequests].sort((a, b) => {
		if (!sortConfig.key) return 0;

		const fieldA = a[sortConfig.key] || '';
		const fieldB = b[sortConfig.key] || '';

		if (sortConfig.direction === 'asc') {
			return fieldA > fieldB ? 1 : -1;
		}
		return fieldA < fieldB ? 1 : -1;
	});

	const totalPages = Math.ceil(sortedRequests.length / requestPerPage);
	const indexOfLastRequest = currentPage * requestPerPage;
	const indexOfFirstRequest = indexOfLastRequest - requestPerPage;
	const currentRequests = sortedRequests.slice(
		indexOfFirstRequest,
		indexOfLastRequest
	);

	const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

	const handleSort = (key) => {
		setSortConfig((prev) => ({
			key,
			direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
		}));
	};

	const toggleShowHidden = () => {
		setShowHidden((prev) => !prev); // Toggle visibility of hidden requests
	};

	return (
		<div className='p-4 md:p-6 bg-white min-h-screen'>
			{/* Header */}
			<div className='flex flex-wrap justify-between items-center mb-6 px-4'>
				<div className='text-xl md:text-2xl font-semibold text-gray-700 flex justify-start items-center space-x-2'>
					<FaRegCircle fontSize={18} />
					<span>Request List</span>
				</div>
				<div className='flex space-x-4 items-center'>
					<input
						type='text'
						placeholder='Search by Requestor Name, Method, Description, or Status'
						className='w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<button
						onClick={toggleShowHidden}
						className='bg-blue-500 text-white px-4 py-2 rounded-md'
					>
						{showHidden ? 'Hide Hidden' : 'Show Hidden'}
					</button>
				</div>
			</div>

			{/* Table */}
			<div className='bg-[#F7F7F7] rounded-lg shadow overflow-x-auto'>
				<table className='w-full border-collapse'>
					<thead>
						<tr className='text-left text-gray-600 uppercase text-xs md:text-sm'>
							{[
								{ label: 'Sr. No', key: null },
								{ label: 'Date', key: 'requestDate' },
								{ label: 'Company', key: 'companyName' },
								{ label: 'Requestor', key: 'requestorName' },
								{ label: 'priority', key: 'priority' },
								{ label: 'Description', key: 'description' },
								{ label: 'Status', key: 'completionStatus' },
								{ label: 'Action', key: null },
							].map(({ label, key }, index) => (
								<th
									key={index}
									className={`py-3 px-2 md:px-4 ${key ? 'cursor-pointer' : ''}`}
									onClick={() => key && handleSort(key)}
								>
									{label}{' '}
									{key && sortConfig.key === key && (
										<span>{sortConfig.direction === 'asc' ? '🔼' : '🔽'}</span>
									)}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{currentRequests.map((request, index) => (
							<tr
								key={request.id}
								className='border-b hover:bg-gray-50 text-xs md:text-sm'
							>
								<td className='py-3 px-2 md:px-4'>
									{indexOfFirstRequest + index + 1}
								</td>
								<td className='py-3 px-2 md:px-4'>
									{request?.requestDate
										? request?.requestDate.split('T')[0]
										: '-'}
								</td>
								<td className='py-3 px-2 md:px-4'>
									{request?.companyName ? request?.companyName : '-'}
								</td>
								<td className='py-3 px-2 md:px-4'>
									{request?.requestorName ? request?.requestorName : '-'}
								</td>
								<td className='py-3 px-2 md:px-4'>
									{request?.priority
										? request?.priority
										: '-'}
								</td>
								<td className='py-3 px-2 md:px-4'>
									{request?.description ? request?.description : '-'}
								</td>
								<td className='py-3 px-2 md:px-4'>
									<span
										className={`px-3 py-1 rounded-full text-white text-xs md:text-sm ${
											request?.completionStatus === 'In Progress'
												? 'bg-yellow-500'
												: request?.completionStatus === 'Completed'
												? 'bg-green-500'
												: 'bg-blue-500'
										}`}
									>
										{request?.completionStatus || 'Pending'}
									</span>
								</td>
								<td className='py-3 px-2 md:px-4'>
									<div className='flex space-x-2'>
										<button
											className='bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700'
											onClick={() => handleEdit(request?.id)}
										>
											<FiEdit />
										</button>
										<button
											className='bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-700'
											onClick={() => handleHide(request?.id)}
										>
											<HideSourceIcon fontSize='small' />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				{/* Pagination */}
				<div className='flex flex-wrap justify-between items-center p-4 text-gray-600 text-sm'>
					<span>
						Showing {indexOfFirstRequest + 1} to{' '}
						{Math.min(indexOfLastRequest, sortedRequests.length)} of{' '}
						{sortedRequests.length}
					</span>
					<div className='flex space-x-2'>
						{Array.from({ length: totalPages }, (_, index) => (
							<button
								key={index + 1}
								className={`px-3 py-1 ${
									currentPage === index + 1
										? 'bg-blue-500 text-white'
										: 'bg-gray-200 hover:bg-gray-300'
								} rounded`}
								onClick={() => handlePageChange(index + 1)}
							>
								{index + 1}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RequestUserContent;
