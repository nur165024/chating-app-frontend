import { useQuery } from '@tanstack/react-query';
import { conversationAPI } from '../../api/conversation.api';
import { QUERY_KEYS } from '../../utils/constants';

export const useConversations = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CONVERSATIONS],
    queryFn: conversationAPI.getConversations
  });
};

export const useConversation = (id) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CONVERSATIONS, id],
    queryFn: () => conversationAPI.getConversationById(id),
    enabled: !!id
  });
};
