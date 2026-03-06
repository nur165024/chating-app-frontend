import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuthStore } from '../store/useAuthStore';
import { useSocketStore } from '../store/useSocketStore';
import { QUERY_KEYS, SOCKET_URL } from '../utils/constants';

export const useSocket = () => {
  const { socket, setSocket, setConnected } = useSocketStore();
  const { token } = useAuthStore();
  const queryClient = useQueryClient();
  const isConnecting = useRef(false);

  useEffect(() => {
    if (!token || socket || isConnecting.current) return;

    isConnecting.current = true;

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

    newSocket.on('message:received', (message) => {
      queryClient.setQueryData([QUERY_KEYS.MESSAGES, message.conversationId], (old) => {
        if (!old) return old;
        const exists = old.data?.messages?.some(m => m.id === message.id);
        if (exists) return old;
        
        return {
          ...old,
          data: {
            ...old.data,
            messages: [...(old.data?.messages || []), message]
          }
        };
      });
      
      queryClient.invalidateQueries([QUERY_KEYS.CONVERSATIONS]);
    });

    newSocket.on('message:sent', (message) => {
      queryClient.invalidateQueries([QUERY_KEYS.MESSAGES, message.conversationId]);
    });

    newSocket.on('message:read', ({ messageId }) => {
      queryClient.invalidateQueries([QUERY_KEYS.MESSAGES]);
    });

    setSocket(newSocket);
    isConnecting.current = false;

    return () => {
      newSocket.disconnect();
      isConnecting.current = false;
    };
  }, [token]);

  return socket;
};
