import { useChatStore } from '../../store/useChatStore';
import { Avatar } from '../common/Avatar';
import { MessageInput } from './MessageInput';
import { MessageList } from './MessageList';

export const ChatBox = () => {
  const { activeConversation, onlineUsers } = useChatStore();

  if (!activeConversation) {
    return (
      <div className="chat-box empty">
        <p>Select a conversation to start chatting</p>
      </div>
    );
  }

  const otherUser = activeConversation.otherUser;
  const isOnline = onlineUsers.includes(otherUser?.id);

  return (
    <div className="chat-box">
      <div className="chat-header">
        <Avatar name={otherUser?.username} avatar={otherUser?.avatar} online={isOnline} />
        <div className="chat-user-info">
          <h3>{otherUser?.username}</h3>
          <span>{isOnline ? 'Online' : 'Offline'}</span>
        </div>
      </div>
      <MessageList />
      <MessageInput />
    </div>
  );
};
