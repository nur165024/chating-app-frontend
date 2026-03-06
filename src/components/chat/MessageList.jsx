import { memo, useEffect, useRef } from 'react';
import { useMarkMessagesAsRead } from '../../hooks/mutations/useMessageMutation';
import { useMessages } from '../../hooks/queries/useMessageQuery';
import { useAuthStore } from '../../store/useAuthStore';
import { useChatStore } from '../../store/useChatStore';
import { ErrorMessage } from '../common/ErrorMessage';
import { Loader } from '../common/Loader';
import { MessageItem } from './MessageItem';

export const MessageList = memo(() => {
  const activeConversation = useChatStore(state => state.activeConversation);
  const user = useAuthStore(state => state.user);
  const { data, isLoading, error } = useMessages(activeConversation?.id);
  const markAsRead = useMarkMessagesAsRead();
  const messagesEndRef = useRef(null);
  const hasMarked = useRef(false);

  useEffect(() => {
    if (data?.data?.messages?.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      
      // Mark as read only once per conversation
      if (!hasMarked.current && activeConversation) {
        const unreadIds = data.data.messages
          .filter(msg => msg.receiverId === user?.id && !msg.isRead)
          .map(msg => msg.id);
        
        if (unreadIds.length > 0) {
          markAsRead.mutate(unreadIds);
          hasMarked.current = true;
        }
      }
    }
  }, [data?.data?.messages?.length, activeConversation?.id]);

  // Reset when conversation changes
  useEffect(() => {
    hasMarked.current = false;
  }, [activeConversation?.id]);

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;

  const messages = data?.data?.messages || [];

  return (
    <div className="flex-1 overflow-y-auto p-5 bg-gray-50">
      {messages.length === 0 ? (
        <p className="text-center p-5 text-gray-500">No messages yet. Start the conversation!</p>
      ) : (
        messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
});

MessageList.displayName = 'MessageList';
