import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import WorkerImg from '../../assets/LoginImg.png';
import LogoImg from '../../assets/LogoImg.png';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { login, signUp } from '../../service/operations/authApi';

const LoginForm = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [showPassword, setShowPassword] = useState(false);
	const [isSignUp, setIsSignUp] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Handle Input Change
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Handle Login Submission
	const handleSubmitLogin = (e) => {
		e.preventDefault();
		if (!formData.email || !formData.password) {
			toast.error('Please provide email and password.');
			return;
		}
		dispatch(login(formData.email, formData.password, navigate));
	};

	// Handle Sign-Up Submission
	const handleSubmitSignUp = (e) => {
		e.preventDefault();
		if (
			!formData.firstName ||
			!formData.lastName ||
			!formData.email ||
			!formData.password ||
			!formData.confirmPassword
		) {
			toast.error('Please fill all required fields.');
			return;
		}
		if (formData.password !== formData.confirmPassword) {
			toast.error('Passwords do not match.');
			return;
		}
		dispatch(signUp(formData, navigate));
	};

	return (
		<div className="h-screen w-screen flex flex-col md:flex-row items-center justify-center bg-white overflow-hidden">
			{/* Left Section */}
			<div className="w-full md:w-[40%] flex flex-col justify-center p-8 md:p-16 bg-white">
				<div className="flex justify-between items-center mb-6">
					<div className="flex items-center">
						<img
							src={LogoImg}
							alt="ER Data Solutions"
							className="w-8 md:w-12"
						/>
						<span className="font-bold text-lg md:text-2xl ml-2">
							ER Data Solutions
						</span>
					</div>
					{!isSignUp && (
						<button
							onClick={() => setIsSignUp(true)}
							className="text-blue-600 font-medium border border-blue-600 px-3 py-1 md:px-4 md:py-2 rounded-lg hover:bg-blue-600 hover:text-white"
						>
							Sign Up
						</button>
					)}
				</div>
				<div>
					{isSignUp ? (
						<>
							<h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
								Create your account
							</h2>
							<p className="text-sm md:text-lg text-gray-500 mb-6">
								Please fill the details below
							</p>
							<form onSubmit={handleSubmitSignUp}>
								<div className="mb-4">
									<label className="block text-sm font-medium text-gray-600 mb-1">
										First Name
									</label>
									<input
										type="text"
										name="firstName"
										placeholder="Enter your first name"
										value={formData.firstName}
										onChange={handleChange}
										className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
										required
									/>
								</div>
								<div className="mb-4">
									<label className="block text-sm font-medium text-gray-600 mb-1">
										Last Name
									</label>
									<input
										type="text"
										name="lastName"
										placeholder="Enter your last name"
										value={formData.lastName}
										onChange={handleChange}
										className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
										required
									/>
								</div>
								<div className="mb-4">
									<label className="block text-sm font-medium text-gray-600 mb-1">
										Email address
									</label>
									<input
										type="email"
										name="email"
										placeholder="Enter your email address"
										value={formData.email}
										onChange={handleChange}
										className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
										required
									/>
								</div>
								<div className="mb-4">
									<label className="block text-sm font-medium text-gray-600 mb-1">
										Password
									</label>
									<input
										type="password"
										name="password"
										placeholder="Enter your password"
										value={formData.password}
										onChange={handleChange}
										className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
										required
									/>
								</div>
								<div className="mb-6">
									<label className="block text-sm font-medium text-gray-600 mb-1">
										Confirm Password
									</label>
									<input
										type="password"
										name="confirmPassword"
										placeholder="Re-enter your password"
										value={formData.confirmPassword}
										onChange={handleChange}
										className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
										required
									/>
								</div>
								<button
									type="submit"
									className="w-full py-2 text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg hover:from-blue-800 hover:to-blue-600 focus:ring-2 focus:ring-blue-500"
								>
									Create Account
								</button>
								<p
									className="text-center text-sm text-blue-600 mt-4 cursor-pointer"
									onClick={() => setIsSignUp(false)}
								>
									Already have an account? Sign In
								</p>
							</form>
						</>
					) : (
						<>
							<h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
								Welcome back!
							</h2>
							<p className="text-sm md:text-lg text-gray-500 mb-6">Please Sign In</p>
							<form onSubmit={handleSubmitLogin}>
								<div className="mb-4">
									<label className="block text-sm font-medium text-gray-600 mb-1">
										Email address
									</label>
									<input
										type="email"
										name="email"
										placeholder="Enter email address"
										value={formData.email}
										onChange={handleChange}
										className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
										required
									/>
								</div>
								<div className="mb-6">
									<label className="block text-sm font-medium text-gray-600 mb-1">
										Password
									</label>
									<div className="relative">
										<input
											type={`${showPassword ? 'text' : 'password'}`}
											name="password"
											placeholder="Enter password"
											value={formData.password}
											onChange={handleChange}
											className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
											required
										/>
										<span
											className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? (
												<AiOutlineEye fontSize={24} />
											) : (
												<AiOutlineEyeInvisible fontSize={24} />
											)}
										</span>
									</div>
								</div>
								<div className="flex items-center justify-between mb-6">
									<label className="flex items-center">
										<input
											type="checkbox"
											className="form-checkbox h-5 w-5 text-blue-600"
										/>
										<span className="ml-2 text-sm text-gray-600">Remember me</span>
									</label>
									<Link
										to="/forgot-password"
										className="text-sm text-blue-600 hover:underline"
									>
										I forgot my password
									</Link>
								</div>
								<button
									type="submit"
									className="w-full py-2 text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg hover:from-blue-800 hover:to-blue-600 focus:ring-2 focus:ring-blue-500"
								>
									Sign In
								</button>
							</form>
						</>
					)}
				</div>
			</div>

			{/* Right Section */}
			<div className="hidden md:block w-full md:w-[60%]">
				<img
					src={WorkerImg}
					alt="Worker Image"
					className="w-full h-full object-cover"
				/>
			</div>
		</div>
	);
};

export default LoginForm;
