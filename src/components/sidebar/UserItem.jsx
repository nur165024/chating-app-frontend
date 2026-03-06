import { formatMessageTime } from '../../utils/helpers';
import { Avatar } from '../common/Avatar';

export const UserItem = ({ conversation, onClick }) => {
  const otherUser = conversation.otherParticipant;
  const isOnline = otherUser?.isOnline;

  return (
    <div
      className="flex items-center gap-3 p-4 cursor-pointer bg-white border-b hover:bg-gray-50 transition"
      onClick={onClick}
    >
      <Avatar name={otherUser?.username} avatar={otherUser?.avatar} online={isOnline} />
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-800">{otherUser?.username}</h4>
        <p className="text-sm text-gray-600 truncate">
          {conversation.lastMessage?.content || 'No messages yet'}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="text-xs text-gray-500">{formatMessageTime(conversation.updatedAt)}</span>
        {conversation.unreadCount > 0 && (
          <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
            {conversation.unreadCount}
          </span>
        )}
      </div>
    </div>
  );
};
