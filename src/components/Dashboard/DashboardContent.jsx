/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaUsers, FaChartBar, FaRegChartBar } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
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
  Pagination,
  IconButton,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { refreshUser } from "../../slices/userSlice"; // Ensure this is imported

const DashboardContent = () => {
  const dispatch = useDispatch();
  const { stats, users, loading } = useSelector((state) => state.user);

  // Modal State for dashboards
  const [openModal, setOpenModal] = useState(false);
  const [selectedDashboards, setSelectedDashboards] = useState([]);

  // Modal State for expanded chart
  const [openChartModal, setOpenChartModal] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

  useEffect(() => {
    dispatch(refreshUser()).catch((error) =>
      console.error("Failed to refresh user data:", error)
    );
  }, [dispatch]);

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "short" });
  const currentDay = currentDate.getDate();

  const getPreviousDays = (currentDay) => {
    const labels = [];
    for (let i = 6; i >= 0; i--) {
      let day = currentDay - i;
      let date = new Date(currentDate);
      date.setDate(day);
      const prevMonth = date.getMonth() !== currentDate.getMonth();
      const formattedMonth = prevMonth
        ? date.toLocaleString("default", { month: "short" })
        : currentMonth;
      const formattedDate = `${formattedMonth} ${date.getDate()}`;
      labels.push(formattedDate);
    }
    return labels;
  };

  const dynamicLabels = getPreviousDays(currentDay);

  const adjustDataLength = (data, labels) => {
    const safeData = Array.isArray(data) ? data : [];
    return Array(labels.length)
      .fill(0)
      .map((_, i) => (i < safeData.length ? safeData[i] : 0));
  };

  // Ensure stats.clients and stats.newClients are arrays or use fallback data
  const clientsData = stats?.totalUsers
    ? adjustDataLength(stats.totalUsers, dynamicLabels)
    : [30, 40, 35, 45, 30, 25, 10];
  const newClientsData = stats?.newClients
    ? adjustDataLength(stats.newClients, dynamicLabels)
    : [20, 30, 25, 35, 20, 15, 10];

  const lineChartData = {
    labels: dynamicLabels,
    datasets: [
      {
        label: "Total Users",
        data: clientsData,
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: "#3B82F6",
        pointBorderColor: "#fff",
        pointHoverRadius: 7,
      },
      {
        label: "New Clients",
        data: newClientsData,
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: "#10B981",
        pointBorderColor: "#fff",
        pointHoverRadius: 7,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 12, family: "Arial, sans-serif" },
          color: "#1f2937",
          boxWidth: 20,
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "#fff",
        titleColor: "#1f2937",
        bodyColor: "#4b5563",
        borderColor: "#e5e7eb",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        title: { display: true, text: "", color: "#6b7280", font: { size: 25 } },
        ticks: { color: "#6b7280", font: { size: 10 } },
        grid: { color: "#e5e7eb", borderDash: [5, 5] },
      },
      y: {
        title: { display: true, text: "Number of Clients", color: "#6b7280", font: { size: 12 } },
        ticks: { color: "#6b7280", font: { size: 10 }, beginAtZero: true },
        grid: { color: "#e5e7eb", borderDash: [5, 5] },
      },
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
  };

  // Expanded chart options (optional adjustments for the expanded view)
  const expandedChartOptions = {
    ...lineChartOptions,
    plugins: {
      ...lineChartOptions.plugins,
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
        pan: {
          enabled: true,
          mode: "xy",
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

  const handleOpenChartModal = () => {
    setOpenChartModal(true);
  };

  const handleCloseChartModal = () => {
    setOpenChartModal(false);
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
    <Box p={4} bgcolor="#F3F4F6" minHeight="100vh">
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
                background: `linear-gradient(135deg, ${metric.color}20 0%, #ffffff 100%)`,
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.02)" },
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
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.1)" },
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
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  {metric.title}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color: "#111827",
                    fontWeight: 700,
                    fontFamily: "Arial, sans-serif",
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
          <Paper
            elevation={3}
            sx={{ p: 3, height: "400px", position: "relative", background: "#fff" }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography
                variant="h6"
                color="textSecondary"
                sx={{ fontFamily: "Arial, sans-serif", fontWeight: 600 }}
              >
                Number of New Clients per Month
              </Typography>
              <IconButton onClick={handleOpenChartModal}>
                <ExpandMore />
              </IconButton>
            </Box>
            <Box sx={{ height: "100%", width: "100%", cursor: "pointer" }} onClick={handleOpenChartModal}>
              <Line data={lineChartData} options={lineChartOptions} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper elevation={3} sx={{ p: 3, backgroundColor: "#F9FAFB" }}>
            <Typography
              variant="h6"
              color="textSecondary"
              mb={2}
              sx={{ fontFamily: "Arial, sans-serif", fontWeight: 600 }}
            >
              Dashboard Accessed
            </Typography>
            <TableContainer
              component={Paper}
              sx={{ mt: 1, border: "1px solid #E5E7EB", borderRadius: "8px" }}
            >
              <Table>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "#3B82F6",
                      "& th": {
                        color: "white",
                        fontWeight: "bold",
                        fontFamily: "Arial, sans-serif",
                      },
                    }}
                  >
                    <TableCell>Sr. No</TableCell>
                    <TableCell>Company Name</TableCell>
                    <TableCell>Contact Person</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedUsers?.map((user, index) => (
                    <TableRow
                      key={user?.id || index}
                      sx={{
                        "&:hover": { backgroundColor: "#F3F4F6" },
                      }}
                    >
                      <TableCell sx={{ fontFamily: "Arial, sans-serif" }}>
                        {(index + rowsPerPage * (currentPage - 1)) + 1}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Arial, sans-serif",
                          color: "#1F2937",
                        }}
                      >
                        {user?.companyName || "N/A"}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Arial, sans-serif",
                          color: "#1F2937",
                        }}
                      >
                        {user?.contactPerson || "N/A"}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          sx={{
                            backgroundColor: "#10B981",
                            "&:hover": { backgroundColor: "#047857" },
                            fontFamily: "Arial, sans-serif",
                          }}
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
                          disabled={
                            !user ||
                            (!user.dashboardUrl1 &&
                              !user.dashboardUrl2 &&
                              !user.dashboardUrl3)
                          }
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
                  sx={{
                    "& .MuiPaginationItem-root": {
                      fontFamily: "Arial, sans-serif",
                    },
                  }}
                />
              </Box>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

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
            width: "90%",
            maxWidth: "600px",
            bgcolor: "background.paper",
            border: "1px solid #E5E7EB",
            boxShadow: 24,
            p: 4,
            borderRadius: "12px",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            mb={3}
            sx={{ fontFamily: "Arial, sans-serif", fontWeight: 600 }}
          >
            Dashboard Links
          </Typography>
          <div className="flex flex-col gap-4">
            {selectedDashboards.map((url, index) => (
              <div
                className="flex items-center gap-4"
                key={index}
              >
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
                    className="flex-1 px-4 py-2 border border-[#01CAEC] rounded-lg text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 truncate"
                    style={{ wordBreak: "break-word" }}
                  >
                    {url}
                  </a>
                ) : (
                  <span className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-500 truncate">
                    No URL provided
                  </span>
                )}
              </div>
            ))}
          </div>
          {selectedDashboards.every((url) => !url) && (
            <Typography
              sx={{ mt: 2, color: "#6B7280", fontFamily: "Arial, sans-serif" }}
            >
              No dashboards available.
            </Typography>
          )}
          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button
              onClick={handleCloseModal}
              variant="contained"
              sx={{
                backgroundColor: "#dc2626",
                color: "white",
                "&:hover": { backgroundColor: "#b91c1c" },
                fontFamily: "Arial, sans-serif",
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal for Expanded Chart */}
      <Modal
        open={openChartModal}
        onClose={handleCloseChartModal}
        aria-labelledby="expanded-chart-modal-title"
        aria-describedby="expanded-chart-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "1000px",
            bgcolor: "background.paper",
            border: "1px solid #E5E7EB",
            boxShadow: 24,
            p: 4,
            borderRadius: "12px",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography
              id="expanded-chart-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontFamily: "Arial, sans-serif", fontWeight: 600 }}
            >
              Detailed Client Analysis
            </Typography>
            <IconButton onClick={handleCloseChartModal}>
              <ExpandLess />
            </IconButton>
          </Box>
          <Box sx={{ height: "600px", width: "100%" }}>
            <Line data={lineChartData} options={expandedChartOptions} />
          </Box>
          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button
              onClick={handleCloseChartModal}
              variant="contained"
              sx={{
                backgroundColor: "#dc2626",
                color: "white",
                "&:hover": { backgroundColor: "#b91c1c" },
                fontFamily: "Arial, sans-serif",
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default DashboardContent;