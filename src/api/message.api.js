import axiosInstance from './axios.config';

export const messageAPI = {
  getMessages: (conversationId, page = 1, limit = 50) => 
    axiosInstance.get(`/messages/${conversationId}`, { 
      params: { page, limit } 
    }),
  
  sendMessage: (data) => axiosInstance.post('/messages', data),
  
  markAsRead: (messageId) => 
    axiosInstance.patch(`/messages/${messageId}/read`),
  
  deleteMessage: (messageId) => 
    axiosInstance.delete(`/messages/${messageId}`)
};
