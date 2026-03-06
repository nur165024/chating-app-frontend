import { useMutation, useQueryClient } from '@tanstack/react-query';
import { conversationAPI } from '../../api/conversation.api';
import { QUERY_KEYS } from '../../utils/constants';

export const useCreateConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: conversationAPI.createConversation,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.CONVERSATIONS]);
    }
  });
};

export const useMarkConversationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: conversationAPI.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.CONVERSATIONS]);
    }
  });
};
