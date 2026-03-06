import { useCallback, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { useMessages } from '../../hooks/queries/useMessageQuery';
import { useAuthStore } from '../../store/useAuthStore';
import { useChatStore } from '../../store/useChatStore';
import { useSocketStore } from '../../store/useSocketStore';

export const MessageInput = () => {
  const [message, setMessage] = useState('');
  const activeConversation = useChatStore(state => state.activeConversation);
  const socket = useSocketStore(state => state.socket);
  const user = useAuthStore(state => state.user);
  const { data } = useMessages(activeConversation?.id);

  // Mark as read when input is focused
  const handleFocus = useCallback(() => {
    if (!socket || !user || !data?.data?.messages) return;

    const unreadMessages = data.data.messages.filter(
      msg => msg.receiverId === user.id && !msg.isRead
    );

    unreadMessages.forEach(msg => {
      socket.emit('message:read', { messageId: msg.id });
    });
  }, [socket, user, data]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault(); 
    
    if (!message.trim() || !activeConversation?.otherParticipant || !socket) return;

    // Send message
    socket.emit('message:send', {
      conversationId: activeConversation.id,
      receiverId: activeConversation.otherParticipant?.id,
      content: message.trim()
    });

    setMessage('');
  }, [message, activeConversation, socket]);

  return (
    <form className="flex gap-3 p-4 bg-white border-t" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onFocus={handleFocus}
        className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={!message.trim()}
        className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 disabled:bg-gray-400 transition"
      >
        <FaPaperPlane />
      </button>
    </form>
  );
};
