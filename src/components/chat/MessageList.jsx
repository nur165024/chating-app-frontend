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

  const messages = data?.data?.messages  || [];

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
};
