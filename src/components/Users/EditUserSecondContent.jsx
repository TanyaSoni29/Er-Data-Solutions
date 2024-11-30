/** @format */

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../service/operations/usersApi';
import { useSelector } from 'react-redux';

const EditUserSecondContent = ({
	editUserDate1,
	user,
	setEditFirstStepComplete,
	setEditUserButton,
}) => {
	const navigate = useNavigate();
	const { token } = useSelector((state) => state.auth);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		try {
			const combineData = { ...editUserDate1, ...data };
			const response = await updateUser(token, user?.id, combineData);
			console.log(response);
			setEditFirstStepComplete(false);
			setEditUserButton(false);
			navigate('/users');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='p-4 md:p-6 min-h-screen'>
			{/* Progress Indicator */}
			<div className='flex justify-center items-center mb-6'>
				<div className='flex items-center space-x-4'>
					<div className='flex items-center justify-center w-10 h-10 rounded-full bg-[#00449B] border-[#01CAEC] border-2 text-white font-bold'>
						1
					</div>
					<div className='w-24 md:w-48 h-1 bg-[#00449B]'></div>
					<div className='flex items-center justify-center w-10 h-10 rounded-full bg-[#00449B] border-[#01CAEC] border-2 text-white font-bold'>
						2
					</div>
				</div>
			</div>

			{/* Form Container */}
			<div className='bg-[#F7F7F7] rounded-lg shadow-lg p-4 md:p-6'>
				<h2 className='text-lg md:text-xl font-semibold text-[#0071D3] mb-6'>
					Edit Details
				</h2>
				<form
					className='w-full flex flex-col justify-start items-start gap-6'
					onSubmit={handleSubmit(onSubmit)}
				>
					{/* Browse Logo */}
					<div className='w-48 flex justify-start items-center'>
						<div className='border-2 border-[#01CAEC] rounded-lg w-full h-32 md:h-48 flex justify-center items-center p-4'>
							<div className='border-dashed border-2 border-gray-500 w-full h-full rounded-lg flex justify-center items-center'>
								<button
									type='button'
									className='text-black hover:text-blue-800 font-medium '
								>
									Browse Logo
								</button>
							</div>
						</div>
					</div>

					{/* Dashboard Inputs */}
					<div className='flex flex-col w-full justify-start items-start gap-2 space-y-2'>
						<div className='w-full flex flex-col items-start justify-start gap-4'>
							{/* Dashboard 1 */}
							<div className='w-full'>
								<div className='flex w-full items-center space-x-4'>
									<div className='bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center'>
										Dashboard 1
									</div>
									<input
										type='text'
										placeholder='Enter Dashboard 1 URL'
										defaultValue={user?.dashboardUrl1}
										{...register('dashboardUrl1', {
											pattern: {
												value: /^(http|https):\/\/[^ "]+$/,
												message: 'Enter a valid URL',
											},
										})}
										className={`w-full flex-1 px-4 py-2 border ${
											errors.dashboardUrl1
												? 'border-red-500'
												: 'border-[#01CAEC]'
										} rounded-lg focus:outline-none focus:ring-2 ${
											errors.dashboardUrl1
												? 'focus:ring-red-500'
												: 'focus:ring-blue-500'
										}`}
									/>
								</div>
								{errors.dashboardUrl1 && (
									<p className='text-red-500 text-sm mt-1'>
										{errors.dashboardUrl1.message}
									</p>
								)}
							</div>

							{/* Dashboard 2 */}
							<div className='w-full'>
								<div className='flex items-center space-x-4'>
									<div className='bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center'>
										Dashboard 2
									</div>
									<input
										type='text'
										placeholder='Enter Dashboard 2 URL'
										defaultValue={user?.dashboardUrl2}
										{...register('dashboardUrl2', {
											pattern: {
												value: /^(http|https):\/\/[^ "]+$/,
												message: 'Enter a valid URL',
											},
										})}
										className={`w-full flex-1 px-4 py-2 border ${
											errors.dashboardUrl2
												? 'border-red-500'
												: 'border-[#01CAEC]'
										} rounded-lg focus:outline-none focus:ring-2 ${
											errors.dashboardUrl2
												? 'focus:ring-red-500'
												: 'focus:ring-blue-500'
										}`}
									/>
								</div>
								{errors.dashboardUrl2 && (
									<p className='text-red-500 text-sm mt-1'>
										{errors.dashboardUrl2.message}
									</p>
								)}
							</div>

							{/* Dashboard 3 */}
							<div className='w-full'>
								<div className='flex items-center space-x-4'>
									<div className='bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center'>
										Dashboard 3
									</div>
									<input
										type='text'
										placeholder='Enter Dashboard 3 URL'
										defaultValue={user?.dashboardUrl3}
										{...register('dashboardUrl3', {
											pattern: {
												value: /^(http|https):\/\/[^ "]+$/,
												message: 'Enter a valid URL',
											},
										})}
										className={`w-full flex-1 px-4 py-2 border ${
											errors.dashboardUrl3
												? 'border-red-500'
												: 'border-[#01CAEC]'
										} rounded-lg focus:outline-none focus:ring-2 ${
											errors.dashboardUrl3
												? 'focus:ring-red-500'
												: 'focus:ring-blue-500'
										}`}
									/>
								</div>
								{errors.dashboardUrl3 && (
									<p className='text-red-500 text-sm mt-1'>
										{errors.dashboardUrl3.message}
									</p>
								)}
							</div>
						</div>
					</div>

					{/* Create Account Button */}
					<div className='w-full flex justify-end mt-6'>
						<button
							type='submit'
							className='w-full md:w-48 bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white px-6 py-2 rounded-lg hover:from-[#003876] hover:to-[#005fa1]'
						>
							Create Account
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditUserSecondContent;
