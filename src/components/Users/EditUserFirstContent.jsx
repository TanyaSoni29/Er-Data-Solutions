/** @format */

import { useForm } from 'react-hook-form';

const EditUserFirstContent = ({
	setEditUserData1,
	setEditFirstStepComplete,
	setEditUserButton,
	user,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		setEditUserData1(data);
		setEditFirstStepComplete(true);
	};

	return (
		<div className='p-4 md:p-6 min-h-screen'>
			{/* Progress Indicator */}
			<div className='flex justify-center items-center mb-6'>
				<div className='flex items-center space-x-4'>
					<div className='flex items-center justify-center w-10 h-10 rounded-full bg-[#00449B] border-[#01CAEC] border-2 text-white font-bold'>
						1
					</div>
					<div className='w-24 md:w-48 h-1 bg-gray-300'></div>
					<div className='flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 text-gray-500 font-bold'>
						2
					</div>
				</div>
			</div>

			{/* Form Container */}
			<div className='bg-[#F7F7F7] rounded-lg shadow-lg p-4 md:p-6'>
				<h2 className='text-lg md:text-xl font-semibold text-[#0071D3] mb-6'>
					Edit User
				</h2>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex flex-wrap gap-6'
				>
					{/* Company Name */}
					<div className='w-full'>
						<label className='block text-gray-600 mb-2'>Company Name</label>
						<input
							type='text'
							placeholder='Enter Company Name'
							defaultValue={user?.companyName}
							{...register('companyName')}
							className={`w-full px-4 py-2 border ${
								errors.companyName ? 'border-red-500' : 'border-[#01CAEC]'
							} rounded-lg focus:outline-none focus:ring-2 ${
								errors.companyName
									? 'focus:ring-red-500'
									: 'focus:ring-blue-500'
							}`}
						/>
						{errors.companyName && (
							<p className='text-red-500 text-sm mt-1'>
								{errors.companyName.message}
							</p>
						)}
					</div>

					<div className='w-full flex flex-col md:flex-row justify-center items-center gap-2'>
						{/* Contact Person */}
						<div className='w-full md:w-[50%]'>
							<label className='block text-gray-600 mb-2'>Contact Person</label>
							<input
								type='text'
								placeholder='Enter Name'
								defaultValue={user?.contactPerson}
								{...register('contactPerson')}
								className={`w-full px-4 py-2 border ${
									errors.contactPerson ? 'border-red-500' : 'border-[#01CAEC]'
								} rounded-lg focus:outline-none focus:ring-2 ${
									errors.contactPerson
										? 'focus:ring-red-500'
										: 'focus:ring-blue-500'
								}`}
							/>
							{errors.contactPerson && (
								<p className='text-red-500 text-sm mt-1'>
									{errors.contactPerson.message}
								</p>
							)}
						</div>

						{/* Email ID */}
						<div className='w-full md:w-[50%]'>
							<label className='block text-gray-600 mb-2'>Email ID</label>
							<input
								type='email'
								placeholder='Enter Email ID'
								defaultValue={user?.email}
								{...register('email')}
								className={`w-full px-4 py-2 border ${
									errors.email ? 'border-red-500' : 'border-[#01CAEC]'
								} rounded-lg focus:outline-none focus:ring-2 ${
									errors.email ? 'focus:ring-red-500' : 'focus:ring-blue-500'
								}`}
							/>
							{errors.email && (
								<p className='text-red-500 text-sm mt-1'>
									{errors.email.message}
								</p>
							)}
						</div>
					</div>

					<div className='w-full flex flex-col md:flex-row justify-center items-center gap-2'>
						{/* Mobile Number */}
						<div className='w-full md:w-[50%]'>
							<label className='block text-gray-600 mb-2'>Mobile No.</label>
							<input
								type='text'
								placeholder='Enter Mobile No.'
								defaultValue={user?.mobileNo}
								{...register('mobileNo')}
								className={`w-full px-4 py-2 border ${
									errors.mobileNo ? 'border-red-500' : 'border-[#01CAEC]'
								} rounded-lg focus:outline-none focus:ring-2 ${
									errors.mobileNo ? 'focus:ring-red-500' : 'focus:ring-blue-500'
								}`}
							/>
							{errors.mobileNo && (
								<p className='text-red-500 text-sm mt-1'>
									{errors.mobileNo.message}
								</p>
							)}
						</div>

						{/* Password */}
						<div className='w-full md:w-[50%]'>
							<label className='block text-gray-600 mb-2'>Password</label>
							<input
								type='password'
								placeholder='Enter Password'
								{...register('password')}
								className={`w-full px-4 py-2 border ${
									errors.password ? 'border-red-500' : 'border-[#01CAEC]'
								} rounded-lg focus:outline-none focus:ring-2 ${
									errors.password ? 'focus:ring-red-500' : 'focus:ring-blue-500'
								}`}
							/>
							{errors.password && (
								<p className='text-red-500 text-sm mt-1'>
									{errors.password.message}
								</p>
							)}
						</div>
					</div>

					{/* Buttons */}
					<div className='w-full flex flex-col md:flex-row justify-end items-center gap-4 mt-6'>
						<button
							type='button'
							className='w-full md:w-48 px-6 py-2 bg-[#BEDEFA] text-blue-600 rounded-lg hover:bg-white hover:border-blue-600 hover:border-[1px]'
							onClick={() => setEditUserButton(false)}
						>
							Back
						</button>
						<button
							type='submit'
							className='w-full md:w-48 px-6 py-2 bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white rounded-lg hover:from-[#003876] hover:to-[#005fa1]'
						>
							Save & Continue
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditUserFirstContent;
