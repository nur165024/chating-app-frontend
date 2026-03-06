import { useCallback, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { useChatStore } from '../../store/useChatStore';
import { useSocketStore } from '../../store/useSocketStore';

export const MessageInput = () => {
  const [message, setMessage] = useState('');
  const activeConversation = useChatStore(state => state.activeConversation);
  const socket = useSocketStore(state => state.socket);

  const handleSubmit = useCallback((e) => {
    e.preventDefault(); 
    
    if (!message.trim() || !activeConversation || !socket) {
      console.log('Validation failed');
      return;
    }

    socket.emit('message:send', {
      conversationId: activeConversation.id,
      receiverId: activeConversation.otherParticipant.id,
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
