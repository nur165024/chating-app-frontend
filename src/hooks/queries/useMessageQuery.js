import { useQuery } from '@tanstack/react-query';
import { messageAPI } from '../../api/message.api';
import { QUERY_KEYS } from '../../utils/constants';

export const useMessages = (conversationId, page = 1) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MESSAGES, conversationId, page],
    queryFn: () => messageAPI.getMessages(conversationId, page),
    enabled: !!conversationId
  });
};
