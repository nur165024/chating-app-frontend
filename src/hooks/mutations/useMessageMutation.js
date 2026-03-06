import { useMutation, useQueryClient } from '@tanstack/react-query';
import { messageAPI } from '../../api/message.api';
import { useAuthStore } from '../../store/useAuthStore';
import { useSocketStore } from '../../store/useSocketStore';
import { QUERY_KEYS } from '../../utils/constants';

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: messageAPI.sendMessage,
    onMutate: async (newMessage) => {
      await queryClient.cancelQueries([QUERY_KEYS.MESSAGES, newMessage.conversationId]);
      const previousMessages = queryClient.getQueryData([QUERY_KEYS.MESSAGES, newMessage.conversationId]);

      queryClient.setQueryData([QUERY_KEYS.MESSAGES, newMessage.conversationId], (old) => {
        if (!old) return old;
        return {
          ...old,
          data: {
            ...old.data,
            messages: [...(old.data?.messages || []), {
              id: 'temp-' + Date.now(),
              content: newMessage.content,
              senderId: user?.id,
              sender: {
                id: user?.id,
                username: user?.username,
                avatar: user?.avatar
              },
              createdAt: new Date().toISOString(),
              isRead: false,
              status: 'SENDING'
            }]
          }
        };
      });

      return { previousMessages };
    },
    onError: (err, newMessage, context) => {
      queryClient.setQueryData([QUERY_KEYS.MESSAGES, newMessage.conversationId], context.previousMessages);
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries([QUERY_KEYS.MESSAGES, variables.conversationId]);
      queryClient.invalidateQueries([QUERY_KEYS.CONVERSATIONS]);
    }
  });
};

export const useMarkMessagesAsRead = () => {
  const queryClient = useQueryClient();
  const socket = useSocketStore(state => state.socket);

  return useMutation({
    mutationFn: (messageIds) => {
      messageIds.forEach(id => {
        socket?.emit('message:read', { messageId: id });
      });
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.MESSAGES]);
      queryClient.invalidateQueries([QUERY_KEYS.CONVERSATIONS]);
    }
  });
};

export const useMarkMessageAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: messageAPI.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.MESSAGES]);
    }
  });
};

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: messageAPI.deleteMessage,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.MESSAGES]);
    }
  });
};
