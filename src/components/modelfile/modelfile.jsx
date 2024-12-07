/** @format */

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import Compressor from 'compressorjs'; // Image compression library
import { setForm, updateForm, setLoading } from '../../slices/formSlice'; // Redux actions
import { getFormById } from '../../service/operations/formApi'; // API call for fetching the form by ID
import { apiConnector } from '../../service/apiConnector'; // API connector

const ModelFile = () => {
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState(null); // State for managing image preview
  const [fileData, setFileData] = useState(null); // Compressed image file
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [updatedData, setUpdatedData] = useState(null); // Local state to manage modal data
  const loading = useSelector((state) => state.forms.loading); // Loading state from Redux
  const formData = useSelector((state) => state.forms.form); // Form data from Redux
  const token = useSelector((state) => state.auth.token); // Auth token from Redux

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchFormData = async () => {
    try {
      const formId = 20; // Example: Replace with dynamic logic to get the form ID
      const response = await getFormById(token, formId);
      if (response) {
        dispatch(setForm(response)); // Dispatch to Redux store
        reset(response); // Set form data into react-hook-form
        setUpdatedData(response); // Update local modal data

        // Check if there's an image URL from the backend and set the preview
        if (response.imagePath) {
          setProfileImage(
            `${import.meta.env.VITE_BASE_URL}${response.imagePath}` // Set the image URL for preview
          );
        }
      }
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  // Fetch form data by ID
  useEffect(() => {
    fetchFormData();
  }, [dispatch, token, reset]);

  // Handle Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Compress the image
      new Compressor(file, {
        quality: 0.6, // Reduce image quality to 60%
        maxWidth: 800, // Restrict maximum width
        maxHeight: 800, // Restrict maximum height
        success(result) {
          // Preview the compressed image
          setProfileImage(URL.createObjectURL(result));
          // Store compressed file for preview but keep the original file for upload
          setFileData(file); // Store the original file (with the extension)
        },
        error(err) {
          console.error('Image compression error:', err);
          toast.error('Image compression failed. Please try again.');
        },
      });
    }
  };

  // Handle Form Submission (Update form data)
  const onSubmit = async (data) => {
    const formDataToSend = new FormData();
    // Append image only if it exists
    if (fileData) {
      formDataToSend.append('image', fileData); // Use the original file, not the compressed result
    }
    formDataToSend.append('description', data.description);
    formDataToSend.append('link', data.link);

    try {
      dispatch(setLoading(true)); // Set loading state to true

      // Call the API to update the form (PUT request)
      const response = await apiConnector(
        'PUT',
        `${import.meta.env.VITE_BASE_URL}/forms/${formData.id}`,
        formDataToSend,
        {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // For file upload
        }
      );

      if (response) {
        dispatch(updateForm(response)); // Dispatch the updated form data to Redux
        setUpdatedData(response); // Update modal content immediately
        toast.success('Form updated successfully!');

        // Update local state to reflect changes immediately
        setProfileImage(response.imagePath ? `${import.meta.env.VITE_BASE_URL}${response.imagePath}` : profileImage);
        setFileData(null);
        reset(response); // Reset the form with updated values
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Error submitting form. Please try again.');
    } finally {
      dispatch(setLoading(false)); // Set loading state to false
    }
  };

  // Modal open/close handlers
  const openModal = () => {
    setUpdatedData(formData); // Sync modal data with form data
    setIsModalOpen(true);

    // Fetch the latest form data and sync it with the modal
    fetchFormData(); // Fetch latest data when modal is opened
  };

  const closeModal = () => setIsModalOpen(false);

  // Modal Content
  const visitUrl = () => {
    if (updatedData?.link) {
      window.open(updatedData.link, '_blank');
    }
  };

  return (
    <div className='p-8 bg-[#F8F9FD] min-h-screen'>
      <div className='w-full mx-auto bg-[#F8F9FD] rounded-lg p-8'>
        <div className='grid grid-cols-1 gap-10'>
          {/* Form Section */}
          <div>
            <h2 className='text-xl font-semibold text-blue-600 mb-4'>
              Client Notification
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Image Upload */}
              <div className='mb-4 flex items-center'>
                <span className='text-gray-600 mr-4'>Image :</span>
                <div className='w-20 h-20 border border-blue-300 rounded-full flex items-center justify-center relative overflow-hidden'>
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt='Uploaded'
                      className='w-full h-full object-cover rounded-full'
                    />
                  ) : (
                    <span className='text-blue-500 text-xl'>&#9998;</span>
                  )}
                  <input
                    type='file'
                    accept='image/*'
                    className='absolute inset-0 opacity-0 cursor-pointer'
                    onChange={handleImageUpload}
                  />
                </div>
              </div>

              {/* Description Field */}
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-600 mb-1'>
                  Description
                </label>
                <textarea
                  rows={4}
                  {...register('description', {
                    required: 'Description is required',
                  })}
                  placeholder='Enter description here'
                  className='w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none'
                />
                {errors.description && (
                  <p className='text-red-500 text-sm'>
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Link Field */}
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-600 mb-1'>
                  Link
                </label>
                <input
                  type='url'
                  {...register('link', {
                    required: 'Link is required',
                    pattern: {
                      value: /^(https?:\/\/[^\s]+)/,
                      message: 'Invalid URL format',
                    },
                  })}
                  placeholder='https://example.com'
                  className='w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none'
                />
                {errors.link && (
                  <p className='text-red-500 text-sm'>{errors.link.message}</p>
                )}
              </div>

              {/* Submit and Preview Buttons */}
              <div className='w-full flex justify-between items-center'>
                {/* Submit Button */}
                <button
                  type='submit'
                  disabled={loading} // Disable button during submission
                  className={`w-48 px-6 py-2 ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white'
                  } rounded-lg focus:ring focus:ring-blue-300`}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>

                {/* Preview Button */}
                <button
                  type='button'
                  onClick={openModal}
                  className='w-48 px-6 py-2 bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white rounded-lg focus:ring focus:ring-blue-300'
                >
                  Preview
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50'>
          <div
            className='bg-white rounded-lg relative shadow-lg'
            style={{
              width: '600px',
              height: '500px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className='absolute top-4 right-4 text-gray-600'
              style={{
                fontSize: '30px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              &times;
            </button>

            {/* Modal Content */}
            <div
              className='w-full h-full'
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '16px',
              }}
            >
              {/* Image */}
              <div
                style={{
                  width: '100%',
                  height: '60%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  marginBottom: '16px',
                }}
              >
                <img
                  src={updatedData?.imagePath || profileImage}
                  alt='Modal Image'
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              {/* Description */}
              <p className='text-gray-800 text-lg mb-6 text-center'>
                {updatedData?.description || 'Sample description for the form'}
              </p>

              {/* Visit URL Button */}
              <div className='text-center'>
                {updatedData?.link ? (
                  <button
                    onClick={visitUrl}
                    className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none text-lg font-medium'
                  >
                    Visit URL
                  </button>
                ) : (
                  <p className='text-gray-500'>No link available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelFile;
