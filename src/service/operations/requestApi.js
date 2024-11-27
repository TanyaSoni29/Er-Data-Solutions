/** @format */

import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { requestEndpoints } from "../api";

const {
  GET_ALL_REQUEST,
  GET_REQUESTS_BY_USER,
  GET_REQUEST_BY_ID,
  UPDATE_REQUEST,
  DELETE_REQUEST,
} = requestEndpoints;

// Create a new request
export const createRequest = async (token, data) => {
  try {
    const response = await apiConnector("POST", GET_ALL_REQUEST, data, {
      Authorization: `Bearer ${token}`, // Authorization header
    });

    console.log("Create New Request API Response:", response.data);
    if (response.status !== 201) throw new Error("Could not create request");

    toast.success("Request created successfully");
    return response.data;
  } catch (error) {
    console.log("Create Request API Error", error);
    const errorMessage = error.response?.data?.errors || "An error occurred";
    toast.error(errorMessage);
  }
};

// Get all requests (admin/debugging use)
export const getAllRequest = async (token) => {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_REQUEST, null, {
      Authorization: `Bearer ${token}`, // Authorization header
    });
    console.log("Get All Requests API Response:", response);
    if (response.status !== 200) throw new Error("Could not fetch requests");
    result = response.data;
  } catch (error) {
    console.log("Get All Requests API Error", error);
    if (error.response?.status !== 404) {
      const errorMessage = error.response?.data?.error;
      toast.error(errorMessage);
    }
  }
  return result;
};

// Get all requests for a specific user
export const getUserRequests = async (token, userId) => {
  try {
    const response = await apiConnector(
      "GET",
      GET_REQUESTS_BY_USER(userId),
      null,
      {
        Authorization: `Bearer ${token}`, // Authorization header
      }
    );
    console.log("Get User Requests API Response:", response);
    if (response.status !== 200) throw new Error("Could not fetch user requests");
    return response.data;
  } catch (error) {
    console.log("Get User Requests API Error", error);
    const errorMessage = error.response?.data?.error || "An error occurred";
    toast.error(errorMessage);
  }
};

// Get request details by ID
export const getRequestById = async (token, id) => {
  try {
    const response = await apiConnector("GET", GET_REQUEST_BY_ID(id), null, {
      Authorization: `Bearer ${token}`, // Authorization header
    });
    console.log("Get Request by ID API Response:", response);
    if (response.status !== 200) throw new Error("Could not fetch request");
    return response.data;
  } catch (error) {
    console.log("Get Request by ID API Error", error);
    if (error.response?.status !== 404) {
      const errorMessage = error.response?.data?.error;
      toast.error(errorMessage);
    }
  }
};

// Update a request by ID
export const updateRequest = async (token, requestId, data) => {
  try {
    const response = await apiConnector("PUT", UPDATE_REQUEST(requestId), data, {
      Authorization: `Bearer ${token}`, // Authorization header
      "Content-Type": "application/json", // Ensure JSON format
    });

    console.log("Update Request API Response:", response.data);
    if (response.status !== 200) throw new Error("Could not update request");

    toast.success("Request updated successfully");
    return response.data;
  } catch (error) {
    console.log("Update Request API Error", error);
    const errorMessage = error.response?.data?.errors || "An error occurred";
    toast.error(errorMessage);
  }
};

// Delete a request by ID
export const deleteRequestById = async (token, requestId) => {
  try {
    const response = await apiConnector(
      "DELETE",
      DELETE_REQUEST(requestId),
      null,
      {
        Authorization: `Bearer ${token}`, // Authorization header
      }
    );
    console.log("Delete Request API Response:", response);
    if (response.status !== 200) throw new Error("Could not delete request");
    toast.success("Request deleted successfully");
    return true;
  } catch (error) {
    console.log("Delete Request API Error", error);
    const errorMessage = error.response?.data?.error || "An error occurred";
    toast.error(errorMessage);
    return false;
  }
};
