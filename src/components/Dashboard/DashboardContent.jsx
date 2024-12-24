import {
	FaUsers,
	FaChartBar,
	FaRegChartBar
} from "react-icons/fa";
import {
	useSelector,
	useDispatch
} from "react-redux";
import {
	useEffect,
	useState
} from "react";
import {
	refreshUser
} from "../../slices/userSlice";
import {
	Box,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Button,
	Grid,
	Paper,
	Modal,
	Pagination
} from "@mui/material";
import {
	Bar,
	Line
} from "react-chartjs-2";
import "chart.js/auto";

const DashboardContent = () => {
	const dispatch = useDispatch();
	const {
		stats,
		users,
		loading
	} = useSelector((state) => state.user);

	// Modal State
	const [openModal, setOpenModal] = useState(false);
	const [selectedDashboards, setSelectedDashboards] = useState([]);

	// Pagination State
	const [currentPage, setCurrentPage] = useState(1);
	const rowsPerPage = 3;

	useEffect(() => {
		dispatch(refreshUser());
	}, [dispatch]);

	const currentDate = new Date();
	const currentMonth = currentDate.toLocaleString("default", {
		month: "short",
	});
	const currentDay = currentDate.getDate();

	const getPreviousDays = (currentDay) => {
		const labels = [];
		for (let i = 6; i >= 0; i--) {
			let day = currentDay - i;
			let date = new Date(currentDate);
			date.setDate(day);

			const prevMonth = date.getMonth() !== currentDate.getMonth();
			const formattedMonth = prevMonth ?
				date.toLocaleString("default", {
					month: "short"
				}) :
				currentMonth;
			const formattedDate = `${formattedMonth} ${date.getDate()}`;

			labels.push(formattedDate);
		}
		return labels;
	};

	const dynamicLabels = getPreviousDays(currentDay);

	const lineChartData = {
		labels: dynamicLabels,
		datasets: [{
			label: "Total Clients",
			data: stats?.clients || [30, 40, 35, 45, 30, 25, 10],
			borderColor: "#3B82F6",
			backgroundColor: "rgba(59, 130, 246, 0.2)",
			tension: 0.4,
		},
		{
			label: "New Clients",
			data: stats?.newClients || [20, 30, 25, 35, 20, 15, 10],
			borderColor: "#10B981",
			backgroundColor: "rgba(16, 185, 129, 0.2)",
			tension: 0.4,
		},
		],
	};

	const barChartData = {
		labels: stats?.usersWithDashboards?.map((user, i) => `User ${i + 1}`),
		datasets: [{
			label: "Dashboard 1",
			data: stats?.usersWithDashboards?.map((user) => (user.d1 ? 1 : 0)),
			backgroundColor: "#3B82F6",
		},
		{
			label: "Dashboard 2",
			data: stats?.usersWithDashboards?.map((user) => (user.d2 ? 1 : 0)),
			backgroundColor: "#10B981",
		},
		{
			label: "Dashboard 3",
			data: stats?.usersWithDashboards?.map((user) => (user.d3 ? 1 : 0)),
			backgroundColor: "#F59E0B",
		},
		],
	};

	const barChartOptions = {
		plugins: {
			tooltip: {
				callbacks: {
					label: function (tooltipItem) {
						const dashboardLabel = tooltipItem.dataset.label;
						return `${dashboardLabel}: ${tooltipItem.raw}`;
					},
				},
			},
		},
	};

	const totalNoDashboard = stats?.usersWithDashboards?.reduce((total, user) => {
		return total + (user.d1 ? 1 : 0) + (user.d2 ? 1 : 0) + (user.d3 ? 1 : 0);
	}, 0);

	const handleOpenModal = (dashboards) => {
		setSelectedDashboards(dashboards);
		setOpenModal(true);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
		setSelectedDashboards([]);
	};

	const handleChangePage = (event, value) => {
		setCurrentPage(value);
	};

	// Paginated Users
	const paginatedUsers = users?.slice(
		(currentPage - 1) * rowsPerPage,
		currentPage * rowsPerPage
	);

	return (
		<Box
			p={4}
			bgcolor="#F3F4F6"
			minHeight="100vh"
		>
			{/* Header Metrics Section */}
			<Grid container spacing={4}>
				{[
					{
						title: "Total Users",
						value: stats?.totalUsers || 0,
						color: "#3B82F6",
						icon: <FaUsers size={24} color="white" />,
					},
					{
						title: "Clients",
						value: stats?.clients || 0,
						color: "#10B981",
						icon: <FaRegChartBar size={24} color="white" />,
					},
					{
						title: "Dashboards",
						value: totalNoDashboard || 0,
						color: "#F59E0B",
						icon: <FaChartBar size={24} color="white" />,
					},
				].map((metric, index) => (
					<Grid item xs={12} md={4} key={index}>
						<Paper
							elevation={3}
							sx={{
								p: 3,
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								borderRadius: "12px",
								boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
							}}
						>
							<Box
								sx={{
									width: 50,
									height: 50,
									bgcolor: metric.color,
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									borderRadius: "50%",
								}}
							>
								{metric.icon}
							</Box>
							<Box textAlign="right">
								<Typography
									variant="subtitle1"
									sx={{
										color: "#6B7280",
										fontWeight: 500,
									}}
								>
									{metric.title}
								</Typography>
								<Typography
									variant="h4"
									sx={{
										color: "#111827",
										fontWeight: 700,
									}}
								>
									{loading ? "Loading..." : metric.value}
								</Typography>
							</Box>
						</Paper>
					</Grid>
				))}
			</Grid>

			{/* Charts Section */}
			<Grid container spacing={4} mt={4}>
				<Grid item xs={12} lg={6}>
					<Paper elevation={3} sx={{ p: 6 }}>
						<Typography variant="h6" color="textSecondary" mb={2}>
							Number of New Clients per Month
						</Typography>
						<Line data={lineChartData} />
					</Paper>
				</Grid>
				<Grid item xs={12} lg={6}>
					<Paper elevation={3} sx={{ p: 3 }}>
						<Typography variant="h6" color="textSecondary" mb={1}>
							 Dashboard Accessed
						</Typography>
						<TableContainer component={Paper} sx={{ mt: 1 }}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Sr. No</TableCell>
										<TableCell>Company Name</TableCell>
										<TableCell>Contact Person</TableCell>
										{/* <TableCell>Email ID</TableCell>
							<TableCell>Phone Number</TableCell> */}
										<TableCell align="center">Actions</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{paginatedUsers?.map((user, index) => (
										<TableRow key={user?.id || index}>
											<TableCell>{index + 1}</TableCell>
											<TableCell>{user?.companyName || "N/A"}</TableCell>
											<TableCell>{user?.contactPerson || "N/A"}</TableCell>
											{/* <TableCell>
									{user?.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)
										? user.email
										: "Invalid Email"}
								</TableCell>
								<TableCell>
									{user?.mobileNo && /^\d{10,15}$/.test(user.mobileNo)
										? user.mobileNo
										: "NA"}
								</TableCell> */}
											<TableCell align="center">
												<Button
													variant="contained"
													color="primary"
													size="small"
													onClick={() => {
														const dashboardUrls = [
															user?.dashboardUrl1 || null,
															user?.dashboardUrl2 || null,
															user?.dashboardUrl3 || null,
														];
														if (dashboardUrls.every((url) => !url)) {
															console.error("No valid dashboard URLs provided.");
															alert("This user has no dashboard URLs to view.");
														} else {
															handleOpenModal(dashboardUrls);
														}
													}}
													disabled={!user || !user.dashboardUrl1 && !user.dashboardUrl2 && !user.dashboardUrl3}
												>
													View
												</Button>
											</TableCell>
										</TableRow>

									))}
								</TableBody>
							</Table>
							<Box display="flex" justifyContent="center" mt={2}>
								<Pagination
									count={Math.ceil(users?.length / rowsPerPage)}
									page={currentPage}
									onChange={handleChangePage}
								/>
							</Box>
						</TableContainer>
					</Paper>
				</Grid>
			</Grid>

			{/* User Table Section */}
			{/* <TableContainer component={Paper} sx={{ mt: 4 }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Sr. No</TableCell>
							<TableCell>Company Name</TableCell>
							<TableCell>Contact Person</TableCell>
							<TableCell>Email ID</TableCell>
							<TableCell>Phone Number</TableCell>
							<TableCell align="center">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedUsers?.map((user, index) => (
							<TableRow key={user?.id || index}>
								<TableCell>{index + 1}</TableCell>
								<TableCell>{user?.companyName || "N/A"}</TableCell>
								<TableCell>{user?.contactPerson || "N/A"}</TableCell>
								<TableCell>
									{user?.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)
										? user.email
										: "Invalid Email"}
								</TableCell>
								<TableCell>
									{user?.mobileNo && /^\d{10,15}$/.test(user.mobileNo)
										? user.mobileNo
										: "NA"}
								</TableCell>
								<TableCell align="center">
									<Button
										variant="contained"
										color="primary"
										size="small"
										onClick={() => {
											const dashboardUrls = [
												user?.dashboardUrl1 || null,
												user?.dashboardUrl2 || null,
												user?.dashboardUrl3 || null,
											];
											if (dashboardUrls.every((url) => !url)) {
												console.error("No valid dashboard URLs provided.");
												alert("This user has no dashboard URLs to view.");
											} else {
												handleOpenModal(dashboardUrls);
											}
										}}
										disabled={!user || !user.dashboardUrl1 && !user.dashboardUrl2 && !user.dashboardUrl3}
									>
										View
									</Button>
								</TableCell>
							</TableRow>

						))}
					</TableBody>
				</Table>
				<Box display="flex" justifyContent="center" mt={2}>
					<Pagination
						count={Math.ceil(users?.length / rowsPerPage)}
						page={currentPage}
						onChange={handleChangePage}
					/>
				</Box>
			</TableContainer> */}

			{/* Modal for Dashboards */}
			<Modal
				open={openModal}
				onClose={handleCloseModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: "100%", // Adjust width for larger URLs
						maxWidth: "600px",
						bgcolor: "background.paper",
						border: "none",
						boxShadow: 24,
						p: 4,
						borderRadius: "10px",
					}}
				>
					<Typography id="modal-modal-title" variant="h6" component="h2" mb={3}>
						Dashboard Links
					</Typography>
					<div className="flex flex-col w-full justify-start items-start gap-2 space-y-2">
						{selectedDashboards.map((url, index) => (
							<div className="w-full flex flex-col items-start justify-start gap-4" key={index}>
								<div className="w-full">
									<div className="flex items-center space-x-4">
										<div
											className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
											style={{ minWidth: "120px" }}
										>
											{`Dashboard ${index + 1}`}
										</div>
										{url ? (
											<a
												href={url}
												target="_blank"
												rel="noopener noreferrer"
												className="w-full flex-1 px-4 py-2 border border-[#01CAEC] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
												style={{
													textDecoration: "none",
													color: "#007BFF",
													wordBreak: "break-word", // Break long URLs
												}}
											>
												{url}
											</a>
										) : (
											<span
												className="text-gray-500 w-full flex-1 px-4 py-2 border border-[#E5E7EB] rounded-lg"
												style={{ wordBreak: "break-word" }}
											>
												No URL provided
											</span>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
					{selectedDashboards.every((url) => !url) && (
						<Typography>No dashboards available.</Typography>
					)}
				</Box>
			</Modal>


		</Box>
	);
};

export default DashboardContent;
