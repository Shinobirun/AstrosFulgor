import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Cambia según tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Obtener todos los usuarios
export const getAllUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await API.get('/users', config);
  return data;
};

// Desactivar usuario
export const deactivateUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await API.put(`/users/${userId}/deactivate`, {}, config);
  return data;
};

export default { getAllUsers, deactivateUser };
