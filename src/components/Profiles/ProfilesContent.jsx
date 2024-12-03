/** @format */

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, updateUser } from '../../service/operations/usersApi';
import { refreshUser } from '../../slices/userSlice';
import toast from 'react-hot-toast';
import Compressor from 'compressorjs';

const ProfilesContent = () => {
	const { user: loginUser, token } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const { users } = useSelector((state) => state.user);
	const user = users.find((u) => u.id === loginUser.id);

	const [profileImage, setProfileImage] = useState(user?.image || null); // State for managing profile image
	const [fileData, setFileData] = useState(null); // State for the uploaded/compressed image file

	// Profile Form
	const {
		register: registerProfile,
		handleSubmit: handleProfileSubmit,
		formState: { errors: profileErrors },
	} = useForm();

	// Password Form
	const {
		register: registerPassword,
		handleSubmit: handlePasswordSubmit,
		formState: { errors: passwordErrors },
		reset: resetPasswordForm,
	} = useForm();

	useEffect(() => {
		dispatch(refreshUser());
	}, [dispatch]);

	// Handle Password Change Submit
	const onSubmitPassword = async (data) => {
		try {
			if (data.newPassword !== data.confirmPassword) {
				toast.error('Password must match confirm password');
				return;
			}
			const newData = {
				email: user?.email,
				newPassword: data.newPassword,
				confirmPassword: data.confirmPassword,
				oldPassword: data.oldPassword,
			};
			const response = await resetPassword(newData);
			console.log(response);
			if (response?.message === 'Password reset successfully') {
				dispatch(refreshUser());
				resetPasswordForm();
				toast.success('Password reset successfully');
			}
		} catch (error) {
			toast.error('Error resetting password');
			console.log('Password Reset Error:', error);
		}
	};

	const handleImageUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			// Compress the image
			new Compressor(file, {
				quality: 0.6, // Reduce image quality
				maxWidth: 800, // Restrict maximum width
				maxHeight: 800, // Restrict maximum height
				success(result) {
					setProfileImage(URL.createObjectURL(result)); // Preview the compressed image
					setFileData(result); // Store compressed file
				},
				error(err) {
					console.error('Image compression error:', err);
					toast.error('Image compression failed. Please try again.');
				},
			});
		}
	};

	const onSubmitProfile = async (data) => {
		if (!fileData) {
			toast.error('Please upload an image.');
			return;
		}

		const formData = new FormData();
		formData.append('image', fileData); // Add compressed image
		formData.append('contactPerson', data.contactPerson); // Add name
		formData.append('email', data.email); // Add email
		formData.append('mobileNo', data.mobileNo); // Add mobile number

		try {
			const response = await updateUser(token, user?.id, formData);
			if (response.message === 'User updated successfully') {
				dispatch(refreshUser());
				toast.success('Profile updated successfully!');
			}
		} catch (error) {
			console.error('Profile Update Error:', error);
			toast.error('Failed to update profile. Please try again.');
		}
	};

	useEffect(() => {
		// Set the default profile image from API if available
		if (user?.image) {
			setProfileImage(`${import.meta.env.VITE_BASE_URL}${user.image}`); // Append backend URL to relative image path
		}
	}, [user]);

	return (
		<div className='p-8 bg-[#F8F9FD] min-h-screen'>
			<div className='w-full mx-auto bg-[#F8F9FD] rounded-lg p-8'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
					{/* Profile Form */}
					<div>
						<h2 className='text-xl font-semibold text-blue-600 mb-4'>
							Profile
						</h2>
						<form onSubmit={handleProfileSubmit(onSubmitProfile)}>
							{/* Profile Image */}
							<div className='mb-4 flex items-center'>
								<span className='text-gray-600 mr-4'>Profile Image :</span>
								<div className='w-20 h-20 border border-blue-300 rounded-full flex items-center justify-center relative overflow-hidden'>
									{profileImage ? (
										<img
											src={profileImage}
											alt='Profile'
											className='w-full h-full object-cover rounded-full'
										/>
									) : (
										<span className='text-blue-500 text-xl'>Profile</span>
									)}
									<input
										type='file'
										accept='image/*'
										className='absolute inset-0 opacity-0 cursor-pointer'
										onChange={handleImageUpload}
									/>
								</div>
							</div>

							{/* Name */}
							<div className='mb-4'>
								<label className='block text-sm font-medium text-gray-600 mb-1'>
									Name
								</label>
								<input
									type='text'
									defaultValue={user?.contactPerson}
									{...registerProfile('contactPerson', {
										required: 'Name is required',
									})}
									placeholder='Eddie Lake'
									className='w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none'
								/>
								{profileErrors.contactPerson && (
									<p className='text-red-500 text-sm'>
										{profileErrors.contactPerson.message}
									</p>
								)}
							</div>

							{/* Mobile */}
							<div className='mb-4'>
								<label className='block text-sm font-medium text-gray-600 mb-1'>
									Mobile No.
								</label>
								<input
									type='tel'
									defaultValue={user?.mobileNo}
									{...registerProfile('mobileNo', {
										required: 'Mobile number is required',
									})}
									placeholder='(267) 739-6240'
									className='w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none'
								/>
								{profileErrors.mobileNo && (
									<p className='text-red-500 text-sm'>
										{profileErrors.mobileNo.message}
									</p>
								)}
							</div>

							{/* Email */}
							<div className='mb-4'>
								<label className='block text-sm font-medium text-gray-600 mb-1'>
									Email ID
								</label>
								<input
									type='email'
									defaultValue={user?.email}
									{...registerProfile('email', {
										required: 'Email is required',
										pattern: {
											value: /^\S+@\S+$/i,
											message: 'Invalid email address',
										},
									})}
									placeholder='lorri73@gmail.com'
									className='w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none'
								/>
								{profileErrors.email && (
									<p className='text-red-500 text-sm'>
										{profileErrors.email.message}
									</p>
								)}
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
						<form onSubmit={handlePasswordSubmit(onSubmitPassword)}>
							{/* Old Password */}
							<div className='mb-4'>
								<label className='block text-sm font-medium text-gray-600 mb-1'>
									Old Password
								</label>
								<input
									type='password'
									{...registerPassword('oldPassword', {
										required: 'Old password is required',
									})}
									placeholder='XXXXXX'
									className='w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none'
								/>
								{passwordErrors.oldPassword && (
									<p className='text-red-500 text-sm'>
										{passwordErrors.oldPassword.message}
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
									{...registerPassword('newPassword', {
										required: 'New password is required',
									})}
									placeholder='XXXXXX'
									className='w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none'
								/>
								{passwordErrors.newPassword && (
									<p className='text-red-500 text-sm'>
										{passwordErrors.newPassword.message}
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
									{...registerPassword('confirmPassword', {
										required: 'Confirm password is required',
									})}
									placeholder='XXXXXX'
									className='w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none'
								/>
								{passwordErrors.confirmPassword && (
									<p className='text-red-500 text-sm'>
										{passwordErrors.confirmPassword.message}
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
