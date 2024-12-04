/** @format */

import { FaUsers, FaChartBar, FaRegChartBar } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshUser } from "../../slices/userSlice";
import {
  Box,
  Typography,
  Grid,
  Paper,
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

  // Get current date and month dynamically
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'short' }); // Gets current short month name (e.g., 'Oct')
  const currentDay = currentDate.getDate(); // Gets current day (e.g., 4)

  // Function to handle dynamic date calculation for labels
  const getPreviousDays = (currentDay) => {
    const labels = [];
    for (let i = 6; i >= 0; i--) {
      let day = currentDay - i;
      let date = new Date(currentDate);
      date.setDate(day);

      // Check if the calculated day is in the previous month
      const prevMonth = date.getMonth() !== currentDate.getMonth();
      const formattedMonth = prevMonth
        ? date.toLocaleString("default", { month: "short" })
        : currentMonth;
      const formattedDate = `${formattedMonth} ${date.getDate()}`;
      
      labels.push(formattedDate);
    }
    return labels;
  };

  // Get the dynamic labels for the last 7 days (including previous month if necessary)
  const dynamicLabels = getPreviousDays(currentDay);

  // Dynamically generate chart data
  const lineChartData = {
    labels: dynamicLabels, // Dynamic date labels
    datasets: [
      {
        label: "Total Clients",
        data: stats?.clients ? [stats.clients] : [30, 40, 35, 45, 30, 25, 10], // Dynamic data
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
      },
      {
        label: "New Clients",
        data: stats?.newClients || [20, 30, 25, 35, 20, 15, 10], // This should be an array fetched from the backend
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        tension: 0.4,
      }
      
    ],
  };

  const barChartData = {
    // Dynamically generate labels based on the number of dashboards
    labels: Array.from({ length: stats?.dashboardsCount || 9 }, (_, i) => `D ${i + 1}`),
  
    datasets: [
      {
        label: "Dashboard 1",
        data: stats?.dashboardsCount ? Array(stats.dashboardsCount).fill(stats.dashboardsCount) : [50, 60, 70, 80, 90, 100, 110, 120, 130], // Dynamic data
        backgroundColor: "#3B82F6",
      },
      {
        label: "Dashboard 2",
        data: stats?.clients ? Array(stats.clients).fill(stats.clients) : [40, 50, 60, 70, 80, 90, 100, 110, 120], // Dynamic data
        backgroundColor: "#10B981",
      },
    ],
  };
  

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
            value: stats?.dashboardsCount || 0,
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
    </Box>
  );
};

export default DashboardContent;
