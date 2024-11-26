/** @format */

import { useForm } from "react-hook-form";
import { FaRegCircle } from "react-icons/fa";
import { createRequest } from "../../service/operations/requestApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RequestForm = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await createRequest(token, data);
      if (response) {
        reset();
        navigate("/historylist"); // Navigate to Request List after submission
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-white min-h-screen">
      {/* Page Header */}
      <div className="text-xl md:text-2xl font-semibold text-gray-700 flex justify-start items-center space-x-2 mb-10">
        <FaRegCircle fontSize={18} />
        <span>Request</span>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 items-center mb-6 px-4">
        {/* Add New Request Button */}
        <button className="bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white px-6 py-2 rounded-lg shadow-lg hover:from-[#003876] hover:to-[#005fa1]">
          Add New Request
        </button>

        {/* Request List Text */}
        <span className="text-black font-semibold text-lg" onClick={() => navigate("/historylist")}>
		History Request List</span>
      </div>

      {/* Form Container */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Request Form
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Description */}
          <div>
            <label className="block text-gray-600 mb-2">Description</label>
            <input
              type="text"
              placeholder="Enter description"
              {...register("description", {
                required: "Description is required",
              })}
              className={`w-full px-4 py-2 border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 ${
                errors.description
                  ? "focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Type */}
          <div>
            <label className="block text-gray-600 mb-2">Type</label>
            <select
              {...register("type", { required: "Type is required" })}
              className={`w-full px-4 py-2 border ${
                errors.type ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 ${
                errors.type ? "focus:ring-red-500" : "focus:ring-blue-500"
              }`}
            >
              <option value="">Select type</option>
              <option value="type1">Dashboard Request</option>
              <option value="type2">User Feedback</option>
              <option value="type3">Connection Request</option>
              <option value="type4">Feature Request</option>
              <option value="type5">Bug Report</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>

          {/* Requestor Name */}
          <div>
            <label className="block text-gray-600 mb-2">
              Name of Requestor
            </label>
            <input
              type="text"
              placeholder="Enter Requestor Name"
              {...register("requestorName", {
                required: "Name of Requestor is required",
              })}
              className={`w-full px-4 py-2 border ${
                errors.requestorName ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 ${
                errors.requestorName
                  ? "focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors.requestorName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.requestorName.message}
              </p>
            )}
          </div>

          {/* Request Date */}
          <div>
            <label className="block text-gray-600 mb-2">Request Date</label>
            <input
              type="date"
              {...register("requestDate", {
                required: "Request Date is required",
              })}
              className={`w-full px-4 py-2 border ${
                errors.requestDate ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 ${
                errors.requestDate
                  ? "focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors.requestDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.requestDate.message}
              </p>
            )}
          </div>

          {/* Priority */}
          <div>
            <label className="block text-gray-600 mb-2">Priority</label>
            <select
              {...register("priority", { required: "Priority is required" })}
              className={`w-full px-4 py-2 border ${
                errors.priority ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 ${
                errors.priority ? "focus:ring-red-500" : "focus:ring-blue-500"
              }`}
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            {errors.priority && (
              <p className="text-red-500 text-sm mt-1">
                {errors.priority.message}
              </p>
            )}
          </div>

          {/* Communication Method */}
          <div>
            <label className="block text-gray-600 mb-2">
              Communication Method
            </label>
            <select
              {...register("communicationMethod", {
                required: "Communication Method is required",
              })}
              className={`w-full px-4 py-2 border ${
                errors.communicationMethod
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 ${
                errors.communicationMethod
                  ? "focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            >
              <option value="">Select Method</option>
              <option value="Email">Email</option>
              <option value="Phone">Phone</option>
              <option value="InPerson">In-Person</option>
            </select>
            {errors.communicationMethod && (
              <p className="text-red-500 text-sm mt-1">
                {errors.communicationMethod.message}
              </p>
            )}
          </div>

          {/* Completion Status */}
          <div>
            <label className="block text-gray-600 mb-2">
              Completion Status
            </label>
            <select
              {...register("completionStatus", {
                required: "Completion Status is required",
              })}
              className={`w-full px-4 py-2 border ${
                errors.completionStatus ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 ${
                errors.completionStatus
                  ? "focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            >
              <option value="">Select Status</option>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            {errors.completionStatus && (
              <p className="text-red-500 text-sm mt-1">
                {errors.completionStatus.message}
              </p>
            )}
          </div>

          {/* File Attachment */}
          <div>
            <label className="block text-gray-600 mb-2">Attach File</label>
            <input
              type="file"
              {...register("attachment")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-3 flex justify-center mt-6">
            <button
              type="submit"
              className="w-52 bg-gradient-to-r from-[#00449B] to-[#0071D3] text-white px-6 py-2 rounded-lg hover:from-[#003876] hover:to-[#005fa1]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;
