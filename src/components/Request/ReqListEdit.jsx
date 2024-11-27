import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Box,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import { AiOutlineDownload } from "react-icons/ai";
import Header from "../Common/Header";
import Sidebar from "../Common/Sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRequestById, updateRequest } from "../../service/operations/requestApi";

const ReqListEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { requests } = useSelector((state) => state.request);

  // Extract the ID from the query string
  const queryParams = new URLSearchParams(location.search);
  const requestId = queryParams.get("id");

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priority: "",
    type: "",
    method: "",
    status: "",
    attachment: null, // For new file uploads
    existingAttachment: null, // For download link
  });

  // Fetch the request data when component mounts
  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const existingRequest = requests.find((req) => req.id === Number(requestId));
        if (existingRequest) {
          setFormData({
            name: existingRequest.requestorName || "",
            description: existingRequest.description || "",
            priority: existingRequest.priority || "",
            type: existingRequest.type || "",
            method: existingRequest.communicationMethod || "",
            status: existingRequest.completionStatus || "",
            attachment: null, // Handle new uploads separately
            existingAttachment: existingRequest.attachment || null, // File download link
          });
        } else {
          const fetchedRequest = await getRequestById(token, requestId);
          setFormData({
            name: fetchedRequest.requestorName || "",
            description: fetchedRequest.description || "",
            priority: fetchedRequest.priority || "",
            type: fetchedRequest.type || "",
            method: fetchedRequest.communicationMethod || "",
            status: fetchedRequest.completionStatus || "",
            attachment: null,
            existingAttachment: fetchedRequest.attachment || null,
          });
        }
      } catch (error) {
        console.error("Failed to fetch request details:", error);
      }
    };

    if (requestId) fetchRequestDetails();
  }, [requestId, requests, token]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    setFormData((prev) => ({
      ...prev,
      attachment: e.target.files[0],
    }));
  };

  // Handle file download
  const handleDownload = () => {
    if (formData.existingAttachment) {
      const link = document.createElement("a");
      link.href = `http://localhost:3000/api${formData.existingAttachment}`; // Adjust URL if necessary
      link.download = formData.existingAttachment.split("/").pop(); // Extract filename
      link.click();
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        requestorName: formData.name,
        description: formData.description,
        priority: formData.priority,
        type: formData.type,
        communicationMethod: formData.method,
        completionStatus: formData.status,
      };

      if (formData.attachment) {
        // If a new file is uploaded, use FormData
        const formDataToSend = new FormData();
        Object.keys(updatedData).forEach((key) => {
          formDataToSend.append(key, updatedData[key]);
        });
        formDataToSend.append("attachment", formData.attachment);

        await updateRequest(token, requestId, formDataToSend);
      } else {
        // If no new file is uploaded, update only the other fields
        await updateRequest(token, requestId, updatedData);
      }

      navigate("/requestsList"); // Redirect to the requests list after submission
    } catch (error) {
      console.error("Failed to update request:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <Box
          p={4}
          bgcolor="#F9FAFB"
          minHeight="80vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              width: "100%",
              maxWidth: 1200,
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              mb={4}
              sx={{ color: "#00449B" }}
            >
              Edit Request Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={4}>
                {/* Name of Requestor */}
                <Grid item xs={12} md={8}>
                  <TextField
                    fullWidth
                    label="Name of Requestor"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                    placeholder="Enter Name"
                    sx={{ backgroundColor: "#FFFFFF" }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    select
                    fullWidth
                    label="Priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{ backgroundColor: "#FFFFFF" }}
                  >
                    {["Low", "Medium", "High"].map((priority) => (
                      <MenuItem key={priority} value={priority}>
                        {priority}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={1}
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    variant="outlined"
                    placeholder="Enter description"
                    sx={{ backgroundColor: "#FFFFFF" }}
                  />
                </Grid>

                {/* Type and Communication Method */}
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    fullWidth
                    label="Type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{ backgroundColor: "#FFFFFF" }}
                  >
                    {["Feature Request","User Feedback", "Bug Report", "Dashboard Request", "Connection Request"].map(
                      (type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      )
                    )}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    fullWidth
                    label="Communication Method"
                    name="method"
                    value={formData.method}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{ backgroundColor: "#FFFFFF" }}
                  >
                    {["Email", "Phone", "InPerson"].map((method) => (
                      <MenuItem key={method} value={method}>
                        {method}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Completion Status */}
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    fullWidth
                    label="Completion Status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{ backgroundColor: "#FFFFFF" }}
                  >
                    {["Not Started", "In Progress", "Completed"].map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* File Upload and Download */}
                <Grid item xs={12}>
                  <Typography variant="body1" gutterBottom>
                    Attachment
                  </Typography>
                  {formData.existingAttachment && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleDownload}
                      startIcon={<AiOutlineDownload />}
                      sx={{ textTransform: "none", mr: 2 }}
                    >
                      Download Attachment
                    </Button>
                  )}
                  {/* <label htmlFor="file-upload">
                    <Button
                      variant="contained"
                      component="span"
                      color="primary"
                      startIcon={<AiOutlineDownload />}
                      sx={{ textTransform: "none" }}
                    >
                      Upload New Attachment
                    </Button>
                  </label> */}
                  <input
                    type="file"
                    id="file-upload"
                    name="attachment"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                  />
                  {formData.attachment && (
                    <Typography variant="body2" mt={1}>
                      Uploaded: {formData.attachment.name}
                    </Typography>
                  )}
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12} display="flex" justifyContent="flex-end">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      textTransform: "none",
                      px: 6,
                      py: 1.5,
                      bgcolor: "#00449B",
                      "&:hover": {
                        bgcolor: "#003876",
                      },
                    }}
                  >
                    Save & Return
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>
      </div>
    </div>
  );
};

export default ReqListEdit;
