import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import WorkerImg from '../../assets/LoginImg.png';
import LogoImg from '../../assets/LogoImg.png';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { login } from '../../service/operations/authApi';

const LoginForm = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [showPassword, setShowPassword] = useState(false);
	const [isSignUp, setIsSignUp] = useState(false); // State to toggle Sign Up form
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Handle input changes for Login and Sign Up forms
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Handle login submission
	const handleSubmitLogin = (e) => {
		e.preventDefault();
		if (!formData.email || !formData.password) {
			toast.error('Please provide email and password.');
			return;
		}
		dispatch(login(formData.email, formData.password, navigate));
	};

	// Handle Sign Up submission
	const handleSubmitSignUp = (e) => {
		e.preventDefault();
		if (
			!formData.name ||
			!formData.email ||
			!formData.password ||
			!formData.confirmPassword
		) {
			toast.error('Please fill all fields.');
			return;
		}
		if (formData.password !== formData.confirmPassword) {
			toast.error('Passwords do not match.');
			return;
		}
		toast.success('Account created successfully!');
		// Add sign-up API logic here
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
								className='w-10 md:w-12'
							/>
							<span className='font-bold md:w-16'>ER Data Solutions</span>
						</div>

						{!isSignUp && (
							<button
								onClick={() => setIsSignUp(true)}
								className='text-blue-600 font-medium border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white'
							>
								Sign Up
							</button>
						)}
					</div>
					{/* Form Section */}
					<div className='w-[75%] mx-auto'>
						{isSignUp ? (
							<>
								<h2 className='text-2xl font-semibold text-gray-800 mb-1'>
									Create your account
								</h2>
								<p className='text-lg text-gray-500 mb-8'>
									Please fill the details below
								</p>
								<form onSubmit={handleSubmitSignUp}>
									{/* Name */}
									<div className='mb-4'>
										<label className='block text-sm font-medium text-gray-600 mb-1'>
											Name
										</label>
										<input
											type='text'
											name='name'
											placeholder='Enter your name'
											value={formData.name}
											onChange={handleChange}
											className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
											required
										/>
									</div>
									{/* Email */}
									<div className='mb-4'>
										<label className='block text-sm font-medium text-gray-600 mb-1'>
											Email address
										</label>
										<input
											type='email'
											name='email'
											placeholder='Enter your email address'
											value={formData.email}
											onChange={handleChange}
											className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
											required
										/>
									</div>
									{/* Password */}
									<div className='mb-4'>
										<label className='block text-sm font-medium text-gray-600 mb-1'>
											Password
										</label>
										<input
											type='password'
											name='password'
											placeholder='Enter your password'
											value={formData.password}
											onChange={handleChange}
											className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
											required
										/>
									</div>
									{/* Confirm Password */}
									<div className='mb-6'>
										<label className='block text-sm font-medium text-gray-600 mb-1'>
											Confirm Password
										</label>
										<input
											type='password'
											name='confirmPassword'
											placeholder='Re-enter your password'
											value={formData.confirmPassword}
											onChange={handleChange}
											className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
											required
										/>
									</div>
									{/* Submit Button */}
									<button
										type='submit'
										className='w-full text-white py-2 rounded-lg bg-gradient-to-r from-[#00449B] to-[#0071D3] hover:from-blue-800 hover:to-blue-600 focus:outline-none'
									>
										Create Account
									</button>
									{/* Back to Login */}
									<p
										className='text-center text-sm text-blue-600 mt-4 cursor-pointer'
										onClick={() => setIsSignUp(false)}
									>
										Already have an account? Sign In
									</p>
								</form>
							</>
						) : (
							<>
								<h2 className='text-2xl font-semibold text-gray-800 mb-1'>
									Welcome back!!
								</h2>
								<p className='text-lg text-gray-500 mb-8'>Please Sign In</p>
								<form onSubmit={handleSubmitLogin}>
									<div className='mb-4'>
										<label className='block text-sm font-medium text-gray-600 mb-1'>
											Email address
										</label>
										<input
											type='email'
											name='email'
											placeholder='Enter email address'
											value={formData.email}
											onChange={handleChange}
											className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
											required
										/>
									</div>
									<div className='mb-6'>
										<label className='block text-sm font-medium text-gray-600 mb-1'>
											Password
										</label>
										<div className='relative'>
											<input
												type={`${showPassword ? 'text' : 'password'}`}
												name='password'
												placeholder='Enter password'
												value={formData.password}
												onChange={handleChange}
												className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
												required
											/>
											<span
												className='absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer'
												onClick={() => setShowPassword((prev) => !prev)}
											>
												{showPassword ? (
													<AiOutlineEye fontSize={24} />
												) : (
													<AiOutlineEyeInvisible fontSize={24} />
												)}
											</span>
										</div>
									</div>
									<div className='flex items-center justify-between mb-6'>
										<label className='flex items-center'>
											<input
												type='checkbox'
												className='form-checkbox h-5 w-5 text-blue-600'
											/>
											<span className='ml-2 text-sm text-gray-600'>
												Remember me
											</span>
										</label>
										<Link
											to='/forgot-password'
											className='text-sm text-blue-600 hover:underline'
										>
											I forgot my password
										</Link>
									</div>
									<button
										type='submit'
										className='w-full text-white py-2 rounded-lg bg-gradient-to-r from-[#00449B] to-[#0071D3] hover:from-blue-800 hover:to-blue-600 focus:outline-none'
									>
										Sign In
									</button>
								</form>
							</>
						)}
					</div>
				</div>

				{/* Right Section */}
				<div className='hidden md:block w-full md:w-[60%]'>
					<img
						src={WorkerImg} // Replace with your image path
						alt='Worker Image'
						className='w-full h-full object-cover'
					/>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
