/** @format */

import { FiEdit } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FaRegCircle } from 'react-icons/fa';
import { AiOutlineUserAdd } from 'react-icons/ai';
// import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser, removeUser } from '../../slices/userSlice';
import { deleteUserById } from '../../service/operations/usersApi';
// import { setUser } from '../../slices/authSlice';
const UsersContent = ({ setAddUserButton, setEditUserButton, setUser }) => {
	const dispatch = useDispatch();
	const { users } = useSelector((state) => state.user);
	const { token } = useSelector((state) => state.auth);
	useEffect(() => {
		dispatch(refreshUser());
	}, [dispatch]);

	const handleAddNewClick = () => {
		setAddUserButton(true);
	};

	const handleEditButton = (user) => {
		setUser(user);
		setAddUserButton(false);
		setEditUserButton(true);
	};

	const handleDelete = async (id) => {
		try {
			const response = await deleteUserById(token, id);
			console.log(response);
			if (response) {
				dispatch(removeUser(id));
				dispatch(refreshUser());
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='p-4 md:p-6 bg-white min-h-screen'>
			{/* Header */}
			<div className='flex flex-wrap justify-between items-center mb-6 px-4'>
				<div className='text-xl md:text-2xl font-semibold text-gray-700 flex justify-start items-center space-x-2'>
					<FaRegCircle fontSize={18} />
					<span>Users List</span>
				</div>
				<button
					onClick={handleAddNewClick}
					className='flex w-full md:w-48 justify-center items-center space-x-2 bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white px-4 py-2 rounded shadow hover:from-[#00449B] hover:to-[#0071D3]'
				>
					<span>Add User</span>
					<AiOutlineUserAdd />
				</button>
			</div>

			{/* Table */}
			<div className='bg-[#F7F7F7] rounded-lg shadow overflow-x-auto'>
				<table className='w-full border-collapse'>
					<thead>
						<tr className='text-left text-gray-600 uppercase text-xs md:text-sm'>
							<th className='py-3 px-2 md:px-4'>Sr. No</th>
							<th className='py-3 px-2 md:px-4'>Company Name</th>
							<th className='py-3 px-2 md:px-4'>Contact Person</th>
							<th className='py-3 px-2 md:px-4'>Email ID</th>
							<th className='py-3 px-2 md:px-4'>Mobile No.</th>
							<th className='py-3 px-2 md:px-4'>Action</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, index) => (
							<tr
								key={user?.id}
								className='border-b hover:bg-gray-50 text-xs md:text-sm'
							>
								<td className='py-3 px-2 md:px-4'>{index + 1}</td>
								<td className='py-3 px-2 md:px-4'>
									{user?.companyName ? user?.companyName : '-'}
								</td>
								<td className='py-3 px-2 md:px-4'>
									{user?.contactPerson ? user?.contactPerson : '-'}
								</td>
								<td className='py-3 px-2 md:px-4'>
									{user?.email ? user?.email : '-'}
								</td>
								<td className='py-3 px-2 md:px-4'>
									{user?.mobile ? user?.mobile : '-'}
								</td>
								<td className='py-3 px-2 md:px-4'>
									<div className='flex space-x-2'>
										<button
											className='bg-[#00449B] text-white p-2 rounded-full hover:bg-blue-700'
											onClick={() => handleEditButton(user)}
										>
											<FiEdit />
										</button>
										<button
											className='bg-[#00449B] text-white p-2 rounded-full hover:bg-blue-700'
											onClick={() => handleDelete(user?.id)}
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
					<span>Showing data 1 to 8 of 100 entries</span>
					<div className='flex space-x-2'>
						<button className='px-3 py-1 bg-gray-200 rounded hover:bg-gray-300'>
							&lt;
						</button>
						<button className='px-3 py-1 bg-[#00449B] text-white rounded'>
							1
						</button>
						<button className='px-3 py-1 bg-gray-200 rounded hover:bg-gray-300'>
							2
						</button>
						<button className='px-3 py-1 bg-gray-200 rounded hover:bg-gray-300'>
							3
						</button>
						<span className='px-3 py-1'>...</span>
						<button className='px-3 py-1 bg-gray-200 rounded hover:bg-gray-300'>
							10
						</button>
						<button className='px-3 py-1 bg-gray-200 rounded hover:bg-gray-300'>
							&gt;
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UsersContent;
