/** @format */

import { FaUsers, FaChartBar, FaRegChartBar } from "react-icons/fa"; // Updated Icons
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshUser } from "../../slices/userSlice";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";

const DashboardContent = () => {
  const dispatch = useDispatch();
  const { stats, loading } = useSelector((state) => state.user);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  // Dummy data for charts
  const lineChartData = {
    labels: [
      "Sept 2",
      "Sept 7",
      "Sept 12",
      "Sept 17",
      "Sept 22",
      "Sept 27",
      "Oct 2",
    ],
    datasets: [
      {
        label: "Total Clients",
        data: [30, 40, 35, 45, 30, 25, 40],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
      },
      {
        label: "New Clients",
        data: [20, 30, 25, 35, 20, 15, 30],
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Dashboard 1",
        data: [50, 60, 70, 80],
        backgroundColor: "#3B82F6",
      },
      {
        label: "Dashboard 2",
        data: [40, 50, 60, 70],
        backgroundColor: "#10B981",
      },
    ],
  };

  // Dummy data for table
  const dummyTableData = stats?.companies || [
    {
      id: 1,
      name: "Tam's Stationers",
      contactPerson: "Corina McCoy",
      email: "lorri73@gmail.com",
    },
    {
      id: 2,
      name: "Pacific Stereo",
      contactPerson: "Judith Rodriguez",
      email: "k_pacheco@gmail.com",
    },
    {
      id: 3,
      name: "Britches of Georgetown",
      contactPerson: "Patricia Sanders",
      email: "k.p.allen@aol.com",
    },
    {
      id: 4,
      name: "Giant",
      contactPerson: "Frances Swann",
      email: "rodger913@aol.com",
    },
    {
      id: 5,
      name: "Auto Works",
      contactPerson: "Iva Ryan",
      email: "dennis416@gmail.com",
    },
  ];

  return (
    <Box p={4} bgcolor="#F3F4F6" minHeight="100vh">
      {/* Header Metrics Section */}
      <Grid container spacing={4}>
        {/* Metric Cards */}
        {[
          {
            title: "Total Users",
            value: stats?.totalUsers || 0,
            color: "#3B82F6", // Blue
            icon: <FaUsers size={24} color="white" />,
          },
          {
            title: "Clients",
            value: stats?.clients || 0,
            color: "#10B981", // Green
            icon: <FaRegChartBar size={24} color="white" />,
          },
          {
            title: "Dashboards",
            value: stats?.dashboardsCount || 0,
            color: "#F59E0B", // Yellow
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
              {/* Icon Section */}
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

              {/* Text Section */}
              <Box textAlign="right">
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#6B7280", fontWeight: 500 }}
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
        {/* Line Chart */}
        <Grid item xs={12} lg={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" color="textSecondary" mb={2}>
              Number of New Clients per Month
            </Typography>
            <Line data={lineChartData} />
          </Paper>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} lg={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" color="textSecondary" mb={2}>
              Top Dashboard Accessed
            </Typography>
            <Bar data={barChartData} />
          </Paper>
        </Grid>
      </Grid>

      {/* Table Section */}
      {/* <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr. No</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Contact Person</TableCell>
              <TableCell>Email ID</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyTableData.map((company, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.contactPerson}</TableCell>
                <TableCell>{company.email}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    View
                  </Button>
                  <Button
                    variant="outlined"
                    color="warning"
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" size="small">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </Box>
  );
};

export default DashboardContent;
