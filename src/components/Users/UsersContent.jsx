/** @format */

import { FiEdit } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FaRegCircle } from 'react-icons/fa';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
const UsersContent = () => {
	const navigate = useNavigate();
	const handleAddNewClick = () => {
		navigate('/users/addUser');
	};

	const users = [
		{
			id: 1,
			companyName: "Tam's Stationers",
			contactPerson: 'Corina McCoy',
			email: 'lorri73@gmail.com',
			mobile: '(267) 739-6240',
		},
		{
			id: 2,
			companyName: 'Seamans Furniture',
			contactPerson: 'Kenneth Allen',
			email: 'iva838@outlook.com',
			mobile: '(813) 752-5611',
		},
		{
			id: 3,
			companyName: "Johnson's General Stores",
			contactPerson: 'Iva Ryan',
			email: 'r.m.smith@gmail.com',
			mobile: '(503) 338-2573',
		},
		{
			id: 4,
			companyName: 'Super Duper',
			contactPerson: 'Autumn Phillips',
			email: 'patricia651@outlook.com',
			mobile: '(830) 556-6651',
		},
		{
			id: 5,
			companyName: "Luskin's",
			contactPerson: 'Jerry Helfer',
			email: 'c_j_mccoy@gmail.com',
			mobile: '(920) 948-1722',
		},
		{
			id: 6,
			companyName: 'Finast',
			contactPerson: 'Paula Mora',
			email: 'alex941@outlook.com',
			mobile: '(303) 420-4261',
		},
		{
			id: 7,
			companyName: 'Cut Rite Lawn Care',
			contactPerson: 'Daniel Hamilton',
			email: 's.t.sharkey@outlook.com',
			mobile: '(214) 390-8650',
		},
		{
			id: 8,
			companyName: 'Pacific Stereo',
			contactPerson: 'Frances Swann',
			email: 'james_hall@gmail.com',
			mobile: '(618) 474-9169',
		},
	];

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
								key={user.id}
								className='border-b hover:bg-gray-50 text-xs md:text-sm'
							>
								<td className='py-3 px-2 md:px-4'>{index + 1}</td>
								<td className='py-3 px-2 md:px-4'>{user.companyName}</td>
								<td className='py-3 px-2 md:px-4'>{user.contactPerson}</td>
								<td className='py-3 px-2 md:px-4'>{user.email}</td>
								<td className='py-3 px-2 md:px-4'>{user.mobile}</td>
								<td className='py-3 px-2 md:px-4'>
									<div className='flex space-x-2'>
										<button
											className='bg-[#00449B] text-white p-2 rounded-full hover:bg-blue-700'
											onClick={() => navigate('/users/editUser')}
										>
											<FiEdit />
										</button>
										<button className='bg-[#00449B] text-white p-2 rounded-full hover:bg-blue-700'>
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
