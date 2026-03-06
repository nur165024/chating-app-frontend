import { useMutation, useQueryClient } from '@tanstack/react-query';
import { messageAPI } from '../../api/message.api';
import { QUERY_KEYS } from '../../utils/constants';

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: messageAPI.sendMessage,
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
