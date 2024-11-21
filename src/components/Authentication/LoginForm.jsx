/** @format */

// /** @format */

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// // import { useDispatch } from 'react-redux';
// import toast from 'react-hot-toast';
// // import { login, signUp } from '../../service/operations/authApi';

// const LoginForm = () => {
// 	const [isSignUp, setIsSignUp] = useState(false);
// 	const [formData, setFormData] = useState({
// 		email: '',
// 		password: '',
// 		confirmPassword: '',
// 	});
// 	// const dispatch = useDispatch();
// 	const navigate = useNavigate();

// 	const toggleForm = (e) => {
// 		e.preventDefault();
// 		setIsSignUp(!isSignUp);
// 		setFormData({ email: '', password: '', confirmPassword: '' });
// 	};

// 	const handleChange = (e) => {
// 		setFormData({ ...formData, [e.target.name]: e.target.value });
// 	};

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		if (isSignUp) {
// 			if (formData.password.length < 6) {
// 				toast.error('Password must be at least 6 characters long.');
// 				return;
// 			}

// 			if (formData.password !== formData.confirmPassword) {
// 				toast.error("Passwords don't match.");
// 				return;
// 			}

// 			// dispatch(signUp(formData, navigate));
// 			toast.success('Registered successfully!');
// 		} else {
// 			if (!formData.email || !formData.password) {
// 				toast.error('Please provide email and password.');
// 				return;
// 			}

// 			// dispatch(login(formData.email, formData.password, navigate));
// 			// toast.success('Logged in successfully!');
// 		}

// 		navigate('/');
// 	};

// 	return (
// 		<div className='auth-container'>
// 			<div className='content-wrapper'>
// 				<div className='form-container'>
// 					<h2 className='form-title'>{isSignUp ? 'Sign up' : 'Sign in'}</h2>
// 					<form onSubmit={handleSubmit}>
// 						<input
// 							type='email'
// 							name='email'
// 							placeholder='Enter your email'
// 							className='input-field'
// 							value={formData.email}
// 							onChange={handleChange}
// 							required
// 						/>
// 						<input
// 							type='password'
// 							name='password'
// 							placeholder='Enter your password'
// 							className='input-field'
// 							value={formData.password}
// 							onChange={handleChange}
// 							required
// 						/>
// 						{isSignUp && (
// 							<input
// 								type='password'
// 								name='confirmPassword'
// 								placeholder='Confirm your password'
// 								className='input-field'
// 								value={formData.confirmPassword}
// 								onChange={handleChange}
// 								required
// 							/>
// 						)}
// 						<button
// 							type='submit'
// 							className='auth-button'
// 						>
// 							{isSignUp ? 'Sign up' : 'Sign in'}
// 						</button>
// 					</form>
// 					<p className='toggle-text'>
// 						{isSignUp ? (
// 							<>
// 								Already have an account?{' '}
// 								<a
// 									href='#'
// 									onClick={toggleForm}
// 								>
// 									Sign in
// 								</a>
// 							</>
// 						) : (
// 							<>
// 								Don't have an account?{' '}
// 								<a
// 									href='#'
// 									onClick={toggleForm}
// 								>
// 									Sign up
// 								</a>
// 							</>
// 						)}
// 					</p>
// 				</div>

// 				{/* Image Container */}
// 				{/* <div className='image-container'>
// 					<img
// 						src={saloonLogo} // Replace with your image path
// 						alt='Tanning Salon'
// 						className='tanning-salon-image'
// 					/>
// 				</div> */}
// 			</div>
// 		</div>
// 	);
// };

// export default LoginForm;

/** @format */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import WorkerImg from '../../assets/LoginImg.png';
import LogoImg from '../../assets/LogoImg.png';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const LoginForm = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!formData.email || !formData.password) {
			toast.error('Please provide email and password.');
			return;
		}
		toast.success('Logged in successfully!');
		navigate('/dashboard'); // Replace with the dashboard route
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

						<button
							onClick={() => navigate('/signup')}
							className='text-blue-600 font-medium border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white'
						>
							Sign Up
						</button>
					</div>
					<div className='w-[75%] mx-auto'>
						<h2 className='text-2xl font-semibold text-gray-800 mb-1'>
							Welcome back!!
						</h2>
						<p className='text-lg text-gray-500 mb-8'>Please Sign In</p>
						<form onSubmit={handleSubmit}>
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
