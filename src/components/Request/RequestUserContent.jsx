/** @format */

import { RiDeleteBinLine } from 'react-icons/ri';
import { FaRegCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { refreshRequest, removeRequest } from '../../slices/requestSlice';
import { useEffect, useState } from 'react';
import { deleteRequestById } from '../../service/operations/requestApi';
const RequestUserContent = () => {
	const dispatch = useDispatch();
	const { requests } = useSelector((state) => state.request);
	const { token } = useSelector((state) => state.auth);

	const [currentPage, setCurrentPage] = useState(1);
	const requestPerPage = 10;

	useEffect(() => {
		dispatch(refreshRequest());
	}, [dispatch]);

	const handleDelete = async (id) => {
		try {
			const response = await deleteRequestById(token, id);
			console.log(response);
			if (response) {
				dispatch(removeRequest(id));
				dispatch(refreshRequest());
			}
		} catch (error) {
			console.error('Failed to delete request:', error);
		}
	};

	const totalPages = Math.ceil(requests / requestPerPage);
	const indexOfLastRequest = currentPage * requestPerPage;
	const indexOfFirstRequest = indexOfLastRequest - requestPerPage;
	const currentRequests = requests.slice(
		indexOfFirstRequest,
		indexOfLastRequest
	);

	const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div className='p-4 md:p-6 bg-white min-h-screen'>
			{/* Header */}
			<div className='flex flex-wrap justify-between items-center mb-6 px-4'>
				<div className='text-xl md:text-2xl font-semibold text-gray-700 flex justify-start items-center space-x-2'>
					<FaRegCircle fontSize={18} />
					<span>Request List</span>
				</div>
				{/* <button className='flex w-48 justify-center items-center space-x-2 bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white px-6 py-2 rounded shadow hover:from-[#00449B] hover:to-[#0071D3]'>
					<span>Add request</span>
					<AiOutlinerequestAdd />
				</button> */}
			</div>

			{/* Table */}
			<div className='bg-[#F7F7F7] rounded-lg shadow overflow-x-auto'>
				<table className='w-full border-collapse'>
					<thead>
						<tr className='text-left text-gray-600 uppercase text-xs md:text-sm'>
							<th className='py-3 px-2 md:px-4'>Sr. No</th>
							<th className='py-3 px-2 md:px-4'>Name</th>
							<th className='py-3 px-2 md:px-4'>Description</th>
							<th className='py-3 px-2 md:px-4'>Type</th>
							<th className='py-3 px-2 md:px-4'>Mode</th>
							<th className='py-3 px-2 md:px-4'>Duration</th>
							<th className='py-3 px-2 md:px-4'>Date</th>
							<th className='py-3 px-2 md:px-4'>Action</th>
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
									{request?.select_name ? request?.select_name : '-'}
								</td>
								<td className='py-3 px-2 md:px-4'>
									{request?.description ? request?.description : '-'}
								</td>
								<td className='py-3 px-2 md:px-4'>
									{request?.type ? request?.type : '-'}
								</td>
								<td className='py-3 px-2 md:px-4'>
									{request?.mode ? request?.mode : '-'}
								</td>
								<td className='py-3 px-2 md:px-4'>
									{request?.duration ? request?.duration : '-'}
								</td>
								<td className='py-3 px-2 md:px-4'>
									{request?.date ? request?.date?.split('T')[0] : '-'}
								</td>
								<td className='py-3 px-2 md:px-4'>
									<div className='flex space-x-2'>
										{/* <button className='bg-[#00449B] text-white p-2 rounded-full hover:bg-blue-700'>
											<FiEdit />
										</button> */}
										<button
											className='bg-[#00449B] text-white p-2 rounded-full hover:bg-blue-700'
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
				<div className='flex flex-wrap justify-between items-center p-4 text-gray-600 text-sm'>
					<span>
						Showing {indexOfFirstRequest + 1} to{' '}
						{Math.min(indexOfLastRequest, requests.length)} of {requests.length}
					</span>
					<div className='flex space-x-2'>
						{Array.from({ length: totalPages }, (_, index) => (
							<button
								key={index + 1}
								className={`px-3 py-1 ${
									currentPage === index + 1
										? 'bg-[#00449B] text-white'
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
