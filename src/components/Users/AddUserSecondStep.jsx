/** @format */

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const AddUserSecondStep = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		console.log(data);
		navigate('/users');
		alert('Account Created Successfully!');
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
					Add Details
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
										{...register('dashboard1', {
											required: 'Dashboard 1 URL is required',
											pattern: {
												value: /^(http|https):\/\/[^ "]+$/,
												message: 'Enter a valid URL',
											},
										})}
										className={`w-full flex-1 px-4 py-2 border ${
											errors.dashboard1 ? 'border-red-500' : 'border-[#01CAEC]'
										} rounded-lg focus:outline-none focus:ring-2 ${
											errors.dashboard1
												? 'focus:ring-red-500'
												: 'focus:ring-blue-500'
										}`}
									/>
								</div>
								{errors.dashboard1 && (
									<p className='text-red-500 text-sm mt-1'>
										{errors.dashboard1.message}
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
										{...register('dashboard2', {
											required: 'Dashboard 2 URL is required',
											pattern: {
												value: /^(http|https):\/\/[^ "]+$/,
												message: 'Enter a valid URL',
											},
										})}
										className={`w-full flex-1 px-4 py-2 border ${
											errors.dashboard2 ? 'border-red-500' : 'border-[#01CAEC]'
										} rounded-lg focus:outline-none focus:ring-2 ${
											errors.dashboard2
												? 'focus:ring-red-500'
												: 'focus:ring-blue-500'
										}`}
									/>
								</div>
								{errors.dashboard2 && (
									<p className='text-red-500 text-sm mt-1'>
										{errors.dashboard2.message}
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
										{...register('dashboard3', {
											required: 'Dashboard 3 URL is required',
											pattern: {
												value: /^(http|https):\/\/[^ "]+$/,
												message: 'Enter a valid URL',
											},
										})}
										className={`w-full flex-1 px-4 py-2 border ${
											errors.dashboard3 ? 'border-red-500' : 'border-[#01CAEC]'
										} rounded-lg focus:outline-none focus:ring-2 ${
											errors.dashboard3
												? 'focus:ring-red-500'
												: 'focus:ring-blue-500'
										}`}
									/>
								</div>
								{errors.dashboard3 && (
									<p className='text-red-500 text-sm mt-1'>
										{errors.dashboard3.message}
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

export default AddUserSecondStep;
