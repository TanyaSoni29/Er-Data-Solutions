/** @format */

import React, { useEffect, useState, useCallback } from 'react';
import {
  Button,
  TextField,
  MenuItem,
  Box,
  Typography,
  Paper,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import { AiOutlineDownload } from 'react-icons/ai';
import Header from '../Common/Header';
import Sidebar from '../Common/Sidebar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  getRequestById,
  updateRequest,
} from '../../service/operations/requestApi';
import debounce from 'lodash/debounce'; // Import debounce from lodash

const ReqListEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { requests } = useSelector((state) => state.request);

  // Extract the ID from the query string
  const queryParams = new URLSearchParams(location.search);
  const requestId = queryParams.get('id');

  // State for form data and toast
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    priority: '',
    type: '',
    method: '',
    status: '',
    attachment: null,
    existingAttachment: null,
  });
  const [openToast, setOpenToast] = useState(false);

  // Fetch the request data when component mounts
  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const existingRequest = requests.find(
          (req) => req.id === Number(requestId)
        );
        if (existingRequest) {
          setFormData({
            name: existingRequest.requestorName || '',
            description: existingRequest.description || '',
            priority: existingRequest.priority || '',
            type: existingRequest.type || '',
            method: existingRequest.communicationMethod || '',
            status: existingRequest.completionStatus || '',
            attachment: null,
            existingAttachment: existingRequest.attachment || null,
          });
        } else {
          const fetchedRequest = await getRequestById(token, requestId);
          setFormData({
            name: fetchedRequest.requestorName || '',
            description: fetchedRequest.description || '',
            priority: fetchedRequest.priority || '',
            type: fetchedRequest.type || '',
            method: fetchedRequest.communicationMethod || '',
            status: fetchedRequest.completionStatus || '',
            attachment: null,
            existingAttachment: fetchedRequest.attachment || null,
          });
        }
      } catch (error) {
        console.error('Failed to fetch request details:', error);
      }
    };

    if (requestId) fetchRequestDetails();
  }, [requestId, requests, token]);

  // Debounced auto-save function
  const autoSave = useCallback(
    debounce(async (data) => {
      try {
        const updatedData = {
          requestorName: data.name,
          description: data.description,
          priority: data.priority,
          type: data.type,
          communicationMethod: data.method,
          completionStatus: data.status,
        };

        if (data.attachment) {
          const formDataToSend = new FormData();
          Object.keys(updatedData).forEach((key) => {
            formDataToSend.append(key, updatedData[key]);
          });
          formDataToSend.append('attachment', data.attachment);
          await updateRequest(token, requestId, formDataToSend);
        } else {
          await updateRequest(token, requestId, updatedData);
        }
        setOpenToast(true); // Show toast on successful save
      } catch (error) {
        console.error('Failed to auto-save request:', error);
      }
    }, 1000), // Debounce delay of 1 second
    [token, requestId]
  );

  // Handle input changes and trigger auto-save
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value };
      autoSave(updatedFormData); // Trigger auto-save
      return updatedFormData;
    });
  };

  // Handle file download
  const handleDownload = async () => {
    if (formData.existingAttachment) {
      try {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const fileUrl = `${baseUrl}${formData.existingAttachment}`;
        const response = await fetch(fileUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to download file');

        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = formData.existingAttachment.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    }
  };

  // Handle form submission (manual save and redirect)
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
        const formDataToSend = new FormData();
        Object.keys(updatedData).forEach((key) => {
          formDataToSend.append(key, updatedData[key]);
        });
        formDataToSend.append('attachment', formData.attachment);
        await updateRequest(token, requestId, formDataToSend);
      } else {
        await updateRequest(token, requestId, updatedData);
      }

      navigate('/requestsList');
    } catch (error) {
      console.error('Failed to update request:', error);
    }
  };

  // Close toast
  const handleCloseToast = () => {
    setOpenToast(false);
  };

  return (
    <div className='flex flex-col md:flex-row h-screen'>
      <Sidebar />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Header />
        <Box
          p={4}
          minHeight='50vh'
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              width: '100%',
              maxWidth: 1600,
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography
              variant='h5'
              fontWeight='bold'
              mb={4}
              sx={{ color: '#00449B' }}
            >
              Edit Request Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                  <TextField
                    fullWidth
                    label='Name of Requestor'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    variant='outlined'
                    placeholder='Enter Name'
                    sx={{ backgroundColor: '#FFFFFF' }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    select
                    fullWidth
                    label='Priority'
                    name='priority'
                    value={formData.priority}
                    onChange={handleChange}
                    variant='outlined'
                    sx={{ backgroundColor: '#FFFFFF' }}
                  >
                    {['Low', 'Medium', 'High'].map((priority) => (
                      <MenuItem key={priority} value={priority}>
                        {priority}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={1}
                    label='Description'
                    name='description'
                    value={formData.description}
                    onChange={handleChange}
                    variant='outlined'
                    placeholder='Enter description'
                    sx={{ backgroundColor: '#FFFFFF' }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    fullWidth
                    label='Type'
                    name='type'
                    value={formData.type}
                    onChange={handleChange}
                    variant='outlined'
                    sx={{ backgroundColor: '#FFFFFF' }}
                  >
                    {[
                      'Feature Request',
                      'User Feedback',
                      'Bug Report',
                      'Dashboard Request',
                      'Connection Request',
                    ].map((type) => (
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
                    label='Communication Method'
                    name='method'
                    value={formData.method}
                    onChange={handleChange}
                    variant='outlined'
                    sx={{ backgroundColor: '#FFFFFF' }}
                  >
                    {['Email', 'Phone', 'InPerson'].map((method) => (
                      <MenuItem key={method} value={method}>
                        {method}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    fullWidth
                    label='Completion Status'
                    name='status'
                    value={formData.status}
                    onChange={handleChange}
                    variant='outlined'
                    sx={{ backgroundColor: '#FFFFFF' }}
                  >
                    {['Not Started', 'In Progress', 'Completed'].map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant='body1' gutterBottom>
                    Attachment
                  </Typography>
                  {formData.existingAttachment ? (
                    <Box display='flex' alignItems='center'>
                      <Typography variant='body2' sx={{ mr: 2 }}>
                        {`Attached File: ${formData.existingAttachment.split('/').pop()}`}
                      </Typography>
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={handleDownload}
                        startIcon={<AiOutlineDownload />}
                        sx={{
                          textTransform: 'none',
                          bgcolor: '#00449B',
                          '&:hover': { bgcolor: '#003876' },
                        }}
                      >
                        Download
                      </Button>
                    </Box>
                  ) : (
                    <Typography variant='body2' color='textSecondary'>
                      No attachment available
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12} display='flex' justifyContent='flex-end'>
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    sx={{
                      textTransform: 'none',
                      px: 6,
                      py: 1.5,
                      bgcolor: '#00449B',
                      '&:hover': { bgcolor: '#003876' },
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

      {/* Toast Notification */}
      <Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseToast} severity='success' sx={{ width: '100%' }}>
          Changes saved successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ReqListEdit;