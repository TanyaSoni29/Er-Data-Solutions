/** @format */

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Compressor from "compressorjs"; // Ensure this library is installed
import { createForm } from "../../service/operations/formApi"; // API call for form creation
import { addForm, setLoading } from "../../slices/formSlice"; // Redux actions

const ModelFile = () => {
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState(null); // State for managing image preview
  const [fileData, setFileData] = useState(null); // Compressed image file
  const loading = useSelector((state) => state.forms.loading); // Loading state from Redux
  const token = useSelector((state) => state.auth.token); // Auth token from Redux

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
        setFileData(file);  // Store the original file (with the extension)
      },
      error(err) {
        console.error("Image compression error:", err);
        toast.error("Image compression failed. Please try again.");
      },
    });
  }
};

// Handle Form Submission
const onSubmit = async (data) => {
  if (!fileData) {
    toast.error("Please upload an image.");
    return;
  }

  const formData = new FormData();
  // Append the original file (with its extension)
  formData.append("image", fileData); // Use the original file, not the compressed result
  formData.append("description", data.description);
  formData.append("link", data.link);

  try {
    dispatch(setLoading(true)); // Set loading state to true

    // Call the API
    const response = await createForm(token, formData);

    if (response) {
      dispatch(addForm(response)); // Add new form to Redux state
      toast.success("Form submitted successfully!");

      // Reset the form after successful submission
      reset();
      setFileData(null);
      setProfileImage(null);
    }
  } catch (error) {
    console.error("Form submission error:", error);
    toast.error("Error submitting form. Please try again.");
  } finally {
    dispatch(setLoading(false)); // Set loading state to false
  }
};


  return (
    <div className="p-8 bg-[#F8F9FD] min-h-screen">
      <div className="w-full mx-auto bg-[#F8F9FD] rounded-lg p-8">
        <div className="grid grid-cols-1 gap-10">
          {/* Form Section */}
          <div>
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Client Notification</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Image Upload */}
              <div className="mb-4 flex items-center">
                <span className="text-gray-600 mr-4">Image :</span>
                <div className="w-20 h-20 border border-blue-300 rounded-full flex items-center justify-center relative overflow-hidden">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Uploaded"
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
                  {...register("description", {
                    required: "Description is required",
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
                  {...register("link", {
                    required: "Link is required",
                    pattern: {
                      value: /^(https?:\/\/[^\s]+)/,
                      message: "Invalid URL format",
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
                  disabled={loading} // Disable button during submission
                  className={`w-48 px-6 py-2 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white"
                  } rounded-lg focus:ring focus:ring-blue-300`}
                >
                  {loading ? "Submitting..." : "Submit"}
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
