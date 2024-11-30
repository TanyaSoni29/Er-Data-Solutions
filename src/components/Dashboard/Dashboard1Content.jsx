import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Dashboard1Content = () => {
  const { user } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(true); // Open modal by default

  // Log the user data to ensure the link is coming from Redux
  console.log('User data from Redux:', user);

  // Handle modal close
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle visit URL
  const visitUrl = () => {
    if (user?.dashboardUrl1) {
      window.open(user.dashboardUrl1, '_blank');
    }
  };

  return (
    <div className="p-6 bg-[#F8F9FD] min-h-screen">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[80%] md:w-[60%] relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 text-xl"
            >
              &times;
            </button>

            {/* Modal Content */}
            <div className="text-center">
              {/* Image */}
              <img
                src="your-image-url-here" // Replace with actual image URL or local image path
                alt="Modal Image"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />

              {/* Description */}
              <p className="text-gray-800 text-lg mb-6">
                This is the description of the dashboard. You can customize
                this text based on your needs.
              </p>

              {/* Visit URL Button */}
              <button
                onClick={visitUrl}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
              >
                Visit URL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard iframe */}
      {user?.dashboardUrl1 ? (
        <iframe
          src={user.dashboardUrl1} // Power BI link from Redux
          title="Power BI Dashboard"
          width="100%"
          height="640px"
          style={{
            border: 'none',
            borderRadius: '8px',
          }}
        ></iframe>
      ) : (
        <p>No dashboard URL found</p>
      )}
    </div>
  );
};

export default Dashboard1Content;
