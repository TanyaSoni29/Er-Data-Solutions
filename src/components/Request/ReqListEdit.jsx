/** @format */

import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const ReqListEdit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priority: "",
    type: "",
    method: "",
    status: "",
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    setFormData((prev) => ({
      ...prev,
      attachment: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    navigate("/requestsList"); // Redirect to Request List page after submit
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
                {/* Name of Requestor and Priority */}
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
                    placeholder="Select Priority"
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
                    rows={3}
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
                    placeholder="Select Type"
                    sx={{ backgroundColor: "#FFFFFF" }}
                  >
                    {["Type 1", "Type 2", "Type 3"].map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
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
                    placeholder="Select Method"
                    sx={{ backgroundColor: "#FFFFFF" }}
                  >
                    {["Email", "Phone", "Online Meeting"].map((method) => (
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
                    placeholder="Select"
                    sx={{ backgroundColor: "#FFFFFF" }}
                  >
                    {["Not Started", "In Progress", "Completed"].map(
                      (status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      )
                    )}
                  </TextField>
                </Grid>

                {/* File Upload */}
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" gutterBottom>
                    Small File Attachment
                  </Typography>
                  <label htmlFor="file-upload">
                    <Button
                      variant="contained"
                      component="span"
                      color="primary"
                      startIcon={<AiOutlineDownload />}
                      sx={{ textTransform: "none" }}
                    >
                      Download
                    </Button>
                  </label>
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
