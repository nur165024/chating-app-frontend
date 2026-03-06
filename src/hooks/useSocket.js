import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';
import { useSocketStore } from '../store/useSocketStore';
import { QUERY_KEYS, SOCKET_URL } from '../utils/constants';

export const useSocket = () => {
  const { socket, setSocket, setConnected } = useSocketStore();
  const { token, user } = useAuthStore();
  const { addOnlineUser, removeOnlineUser, setOnlineUsers } = useChatStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!token || socket) return;

    const newSocket = io(SOCKET_URL, {
      auth: { token }
    });

    newSocket.on('connect', () => {
      setConnected(true);
      console.log('Socket connected');
    });

    newSocket.on('disconnect', () => {
      setConnected(false);
      console.log('Socket disconnected');
    });

    newSocket.on('onlineUsers', (users) => {
      setOnlineUsers(users);
    });

    newSocket.on('userOnline', (userId) => {
      addOnlineUser(userId);
    });

    newSocket.on('userOffline', (userId) => {
      removeOnlineUser(userId);
    });

    newSocket.on('newMessage', () => {
      queryClient.invalidateQueries([QUERY_KEYS.MESSAGES]);
      queryClient.invalidateQueries([QUERY_KEYS.CONVERSATIONS]);
    });

    newSocket.on('messageRead', () => {
      queryClient.invalidateQueries([QUERY_KEYS.MESSAGES]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [token]);

  return socket;
};
