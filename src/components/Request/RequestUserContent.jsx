import { RiDeleteBinLine } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { FaRegCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { refreshRequest, removeRequest } from '../../slices/requestSlice';
import { useEffect, useState } from 'react';
import { deleteRequestById } from '../../service/operations/requestApi';
import { useNavigate } from 'react-router-dom'; // For navigation to edit page

const RequestUserContent = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate(); // Initialize navigation
	const { requests } = useSelector((state) => state.request);
	const { token } = useSelector((state) => state.auth);

	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState('');
	const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
	const requestPerPage = 10;

	useEffect(() => {
		dispatch(refreshRequest());
	}, [dispatch]);

	const handleDelete = async (id) => {
		try {
			const response = await deleteRequestById(token, id);
			if (response) {
				dispatch(removeRequest(id));
				dispatch(refreshRequest());
			}
		} catch (error) {
			console.error('Failed to delete request:', error);
		}
	};

	const handleEdit = (id) => {
		// Navigate to the edit page with the request ID as a query parameter
		navigate(`/reqeditlist?id=${id}`);
	};

	// Search logic
	const filteredRequests = requests.filter((request) =>
		[request.requestorName, request.communicationMethod, request.description, request.priority]
			.map((field) => field?.toLowerCase() || '')
			.some((field) => field.includes(searchQuery.toLowerCase()))
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

	return (
		<div className="p-4 md:p-6 bg-white min-h-screen">
			{/* Header */}
			<div className="flex flex-wrap justify-between items-center mb-6 px-4">
				<div className="text-xl md:text-2xl font-semibold text-gray-700 flex justify-start items-center space-x-2">
					<FaRegCircle fontSize={18} />
					<span>Request List</span>
				</div>
				<input
					type="text"
					placeholder="Search by Requestor Name, Method, Description, or Status"
					className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>

			{/* Table */}
			<div className="bg-[#F7F7F7] rounded-lg shadow overflow-x-auto">
				<table className="w-full border-collapse">
					<thead>
						<tr className="text-left text-gray-600 uppercase text-xs md:text-sm">
							{['Sr. No', 'Date', 'Requestor Name', 'Method', 'Description', 'Status', 'Action'].map((header, index) => (
								<th
									key={index}
									className="py-3 px-2 md:px-4 cursor-pointer"
									onClick={() => handleSort(header.replace(' ', '').toLowerCase())}
								>
									{header} {sortConfig.key === header.replace(' ', '').toLowerCase() && (sortConfig.direction === 'asc' ? '🔼' : '🔽')}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{currentRequests.map((request, index) => (
							<tr
								key={request.id}
								className="border-b hover:bg-gray-50 text-xs md:text-sm"
							>
								<td className="py-3 px-2 md:px-4">
									{indexOfFirstRequest + index + 1}
								</td>
								<td className="py-3 px-2 md:px-4">
									{request?.requestDate
										? request?.requestDate.split('T')[0]
										: '-'}
								</td>
								<td className="py-3 px-2 md:px-4">
									{request?.requestorName ? request?.requestorName : '-'}
								</td>
								<td className="py-3 px-2 md:px-4">
									{request?.communicationMethod ? request?.communicationMethod : '-'}
								</td>
								<td className="py-3 px-2 md:px-4">
									{request?.description ? request?.description : '-'}
								</td>
								<td className="py-3 px-2 md:px-4">
									<span
										className={`px-3 py-1 rounded-full text-white text-xs md:text-sm ${
											request?.priority === 'Pending'
												? 'bg-yellow-500'
												: request?.priority === 'Completed'
												? 'bg-green-500'
												: 'bg-blue-500'
										}`}
									>
										{request?.priority || 'Pending'}
									</span>
								</td>
								<td className="py-3 px-2 md:px-4">
									<div className="flex space-x-2">
										<button
											className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700"
											onClick={() => handleEdit(request?.id)}
										>
											<FiEdit />
										</button>
										<button
											className="bg-red-500 text-white p-2 rounded-full hover:bg-red-700"
											onClick={() => handleDelete(request?.id)}
										>
											<RiDeleteBinLine />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{/* Pagination */}
				<div className="flex flex-wrap justify-between items-center p-4 text-gray-600 text-sm">
					<span>
						Showing {indexOfFirstRequest + 1} to{' '}
						{Math.min(indexOfLastRequest, sortedRequests.length)} of {sortedRequests.length}
					</span>
					<div className="flex space-x-2">
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
