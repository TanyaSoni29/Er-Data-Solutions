/** @format */

import { useForm } from 'react-hook-form';
import { FaRegCircle } from 'react-icons/fa';
import { createRequest } from '../../service/operations/requestApi';
import { useSelector } from 'react-redux';

const RequestForm = () => {
	const { token } = useSelector((state) => state.auth);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmit = async (data) => {
		try {
			const response = await createRequest(token, data);
			// console.log(response);
			if (response) {
				reset();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='p-4 md:p-6 bg-white min-h-screen'>
			{/* Page Header */}
			<div className='text-xl md:text-2xl font-semibold text-gray-700 flex justify-start items-center space-x-2 mb-10'>
				<FaRegCircle fontSize={18} />
				<span>Request</span>
			</div>

			{/* Form Container */}
			<div className='bg-white p-4 md:p-6 rounded-lg'>
				<h2 className='text-xl font-semibold text-gray-700 mb-6'>
					Request Form
				</h2>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='grid grid-cols-1 md:grid-cols-3 gap-6'
				>
					{/* Description */}
					<div>
						<label className='block text-gray-600 mb-2'>Description</label>
						<input
							type='text'
							placeholder='Enter description'
							{...register('description', {
								required: 'Description is required',
							})}
							className={`w-full px-4 py-2 border ${
								errors.description ? 'border-red-500' : 'border-gray-300'
							} rounded-lg focus:outline-none focus:ring-2 ${
								errors.description
									? 'focus:ring-red-500'
									: 'focus:ring-blue-500'
							}`}
						/>
						{errors.description && (
							<p className='text-red-500 text-sm mt-1'>
								{errors.description.message}
							</p>
						)}
					</div>

					{/* Type */}
					<div>
						<label className='block text-gray-600 mb-2'>Type</label>
						<select
							{...register('type', { required: 'Type is required' })}
							className={`w-full px-4 py-2 border ${
								errors.type ? 'border-red-500' : 'border-gray-300'
							} rounded-lg focus:outline-none focus:ring-2 ${
								errors.type ? 'focus:ring-red-500' : 'focus:ring-blue-500'
							}`}
						>
							<option value=''>Select type</option>
							<option value='type1'>Dashboard Request</option>
							<option value='type2'>User Feedback</option>
							<option value='type3'>Connection Request</option>
							<option value='type2'>Features Request</option>
							<option value='type3'>Bug report | Performance issue</option>
						</select>
						{errors.type && (
							<p className='text-red-500 text-sm mt-1'>{errors.type.message}</p>
						)}
					</div>

					{/* Duration */}
					<div>
						<label className='block text-gray-600 mb-2'>Name of Requestor</label>
						<input
							type='text'
							placeholder='Enter Requestor Name'
							{...register('duration', { required: 'Duration is required' })}
							className={`w-full px-4 py-2 border ${
								errors.duration ? 'border-red-500' : 'border-gray-300'
							} rounded-lg focus:outline-none focus:ring-2 ${
								errors.duration ? 'focus:ring-red-500' : 'focus:ring-blue-500'
							}`}
						/>
						{errors.duration && (
							<p className='text-red-500 text-sm mt-1'>
								{errors.duration.message}
							</p>
						)}
					</div>

					{/* Date */}
					<div>
						<label className='block text-gray-600 mb-2'> Request Date</label>
						<input
							type='date'
							{...register('date', { required: 'Date is required' })}
							className={`w-full px-4 py-2 border ${
								errors.date ? 'border-red-500' : 'border-gray-300'
							} rounded-lg focus:outline-none focus:ring-2 ${
								errors.date ? 'focus:ring-red-500' : 'focus:ring-blue-500'
							}`}
						/>
						{errors.date && (
							<p className='text-red-500 text-sm mt-1'>{errors.date.message}</p>
						)}
					</div>

					{/* Mode */}
					<div>
						<label className='block text-gray-600 mb-2'>Priority</label>
						<select
							{...register('mode', { required: 'Mode is required' })}
							className={`w-full px-4 py-2 border ${
								errors.mode ? 'border-red-500' : 'border-gray-300'
							} rounded-lg focus:outline-none focus:ring-2 ${
								errors.mode ? 'focus:ring-red-500' : 'focus:ring-blue-500'
							}`}
						>
							<option value=''>Select Priority</option>
							<option value='High'>High</option>
							<option value='Medium'>Medium</option>
							<option value='Low'>Low</option>
						</select>
						{errors.mode && (
							<p className='text-red-500 text-sm mt-1'>{errors.mode.message}</p>
						)}
					</div>

					{/* Select Name */}
					<div>
						<label className='block text-gray-600 mb-2'>Communication Method</label>
						<select
							{...register('select_name', { required: 'Name is required' })}
							className={`w-full px-4 py-2 border ${
								errors.name ? 'border-red-500' : 'border-gray-300'
							} rounded-lg focus:outline-none focus:ring-2 ${
								errors.name ? 'focus:ring-red-500' : 'focus:ring-blue-500'
							}`}
						>
							<option value=''>Method Name</option>
							<option value='name1'>Email</option>
							<option value='name2'>Phone</option>
							<option value='name3'>InPerson</option>
						</select>
						{errors.select_name && (
							<p className='text-red-500 text-sm mt-1'>
								{errors.select_name.message}
							</p>
						)}
					</div>

					{/* Buttons */}
					<div className='col-span-1 md:col-span-3 flex flex-wrap space-x-0 sm:space-x-4 gap-4 sm:gap-0 mt-6'>
						<button
							type='submit'
							className='w-52 bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white px-6 py-2 rounded-lg hover:from-[#00449B] hover:to-[#0071D3]'
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RequestForm;
