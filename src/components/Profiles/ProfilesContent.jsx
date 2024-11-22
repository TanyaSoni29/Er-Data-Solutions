/** @format */

import { useForm } from 'react-hook-form';

const ProfilesContent = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmitProfile = (data) => {
		console.log('Profile Updated:', data);
		alert('Profile updated successfully!');
	};

	const onSubmitPassword = (data) => {
		console.log('Password Changed:', data);
		if (data.newPassword !== data.confirmPassword) {
			alert("New password and confirm password don't match!");
			return;
		}
		alert('Password changed successfully!');
	};

	return (
		<div className='p-8 bg-[#F8F9FD] min-h-screen'>
			<div className='w-full mx-auto bg-[#F8F9FD] rounded-lg p-8'>
				{/* <h1 className='text-2xl font-bold mb-6'>Profile</h1> */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
					{/* Profile Form */}
					<div>
						<h2 className='text-xl font-semibold text-blue-600 mb-4'>
							Profile
						</h2>
						<form onSubmit={handleSubmit(onSubmitProfile)}>
							{/* Profile Image */}
							<div className='mb-4 flex items-center'>
								<span className='text-gray-600 mr-4'>Profile Image :</span>
								<div className='w-20 h-20 border border-blue-300 rounded-full flex items-center justify-center relative'>
									<span className='text-blue-500 text-xl'>&#9998;</span>
								</div>
							</div>
							{/* Name */}
							<div className='mb-4'>
								<label className='block text-sm font-medium text-gray-600 mb-1'>
									Name
								</label>
								<input
									type='text'
									{...register('name', { required: 'Name is required' })}
									placeholder='Eddie Lake'
									className='w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none'
								/>
								{errors.name && (
									<p className='text-red-500 text-sm'>{errors.name.message}</p>
								)}
							</div>

							<div className='w-full flex flex-col md:flex-row justify-start items-center gap-4 mb-4'>
								{/* Mobile */}
								<div className='mb-4 w-full md:w-[50%]'>
									<label className='block text-sm font-medium text-gray-600 mb-1'>
										Mobile No.
									</label>
									<input
										type='tel'
										{...register('mobile', {
											required: 'Mobile number is required',
										})}
										placeholder='(267) 739-6240'
										className='w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none'
									/>
									{errors.mobile && (
										<p className='text-red-500 text-sm'>
											{errors.mobile.message}
										</p>
									)}
								</div>
								{/* Email */}
								<div className='mb-4 w-full md:w-[50%]'>
									<label className='block text-sm font-medium text-gray-600 mb-1'>
										Email ID
									</label>
									<input
										type='email'
										{...register('email', {
											required: 'Email is required',
											pattern: {
												value: /^\S+@\S+$/i,
												message: 'Invalid email address',
											},
										})}
										placeholder='lorri73@gmail.com'
										className='w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none'
									/>
									{errors.email && (
										<p className='text-red-500 text-sm'>
											{errors.email.message}
										</p>
									)}
								</div>
							</div>

							{/* Save Button */}
							<div className='w-full flex justify-end items-center'>
								<button
									type='submit'
									className='w-48 px-6 py-2 bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white rounded-lg focus:ring focus:ring-blue-300'
								>
									Save
								</button>
							</div>
						</form>
					</div>

					{/* Password Change Form */}
					<div>
						<h2 className='text-xl font-semibold text-blue-800 mb-4'>
							Password
						</h2>
						<form onSubmit={handleSubmit(onSubmitPassword)}>
							{/* Old Password */}
							<div className='mb-4'>
								<label className='block text-sm font-medium text-gray-600 mb-1'>
									Old Password
								</label>
								<input
									type='password'
									{...register('oldPassword', {
										required: 'Old password is required',
									})}
									placeholder='XXXXXX'
									className='w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none'
								/>
								{errors.oldPassword && (
									<p className='text-red-500 text-sm'>
										{errors.oldPassword.message}
									</p>
								)}
							</div>
							{/* New Password */}
							<div className='mb-4'>
								<label className='block text-sm font-medium text-gray-600 mb-1'>
									New Password
								</label>
								<input
									type='password'
									{...register('newPassword', {
										required: 'New password is required',
									})}
									placeholder='XXXXXX'
									className='w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none'
								/>
								{errors.newPassword && (
									<p className='text-red-500 text-sm'>
										{errors.newPassword.message}
									</p>
								)}
							</div>
							{/* Confirm Password */}
							<div className='mb-4'>
								<label className='block text-sm font-medium text-gray-600 mb-1'>
									Confirm Password
								</label>
								<input
									type='password'
									{...register('confirmPassword', {
										required: 'Confirm password is required',
									})}
									placeholder='XXXXXX'
									className='w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none'
								/>
								{errors.confirmPassword && (
									<p className='text-red-500 text-sm'>
										{errors.confirmPassword.message}
									</p>
								)}
							</div>
							{/* Change Password Button */}
							<div className='w-full flex justify-end items-center'>
								<button
									type='submit'
									className='w-48 px-6 py-2 bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white rounded-lg focus:ring focus:ring-blue-300'
								>
									Change Password
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilesContent;
