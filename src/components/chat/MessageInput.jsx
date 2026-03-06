import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { useSendMessage } from '../../hooks/mutations/useMessageMutation';
import { useChatStore } from '../../store/useChatStore';

export const MessageInput = () => {
  const [message, setMessage] = useState('');
  const { activeConversation } = useChatStore();
  const { mutate: sendMessage, isPending } = useSendMessage();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() || !activeConversation) return;

    sendMessage({
      conversationId: activeConversation.id,
      receiverId: activeConversation.otherUser.id,
      content: message.trim()
    });

    setMessage('');
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={isPending}
      />
      <button type="submit" disabled={isPending || !message.trim()}>
        <FaPaperPlane />
      </button>
    </form>
  );
};
