/** @format */

import { useForm } from 'react-hook-form';
import { FaRegCircle } from 'react-icons/fa';
import { createRequest } from '../../service/operations/requestApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HeaderUser from '../Common/HeaderUser';
import Sidebar from '../Common/Sidebar';

const RequestForm = () => {
  const { token, user } = useSelector((state) => state.auth); // Get token and user data from Redux
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Prepare form data for API submission
      const formData = new FormData();
      formData.append('userId', user.id); // Add userId from logged-in user
      formData.append('companyName', user.companyName); // Add companyName from logged-in user
  
      // Set default values for requestDate and completionStatus
      const defaultRequestDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
      const defaultCompletionStatus = 'Not Started';
  
      // Append all form data fields
      for (let key in data) {
        if (key === 'attachment' && data.attachment && data.attachment.length > 0) {
          // Append the file if attached
          formData.append(key, data.attachment[0]);
        } else if (key !== 'requestDate' && key !== 'completionStatus') {
          // Append all other form fields
          formData.append(key, data[key]);
        }
      }
  
      // Append default values for `requestDate` and `completionStatus`
      formData.append('requestDate', defaultRequestDate); // Default request date (current date)
      formData.append('completionStatus', defaultCompletionStatus); // Default completion status
  
      // API call to create a request
      const response = await createRequest(token, formData);
      if (response) {
        reset(); // Reset the form after successful submission
        navigate('/requests'); // Navigate to history list
      }
    } catch (error) {
      console.error('Error submitting request form:', error);
    }
  };
  

  return (
    <div className='flex flex-col md:flex-row h-screen'>
      <Sidebar />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <HeaderUser />

        <div className='p-4 md:p-6 bg-white min-h-screen'>
          {/* Page Header */}
          <div className='text-xl md:text-2xl font-semibold text-gray-700 flex justify-start items-center space-x-2 mb-6'>
            <FaRegCircle fontSize={18} />
            <span>Request</span>
          </div>

          {/* Buttons */}
          <div className='flex space-x-4 items-center mb-6 px-4'>
            <span
              className='text-black text-lg cursor-pointer'
              onClick={() => navigate('/requests')}
            >
              History Request List
            </span>

            <button className='bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white px-6 py-2 rounded-lg shadow-lg hover:from-[#003876] hover:to-[#005fa1]'>
              Add New Request
            </button>
          </div>

          {/* Form Container */}
          <div className='bg-white p-4 md:p-6 rounded-lg shadow-lg'>
            <h2 className='text-xl font-semibold text-gray-700 mb-6'>Request Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {/* Description */}
              <div>
                <label className='block text-gray-600 mb-2'>Description</label>
                <input
                  type='text'
                  placeholder='Enter description'
                  {...register('description', { required: 'Description is required' })}
                  className={`w-full px-4 py-2 border ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 ${
                    errors.description ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                  }`}
                />
                {errors.description && (
                  <p className='text-red-500 text-sm mt-1'>{errors.description.message}</p>
                )}
              </div>

              {/* Type */}
              <div>
                <label className='block text-gray-600 mb-2'>Type</label>
                <select
                  {...register('type', { required: 'Type is required' })}
                  className={`w-full px-4 py-2 border ${
                    errors.type ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 ${
                    errors.type ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                  }`}
                >
                  <option value=''>Select type</option>
                  <option value='Dashboard Request'>Dashboard Request</option>
                  <option value='User Feedback'>User Feedback</option>
                  <option value='Connection Request'>Connection Request</option>
                  <option value='Feature Request'>Feature Request</option>
                  <option value='Bug Report'>Bug Report</option>
                </select>
                {errors.type && <p className='text-red-500 text-sm mt-1'>{errors.type.message}</p>}
              </div>

              {/* Requestor Name */}
              <div>
                <label className='block text-gray-600 mb-2'>Name of Requestor</label>
                <input
                  type='text'
                  placeholder='Enter Requestor Name'
                  {...register('requestorName', {
                    required: 'Name of Requestor is required',
                  })}
                  className={`w-full px-4 py-2 border ${
                    errors.requestorName ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 ${
                    errors.requestorName ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                  }`}
                />
                {errors.requestorName && (
                  <p className='text-red-500 text-sm mt-1'>{errors.requestorName.message}</p>
                )}
              </div>

              {/* Priority */}
              <div>
                <label className='block text-gray-600 mb-2'>Priority</label>
                <select
                  {...register('priority', { required: 'Priority is required' })}
                  className={`w-full px-4 py-2 border ${
                    errors.priority ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 ${
                    errors.priority ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                  }`}
                >
                  <option value=''>Select Priority</option>
                  <option value='High'>High</option>
                  <option value='Medium'>Medium</option>
                  <option value='Low'>Low</option>
                </select>
                {errors.priority && (
                  <p className='text-red-500 text-sm mt-1'>{errors.priority.message}</p>
                )}
              </div>

              {/* Communication Method */}
              <div>
                <label className='block text-gray-600 mb-2'>Communication Method</label>
                <select
                  {...register('communicationMethod', { required: 'Communication Method is required' })}
                  className={`w-full px-4 py-2 border ${
                    errors.communicationMethod ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 ${
                    errors.communicationMethod ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                  }`}
                >
                  <option value=''>Select Method</option>
                  <option value='Email'>Email</option>
                  <option value='Phone'>Phone</option>
                  <option value='InPerson'>In-Person</option>
                </select>
                {errors.communicationMethod && (
                  <p className='text-red-500 text-sm mt-1'>{errors.communicationMethod.message}</p>
                )}
              </div>

              {/* File Attachment */}
              <div>
                <label className='block text-gray-600 mb-2'>Attach File</label>
                <input
                  type='file'
                  {...register('attachment', {
                    validate: {
                      validFormat: (value) => {
                        if (value.length > 0) {
                          const allowedFormats = ['image/jpeg', 'image/png', 'application/pdf']; // Add your allowed formats
                          return (
                            allowedFormats.includes(value[0].type) ||
                            'Invalid file format. Only JPEG, PNG, and PDF are allowed.'
                          );
                        }
                        return true; // No file selected is valid
                      },
                    },
                  })}
                  className={`w-full px-4 py-2 border ${
                    errors.attachment ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 ${
                    errors.attachment ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                  }`}
                />
                {errors.attachment && (
                  <p className='text-red-500 text-sm mt-1'>{errors.attachment.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className='col-span-3 mt-6 flex justify-end'>
                <button
                  type='submit'
                  className='bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white px-6 py-2 rounded-lg shadow-lg hover:from-[#003876] hover:to-[#005fa1]'
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;
