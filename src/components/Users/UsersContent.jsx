import { FiEdit } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FaRegCircle } from 'react-icons/fa';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser, removeUser } from '../../slices/userSlice';
import { deleteUserById } from '../../service/operations/usersApi';

const UsersContent = ({ setAddUserButton, setEditUserButton, setUser }) => {
	const dispatch = useDispatch();
	const { users } = useSelector((state) => state.user);
	const { token } = useSelector((state) => state.auth);

	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState('');
	const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
	const userPerPage = 10;

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
			if (response) {
				dispatch(removeUser(id));
				dispatch(refreshUser());
			}
		} catch (error) {
			console.error('Error deleting user:', error);
		}
	};

	// Search logic
	const filteredUsers = users.filter((user) =>
		[user.companyName, user.contactPerson, user.email, user.mobileNo]
			.map((field) => field?.toLowerCase() || '')
			.some((field) => field.includes(searchQuery.toLowerCase()))
	);

	// Sorting logic
	const sortedUsers = [...filteredUsers].sort((a, b) => {
		if (!sortConfig.key) return 0;

		const fieldA = a[sortConfig.key] || '';
		const fieldB = b[sortConfig.key] || '';

		if (sortConfig.direction === 'asc') {
			return fieldA > fieldB ? 1 : -1;
		}
		return fieldA < fieldB ? 1 : -1;
	});

	const totalPages = Math.ceil(sortedUsers.length / userPerPage);
	const indexOfLastUser = currentPage * userPerPage;
	const indexOfFirstUser = indexOfLastUser - userPerPage;
	const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

	const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

	const handleSort = (key) => {
		setSortConfig((prev) => ({
			key,
			direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
		}));
	};

	return (
		<div className='p-4 md:p-6 bg-white min-h-screen'>
			{/* Header */}
			<div className='flex flex-wrap justify-between items-center mb-6 px-4'>
				<div className='text-xl md:text-2xl font-semibold text-gray-700 flex justify-start items-center space-x-2'>
					<FaRegCircle fontSize={18} />
					<span>Users List</span>
				</div>
				<div className='flex space-x-4 items-center'>
					<input
						type='text'
						placeholder='Search by Company, Person, Email, or Mobile'
						className='w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<button
						onClick={handleAddNewClick}
						className='flex w-full md:w-48 justify-center items-center space-x-2 bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white px-4 py-2 rounded shadow hover:from-[#00449B] hover:to-[#0071D3]'
					>
						<span>Add User</span>
						<AiOutlineUserAdd />
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
								{ label: 'Company Name', key: 'companyName' },
								{ label: 'Contact Person', key: 'contactPerson' },
								{ label: 'Email ID', key: 'email' },
								{ label: 'Mobile No.', key: 'mobileNo' },
								{ label: 'Action', key: null },
							].map(({ label, key }, index) => (
								<th
									key={index}
									className={`py-3 px-2 md:px-4 ${
										key ? 'cursor-pointer' : ''
									}`}
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
						{currentUsers.map((user, index) => (
							<tr
								key={user?.id}
								className='border-b hover:bg-gray-50 text-xs md:text-sm'
							>
								<td className='py-3 px-2 md:px-4'>
									{indexOfFirstUser + index + 1}
								</td>
								<td className='py-3 px-2 md:px-4'>
									{user?.companyName || '-'}
								</td>
								<td className='py-3 px-2 md:px-4'>
									{user?.contactPerson || '-'}
								</td>
								<td className='py-3 px-2 md:px-4'>{user?.email || '-'}</td>
								<td className='py-3 px-2 md:px-4'>{user?.mobileNo || '-'}</td>
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
					<span>
						Showing {indexOfFirstUser + 1} to{' '}
						{Math.min(indexOfLastUser, sortedUsers.length)} of {sortedUsers.length} entries
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

export default UsersContent;
