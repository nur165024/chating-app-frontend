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
    <form className="flex gap-3 p-4 bg-white border-t" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={isPending}
        className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={isPending || !message.trim()}
        className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 disabled:bg-gray-400 transition"
      >
        <FaPaperPlane />
      </button>
    </form>
  );
};
