/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegCircle } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import Header from "../Common/Header";
import Sidebar from "../Common/Sidebar";

const HistoryList = () => {
  const navigate = useNavigate();

  const requests = [
    {
      id: 1,
      date: "Nov 11, 2024",
      priority: "Low",
      description: "Maecenas dignissim justo eget nulla rutrum molestie",
      status: "Pending",
    },
    {
      id: 2,
      date: "Nov 14, 2024",
      priority: "Medium",
      description: "Maecenas dignissim justo eget nulla rutrum molestie",
      status: "In-Progress",
    },
    {
      id: 3,
      date: "Nov 15, 2024",
      priority: "Medium",
      description: "Maecenas dignissim justo eget nulla rutrum molestie",
      status: "In-Progress",
    },
    {
      id: 4,
      date: "Nov 12, 2024",
      priority: "High",
      description: "Maecenas dignissim justo eget nulla rutrum molestie",
      status: "Completed",
    },
    {
      id: 5,
      date: "Nov 9, 2024",
      priority: "High",
      description: "Maecenas dignissim justo eget nulla rutrum molestie",
      status: "Completed",
    },
    {
      id: 6,
      date: "Oct 28, 2024",
      priority: "Low",
      description: "Maecenas dignissim justo eget nulla rutrum molestie",
      status: "Pending",
    },
  ];

  const handleEdit = (id) => {
    console.log("Edit request with ID:", id);
    navigate(`/editRequest/${id}`);
  };

  const handleDelete = (id) => {
    console.log("Delete request with ID:", id);
    // Add delete logic here
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
        {/* Add New Request Button */}
        <button className="text-black font-semibold text-lg" onClick={() => navigate("/requests")}>
          Add New Request
        </button>

        {/* Request List Text */}
        <span className="bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white px-6 py-2 rounded-lg shadow-lg hover:from-[#003876] hover:to-[#005fa1]" >History Request List</span>
      </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow overflow-x-auto">
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
                {requests.map((request, index) => (
                  <tr
                    key={request.id}
                    className="border-b hover:bg-gray-50 text-sm"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{request.date}</td>
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
                          request.status === "Pending"
                            ? "bg-yellow-500"
                            : request.status === "In-Progress"
                            ? "bg-blue-500"
                            : "bg-green-500"
                        }`}
                      >
                        {request.status}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryList;
