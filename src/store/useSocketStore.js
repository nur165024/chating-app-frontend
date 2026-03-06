import { create } from 'zustand';

export const useSocketStore = create((set) => ({
  socket: null,
  isConnected: false,

  setSocket: (socket) => 
    set({ socket, isConnected: socket?.connected || false }),

  setConnected: (status) => 
    set({ isConnected: status }),

  disconnect: () => set({ socket: null, isConnected: false })

}));
