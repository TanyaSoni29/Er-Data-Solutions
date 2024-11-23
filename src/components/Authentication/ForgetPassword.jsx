/** @format */

import { useNavigate } from 'react-router-dom';
import WorkerImg2 from '../../assets/forgetPasswordImg.png'; // Replace with your image path
import LogoImg from '../../assets/LogoImg.png';
import { useState } from 'react';
import { forgetPassword } from '../../service/operations/authApi';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email) {
			return;
		}
		try {
			const response = await forgetPassword(email);
			console.log(response);
			if (response.message === 'New password sent to your email') {
				navigate('/');
			}
		} catch (error) {
			console.log(error);
		}

		// Redirect to login page
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100'>
			<div className='flex flex-wrap w-full bg-white shadow-lg rounded-lg overflow-hidden'>
				{/* Left Section */}
				<div className='w-full md:w-[40%] p-10 md:p-24 flex-col justify-center items-center'>
					<div className='flex justify-between items-center mb-40'>
						<div className='flex justify-start items-center'>
							<img
								src={LogoImg} // Replace with your logo path
								alt='ER Data Solutions'
								className='w-8 md:w-12'
							/>
							<span className='font-bold w-16'>ER Data Solutions</span>
						</div>
						<button
							onClick={() => navigate('/signup')}
							className='text-blue-600 font-medium border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white'
						>
							Sign Up
						</button>
					</div>
					<div className='w-[75%] mx-auto'>
						<h2 className='text-sm font-normal text-gray-800 mb-1'>
							Password recovery
						</h2>
						<p className='text-2xl text-black font-bold flex flex-col mb-8'>
							Forgot your password?
							<span className='text-lg text-gray-500 font-normal'>
								Kindly enter the email address linked to this account and we
								will send you a code to enable you to change your password.
							</span>
						</p>
						<form onSubmit={handleSubmit}>
							<div className='mb-6'>
								<label className='block text-sm font-medium text-gray-600 mb-1'>
									Email address
								</label>
								<input
									type='email'
									name='email'
									placeholder='Enter email address'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									required
								/>
							</div>
							<button
								type='submit'
								className='w-full text-white py-2 rounded-lg bg-gradient-to-r from-[#00449B] to-[#0071D3] hover:from-blue-800 hover:to-blue-600 focus:outline-none'
							>
								Send
							</button>
						</form>
					</div>
				</div>

				{/* Right Section */}
				<div className='hidden md:block w-full md:w-[60%]'>
					<img
						src={WorkerImg2} // Replace with your image path
						alt='Worker Image'
						className='w-full h-full object-cover'
					/>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
