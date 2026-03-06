import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useChatStore = create(
  devtools(
    (set) => ({
      activeConversation: null,
      
      setActiveConversation: (conversation) => 
        set({ activeConversation: conversation }, false, 'setActiveConversation'),

      clearActiveConversation: () => 
        set({ activeConversation: null }, false, 'clearActiveConversation')
    }),
    { name: 'ChatStore' }
  )
);
