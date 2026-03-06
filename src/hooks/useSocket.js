import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuthStore } from '../store/useAuthStore';
import { useSocketStore } from '../store/useSocketStore';
import { QUERY_KEYS, SOCKET_URL } from '../utils/constants';

export const useSocket = () => {
  const { socket, setSocket, setConnected } = useSocketStore();
  const { token } = useAuthStore();
  const queryClient = useQueryClient();
  const isInitialized = useRef(false);

  const handleMessageReceived = useCallback((message) => {
    queryClient.invalidateQueries({ 
      queryKey: [QUERY_KEYS.MESSAGES, message.conversationId],
      exact: false
    });
    queryClient.invalidateQueries({ 
      queryKey: [QUERY_KEYS.CONVERSATIONS], 
      exact: false 
    });
  }, [queryClient]);

  const handleMessageSent = useCallback((message) => {
    queryClient.invalidateQueries({ 
      queryKey: [QUERY_KEYS.MESSAGES, message.conversationId],
      exact: false
    });
    queryClient.invalidateQueries({ 
      queryKey: [QUERY_KEYS.CONVERSATIONS], 
      exact: false 
    });
  }, [queryClient]);

  const handleMessageRead = useCallback(({ messageId, conversationId }) => {
    // Update message status and conversation unread count
    queryClient.invalidateQueries({ 
      queryKey: [QUERY_KEYS.MESSAGES],
      exact: false
    });
    queryClient.invalidateQueries({ 
      queryKey: [QUERY_KEYS.CONVERSATIONS], 
      exact: false 
    });
  }, [queryClient]);

  useEffect(() => {
    if (!token || isInitialized.current) return;

    isInitialized.current = true;

    const newSocket = io(SOCKET_URL, {
      auth: { token }
    });

    newSocket.on('connect', () => {
      setConnected(true);
      console.log('✅ Socket connected');
    });

    newSocket.on('disconnect', () => {
      setConnected(false);
      console.log('❌ Socket disconnected');
    });

    newSocket.on('message:received', handleMessageReceived);
    newSocket.on('message:sent', handleMessageSent);
    newSocket.on('message:read', handleMessageRead);

    setSocket(newSocket);

    return () => {
      isInitialized.current = false;
      newSocket.off('connect');
      newSocket.off('disconnect');
      newSocket.off('message:received');
      newSocket.off('message:sent');
      newSocket.off('message:read');
      newSocket.disconnect();
    };
  }, [token, setSocket, setConnected, handleMessageReceived, handleMessageSent, handleMessageRead]);

  return socket;
};
