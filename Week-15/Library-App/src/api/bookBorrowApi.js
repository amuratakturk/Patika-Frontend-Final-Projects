import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL + '/api/v1/borrows'; // Endpoint URL

// GET
export const getBorrowings = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

// POST
export const addBorrowing = async (borrowingRequest) => {
  const response = await axios.post(BASE_URL, borrowingRequest);
  return response.data;
};

// PUT
export const updateBorrowing = async (id, updateRequest) => {
  const response = await axios.put(`${BASE_URL}/${id}`, updateRequest);
  return response.data;
};

// DELETE
export const deleteBorrowing = async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  };