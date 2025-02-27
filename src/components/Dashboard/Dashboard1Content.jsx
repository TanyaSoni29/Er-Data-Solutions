/** @format */

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllForms, getFormById } from "../../service/operations/formApi";

const Dashboard1Content = () => {
  const { user } = useSelector((state) => state.auth); // Get user from Redux
  const [formData, setFormData] = useState(null); // State for form data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
  const BASE_URL = import.meta.env.VITE_BASE_URL; // Backend base URL

  // Fetch the form data when the component mounts
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const token = user?.token;
        const formsData = await getAllForms(token);
        const formDataId = formsData.reduce((max, curr) => {
          return curr?.id > max?.id ? curr : max;
        }, formsData[0]);
        const formId = formDataId?.id; // Replace with the specific form ID
        const response = await getFormById(token, formId); // Fetch form by ID
        setFormData(response); // Save the fetched data
      } catch (error) {
        console.error("Error fetching form data:", error);
      } finally {
        setIsLoading(false); // Set loading to false after API call
      }
    };

    fetchFormData();
  }, [user]);

  useEffect(() => {
    // Check if the modal has already been shown during this session
    const hasModalShown = localStorage.getItem("hasModalShown");
    if (!hasModalShown) {
      setIsModalOpen(true); // Open the modal for the first time
      localStorage.setItem("hasModalShown", "true"); // Set the flag in localStorage
    }
  }, []);

  // Handle modal close
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle visit URL
  const visitUrl = () => {
    if (formData?.link) {
      window.open(formData.link, "_blank");
    } else {
      console.error("No link available in form data.");
    }
  };

  // Show loader while waiting for API response
  if (isLoading) {
    return (
      <div className="p-6 bg-[#F8F9FD] min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  const image = `${BASE_URL}${formData?.imagePath}?timestamp=${new Date().getTime()}`;

  return (
    <div className="p-6 bg-[#F8F9FD] min-h-screen">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative transform transition-all duration-300 ease-in-out"
            style={{
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 rounded-full w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            >
              ×
            </button>
            {/* Modal Title */}
            <h2 className="text-xl font-semibold text-blue-600 mb-4 text-center">
              Client Notification
            </h2>

            {/* Modal Content */}
            <div className="flex flex-col items-center gap-4">
              {/* Image */}
              <div className="w-full max-h-[60%] overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt="Modal Image"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description */}
              <p className="text-gray-800 text-base mb-4 text-center">
                {formData?.description || "Sample description for the form"}
              </p>

              {/* Visit URL Button */}
              <div className="text-center">
                {formData?.link ? (
                  <button
                    onClick={visitUrl}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 text-base font-medium"
                  >
                    Visit URL
                  </button>
                ) : (
                  <p className="text-gray-500 text-base">No link available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard iframe */}
      {user?.dashboardUrl1 ? (
        <iframe
          src={user.dashboardUrl1} // Power BI link from Redux
          title="Power BI Dashboard"
          className="w-full border-0 rounded-lg shadow-md"
          style={{
            minHeight: "800px", // Minimum height for desktop
            objectFit: "cover", // Ensures content scales properly
            height: "calc(100vh - 12rem)", // Adjust height to fit viewport minus header/padding
            overflowY: "auto", // Adds vertical scrollbar if content overflows
          }}
        ></iframe>
      ) : (
        <p className="text-center text-gray-600 text-lg mt-8">
          No dashboard URLs found. Please contact the administration at{" "}
          <a
            href="mailto:info@ERData-Solutions.com"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            info@ERData-Solutions.com
          </a>
        </p>
      )}
    </div>
  );
};

export default Dashboard1Content;