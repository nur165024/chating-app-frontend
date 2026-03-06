import axiosInstance from './axios.config';

export const conversationAPI = {
  getConversations: () => axiosInstance.get('/conversations'),
  
  getConversationById: (id) => axiosInstance.get(`/conversations/${id}`),
  
  createConversation: (data) => 
    axiosInstance.post('/conversations', data),
  
  markAsRead: (conversationId) => 
    axiosInstance.patch(`/conversations/${conversationId}/read`)
};

