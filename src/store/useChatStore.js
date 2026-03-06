import { create } from 'zustand';

export const useChatStore = create((set) => ({
  activeConversation: null,
  typingUsers: {},

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
    }))
}));
