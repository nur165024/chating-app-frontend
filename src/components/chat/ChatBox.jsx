import { useChatStore } from '../../store/useChatStore';
import { Avatar } from '../common/Avatar';
import { MessageInput } from './MessageInput';
import { MessageList } from './MessageList';

export const ChatBox = () => {
  const { activeConversation, onlineUsers } = useChatStore();

  if (!activeConversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">Select a conversation to start chatting</p>
      </div>
    );
  }

  const otherUser = activeConversation.otherUser;
  const isOnline = onlineUsers.includes(otherUser?.id);

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center gap-3 p-4 bg-white border-b">
        <Avatar name={otherUser?.username} avatar={otherUser?.avatar} online={isOnline} />
        <div>
          <h3 className="font-semibold text-gray-800">{otherUser?.username}</h3>
          <span className={`text-sm ${isOnline ? 'text-green-500' : 'text-gray-500'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>
      <MessageList />
      <MessageInput />
    </div>
  );
};
