import { create } from 'zustand';

export const useChatStore = create((set) => ({
  activeConversation: null,
  typingUsers: {},
  onlineUsers: [],

  setActiveConversation: (conversation) => 
    set({ activeConversation: conversation }),

  clearActiveConversation: () => 
    set({ activeConversation: null }),

  setTyping: (userId, isTyping) =>
    set((state) => ({
      typingUsers: {
        ...state.typingUsers,
        [userId]: isTyping
      }
    })),

  setOnlineUsers: (users) => 
    set({ onlineUsers: users }),

  addOnlineUser: (userId) =>
    set((state) => ({
      onlineUsers: [...new Set([...state.onlineUsers, userId])]
    })),

  removeOnlineUser: (userId) =>
    set((state) => ({
      onlineUsers: state.onlineUsers.filter(id => id !== userId)
    }))
}));
