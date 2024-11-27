/** @format */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaRegCircle } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import Header from "../Common/Header";
import Sidebar from "../Common/Sidebar";
import { refreshUserRequests, removeRequest } from "../../slices/requestSlice";
import { deleteRequestById } from "../../service/operations/requestApi";

const HistoryList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetching data from Redux
  const { userRequests, loading } = useSelector((state) => state.request);
  const { token } = useSelector((state) => state.auth);

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

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="p-6 bg-white min-h-screen">
          {/* Header */}
          <div className="text-xl md:text-2xl font-semibold text-gray-700 flex justify-start items-center space-x-2 mb-6">
            <FaRegCircle fontSize={18} />
            <span>Request</span>
          </div>

          {/* Navigation Buttons */}
          <div className="flex space-x-4 items-center mb-6 px-4">
            <button
              className="text-black font-semibold text-lg"
              onClick={() => navigate("/requests")}
            >
              Add New Request
            </button>
            <span className="bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white px-6 py-2 rounded-lg shadow-lg hover:from-[#003876] hover:to-[#005fa1]">
              History Request List
            </span>
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
                    <th className="py-3 px-4">Sr. No</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Priority</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userRequests.map((request, index) => (
                    <tr
                      key={request.id}
                      className="border-b hover:bg-gray-50 text-sm"
                    >
                      <td className="py-3 px-4">{index + 1}</td>
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
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button
                            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700"
                            onClick={() => handleEdit(request.id)}
                          >
                            <FiEdit />
                          </button>
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
        </div>
      </div>
    </div>
  );
};

export default HistoryList;
