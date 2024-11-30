/** @format */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const ModelFile = () => {
  const [profileImage, setProfileImage] = useState(null); // State for managing profile image
  const [fileData, setFileData] = useState(null); // State for storing the compressed image file

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the uploaded file
    if (file) {
      // Compress the image using Compressor.js
      new Compressor(file, {
        quality: 0.6, // Adjust quality (0.6 = 60% quality)
        maxWidth: 800, // Limit width
        maxHeight: 800, // Limit height
        success(result) {
          setProfileImage(URL.createObjectURL(result)); // Preview the compressed image
          setFileData(result); // Store the compressed file
        },
        error(err) {
          console.error('Image compression error', err);
        },
      });
    }
  };

  // Handle Form Submit
  const onSubmit = async (data) => {
    const formData = new FormData();
    if (fileData) {
      formData.append('image', fileData); // Append the compressed image file
    }
    formData.append('description', data.description);
    formData.append('link', data.link);

    try {
      // Simulate an API call to submit the form
      const response = { message: 'Data submitted successfully' }; // Replace with real API call
      if (response.message === 'Data submitted successfully') {
        toast.success('Form submitted successfully');
      }
    } catch (error) {
      toast.error('Error submitting form');
      console.log('Form Submission Error:', error);
    }
  };

  return (
    <div className="p-8 bg-[#F8F9FD] min-h-screen">
      <div className="w-full mx-auto bg-[#F8F9FD] rounded-lg p-8">
        <div className="grid grid-cols-1 gap-10">
          {/* Form for Image, Description, and Link */}
          <div>
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Model Form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Image Upload */}
              <div className="mb-4 flex items-center">
                <span className="text-gray-600 mr-4">Image :</span>
                <div className="w-20 h-20 border border-blue-300 rounded-full flex items-center justify-center relative overflow-hidden">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-blue-500 text-xl">&#9998;</span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>

              {/* Description Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Description
                </label>
                <textarea
                  rows={4}
                  {...register('description', {
                    required: 'Description is required',
                  })}
                  placeholder="Enter description here"
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description.message}</p>
                )}
              </div>

              {/* Link Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Link
                </label>
                <input
                  type="url"
                  {...register('link', {
                    required: 'Link is required',
                    pattern: {
                      value: /^(https?:\/\/[^\s]+)/,
                      message: 'Invalid URL format',
                    },
                  })}
                  placeholder="https://example.com"
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                />
                {errors.link && (
                  <p className="text-red-500 text-sm">{errors.link.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="w-full flex justify-end items-center">
                <button
                  type="submit"
                  className="w-48 px-6 py-2 bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white rounded-lg focus:ring focus:ring-blue-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelFile;
