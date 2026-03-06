import { useEffect, useRef } from 'react';
import { useMessages } from '../../hooks/queries/useMessageQuery';
import { useChatStore } from '../../store/useChatStore';
import { ErrorMessage } from '../common/ErrorMessage';
import { Loader } from '../common/Loader';
import { MessageItem } from './MessageItem';

export const MessageList = () => {
  const { activeConversation } = useChatStore();
  const { data, isLoading, error } = useMessages(activeConversation?.id);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;

  const messages = data?.data || [];

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '20px' }}>No messages yet. Start the conversation!</p>
      ) : (
        messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
