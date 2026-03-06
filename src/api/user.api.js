import axiosInstance from './axios.config';

export const userAPI = {
  getAllUsers: (search = '') => 
    axiosInstance.get('/users', { params: { search } }),
  
  getUserById: (id) => axiosInstance.get(`/users/${id}`),
  
  updateProfile: (data) => axiosInstance.put('/users/profile', data),
  
  updateOnlineStatus: (isOnline) => 
    axiosInstance.patch('/users/online-status', { isOnline })
};

