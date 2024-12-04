/** @format */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaRegCircle } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { refreshUserRequests, removeRequest } from "../../slices/requestSlice";
import { deleteRequestById } from "../../service/operations/requestApi";

const HistoryList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetching data from Redux
  const { userRequests, loading } = useSelector((state) => state.request);
  const { token } = useSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const requestsPerPage = 5;

  // Fetch user-specific requests on mount
  useEffect(() => {
    dispatch(refreshUserRequests());
  }, [dispatch]);

  // Handle edit
  const handleEdit = (id) => {
    navigate(`/historylistedit?id=${id}`);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      const success = await deleteRequestById(token, id);
      if (success) {
        dispatch(removeRequest(id)); // Update Redux after deletion
      }
    }
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

    if (sortConfig.direction === "asc") {
      return fieldA > fieldB ? 1 : -1;
    }
    return fieldA < fieldB ? 1 : -1;
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
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
  
        <div className="p-6 bg-white min-h-screen">
          {/* Header */}
          <div className="text-xl md:text-2xl font-semibold text-gray-700 flex justify-start items-center space-x-2 mb-6">
            <FaRegCircle fontSize={18} />
            <span>Request</span>
          </div>

          {/* Navigation Buttons */}
          <div className="flex space-x-4 items-center mb-6 px-4">

            <span className="bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white px-6 py-2 rounded-lg shadow-lg hover:from-[#003876] hover:to-[#005fa1]">
              History Request List
            </span>

            <button
              className="text-black text-lg"
              onClick={() => navigate("/requestform")}
            >
              Add New Request
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by Description, Priority, or Status"
              className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            {loading ? (
              <p className="text-center text-gray-600 py-6">Loading...</p>
            ) : userRequests.length === 0 ? (
              <p className="text-center text-gray-600 py-6">No requests found.</p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left text-gray-600 uppercase text-xs md:text-sm border-b">
                    {[
                      { label: "Sr. No", key: null },
                      { label: "Date", key: "requestDate" },
                      { label: "Priority", key: "priority" },
                      { label: "Description", key: "description" },
                      { label: "Status", key: "completionStatus" },
                      { label: "Action", key: null },
                    ].map(({ label, key }, index) => (
                      <th
                        key={index}
                        className={`py-3 px-4 ${key ? "cursor-pointer" : ""}`}
                        onClick={() => key && handleSort(key)}
                      >
                        {label}{" "}
                        {key &&
                          sortConfig.key === key &&
                          (sortConfig.direction === "asc" ? "🔼" : "🔽")}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentRequests.map((request, index) => (
                    <tr
                      key={request.id}
                      className="border-b hover:bg-gray-50 text-sm"
                    >
                      <td className="py-3 px-4">{indexOfFirstRequest + index + 1}</td>
                      <td className="py-3 px-4">
                        {new Date(request.requestDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-white text-xs md:text-sm ${
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
                      <td className="py-3 px-4">{request.description}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-white text-xs md:text-sm ${
                            request.completionStatus === "Pending"
                              ? "bg-yellow-500"
                              : request.completionStatus === "In Progress"
                              ? "bg-blue-500"
                              : "bg-green-500"
                          }`}
                        >
                          {request.completionStatus}
                        </span>
                      </td>
                      <td className="py-3 px-7">
                        <div className="flex space-x-2">
                          {/* <button
                            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700"
                            onClick={() => handleEdit(request.id)}
                          >
                            <FiEdit />
                          </button> */}
                          <button
                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-700"
                            onClick={() => handleDelete(request.id)}
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
          <div className="flex flex-wrap justify-between items-center p-4 text-gray-600 text-sm">
            <span>
              Showing {indexOfFirstRequest + 1} to{" "}
              {Math.min(indexOfLastRequest, sortedRequests.length)} of{" "}
              {sortedRequests.length} entries
            </span>
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`px-3 py-1 ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  } rounded`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
    
  );
};

export default HistoryList;
