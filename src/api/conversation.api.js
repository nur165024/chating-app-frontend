import axiosInstance from './axios.config';

export const conversationAPI = {
  getConversations: () => axiosInstance.get('/conversations'),
  
  getConversationById: (id) => axiosInstance.get(`/conversations/${id}`),
  
  createConversation: (participantId) => 
    axiosInstance.post('/conversations', { participantId }),
  
  markAsRead: (conversationId) => 
    axiosInstance.patch(`/conversations/${conversationId}/read`)
};
