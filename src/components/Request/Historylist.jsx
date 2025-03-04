/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaRegCircle, FaArrowUp, FaArrowDown, FaBars } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { refreshUserRequests, removeRequest } from "../../slices/requestSlice";
import { deleteRequestById } from "../../service/operations/requestApi";
import Sidebar from "../Common/Sidebar";

// Modal Component
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, requestId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
          Confirm Deletion
        </h2>
        <p className="text-sm md:text-base text-gray-600 mb-6">
          Are you sure you want to delete this request? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200 text-sm md:text-base"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm md:text-base"
            onClick={() => onConfirm(requestId)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const HistoryList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetching data from Redux
  const { userRequests, loading } = useSelector((state) => state.request);
  const { token, user } = useSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "requestDate",
    direction: "desc",
  });
  const requestsPerPage = 5;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [selectedRequestId, setSelectedRequestId] = useState(null); // State to store the request ID for deletion

  // Fetch user-specific requests on mount
  useEffect(() => {
    dispatch(refreshUserRequests());
  }, [dispatch]);

  // Handle edit
  const handleEdit = (id) => {
    navigate(`/historylistedit?id=${id}`);
  };

  // Open modal for delete confirmation
  const openDeleteModal = (id) => {
    setSelectedRequestId(id);
    setIsModalOpen(true);
  };

  // Close modal
  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setSelectedRequestId(null);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async (id) => {
    const success = await deleteRequestById(token, id);
    if (success) {
      dispatch(removeRequest(id)); // Update Redux after deletion
    }
    closeDeleteModal();
  };

  // Search logic
  const filteredRequests = userRequests.filter((request) =>
    [request.description, request.priority, request.completionStatus]
      .map((field) => field?.toLowerCase() || "")
      .some((field) => field.includes(searchQuery.toLowerCase()))
  );

  // Sorting logic
  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const fieldA = a[sortConfig.key] || "";
    const fieldB = b[sortConfig.key] || "";

    if (sortConfig.key === "requestDate") {
      const dateA = new Date(fieldA);
      const dateB = new Date(fieldB);
      if (sortConfig.direction === "asc") {
        return dateA - dateB;
      }
      return dateB - dateA;
    }

    if (sortConfig.direction === "asc") {
      return fieldA.localeCompare(fieldB);
    }
    return fieldB.localeCompare(fieldA);
  });

  const totalPages = Math.ceil(sortedRequests.length / requestsPerPage);
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = sortedRequests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "desc" ? "asc" : "desc",
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navigation Buttons */}
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-start items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <span
              className="bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white px-4 py-1 rounded-lg shadow-lg hover:from-[#003876] hover:to-[#005fa1] text-md md:text-lg"
              onClick={() => navigate("/requests")}
            >
              History Request List
            </span>
            <button
              className="text-black text-md md:text-lg hover:underline"
              onClick={() => navigate("/requestform")}
            >
              Add New Request
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search by Description, Priority, or Status"
                className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {loading ? (
              <p className="text-center text-gray-600 py-6 text-sm md:text-base">
                Loading...
              </p>
            ) : userRequests.length === 0 ? (
              <p className="text-center text-gray-600 py-6 text-sm md:text-base">
                No requests found.
              </p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left text-gray-600 uppercase text-xs md:text-sm border-b bg-blue-100">
                    {[
                      { label: "Sr. No", key: null },
                      { label: "Date", key: "requestDate" },
                      { label: "Priority", key: "priority" },
                      { label: "Description", key: "description" },
                      { label: "Status", key: "completionStatus" },
                      { label: "Action View", key: null },
                    ].map(({ label, key }, index) => (
                      <th
                        key={index}
                        className={`py-3 px-3 md:px-4 ${
                          key ? "cursor-pointer hover:bg-blue-200" : ""
                        }`}
                        onClick={() => key && handleSort(key)}
                      >
                        <div className="flex items-center space-x-2">
                          {label}
                          <span> </span>
                          {key && sortConfig.key === key && (
                            <span className="text-gray-800">
                              {sortConfig.direction === "asc" ? (
                                <FaArrowUp />
                              ) : (
                                <FaArrowDown />
                              )}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentRequests.map((request, index) => (
                    <tr
                      key={request.id}
                      className="border-b hover:bg-gray-50 text-sm md:text-base"
                    >
                      <td className="py-3 px-3 md:px-4 text-gray-800">
                        {indexOfFirstRequest + index + 1}
                      </td>
                      <td className="py-3 px-3 md:px-4 text-gray-800">
                        {new Date(request.requestDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-3 md:px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-white text-xs md:text-sm ${
                            request.priority === "High"
                              ? "bg-red-500"
                              : request.priority === "Medium"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                          }`}
                        >
                          {request.priority}
                        </span>
                      </td>
                      <td className="py-3 px-3 md:px-4 text-gray-800">
                        {request.description}
                      </td>
                      <td className="py-3 px-3 md:px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-white text-xs md:text-sm ${
                            request.completionStatus === "Pending"
                              ? "bg-yellow-500"
                              : request.completionStatus === "In Progress"
                              ? "bg-blue-500"
                              : request.completionStatus === "Not Started"
                              ? "bg-red-500"
                              : "bg-green-500"
                          }`}
                        >
                          {request.completionStatus}
                        </span>
                      </td>
                      <td className="py-3 px-3 md:px-7">
                        <div className="flex space-x-2">
                          <button
                            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
                            onClick={() => handleEdit(request.id)}
                            title="Edit Request"
                          >
                            <FiEdit />
                          </button>
                          <button
                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition-colors duration-200"
                            onClick={() => openDeleteModal(request.id)}
                            title="Delete Request"
                          >
                            <RiDeleteBinLine />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          <div className="flex flex-col md:flex-row justify-between items-center p-4 text-gray-600 text-sm md:text-base">
            <span className="mb-2 md:mb-0">
              Showing {indexOfFirstRequest + 1} to{" "}
              {Math.min(indexOfLastRequest, sortedRequests.length)} of{" "}
              {sortedRequests.length} entries
            </span>
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`px-2 py-1 md:px-3 md:py-1 ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  } rounded transition-colors duration-200 text-sm md:text-base`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
        requestId={selectedRequestId}
      />
    </div>
  );
};

export default HistoryList;