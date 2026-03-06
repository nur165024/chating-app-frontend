import { useCallback } from 'react';
import { useConversations } from '../../hooks/queries/useConversationQuery';
import { useChatStore } from '../../store/useChatStore';
import { ErrorMessage } from '../common/ErrorMessage';
import { Loader } from '../common/Loader';
import { UserItem } from './UserItem';

export const UserList = () => {
  const { data, isLoading, error } = useConversations();
  const setActiveConversation = useChatStore(state => state.setActiveConversation);

  const handleConversationClick = useCallback((conversation) => {
    setActiveConversation(conversation);
  }, [setActiveConversation]);

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;

  const conversations = data?.data?.conversations || [];

  return (
    <div className="flex-1 overflow-y-auto">
      {conversations.length === 0 ? (
        <p className="text-center p-5 text-gray-500">No conversations yet</p>
      ) : (
        conversations.map((conv) => (
          <UserItem
            key={conv.id}
            conversation={conv}
            onClick={() => handleConversationClick(conv)}
          />
        ))
      )}
    </div>
  );
};
