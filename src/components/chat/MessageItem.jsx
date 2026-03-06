import { memo } from 'react';
import { FaCheck, FaCheckDouble } from 'react-icons/fa';
import { useAuthStore } from '../../store/useAuthStore';
import { formatMessageTime } from '../../utils/helpers';

export const MessageItem = memo(({ message }) => {
  const user = useAuthStore(state => state.user);
  const isSent = message.senderId === user?.id;

  return (
    <div className={`flex mb-4 ${isSent ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[60%] px-4 py-2 rounded-lg ${
          isSent ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 border'
        }`}
      >
        <p className="mb-1">{message.content}</p>
        <div className="flex items-center gap-1 text-xs opacity-80">
          <span>{formatMessageTime(message.createdAt || message.updatedAt)}</span>
          {isSent && (
            <span>
              {message.status === 'READ' ? (
                <FaCheckDouble className="text-green-400" />
              ) : message.status === 'DELIVERED' ? (
                <FaCheckDouble />
              ) : (
                <FaCheck />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.message.id === nextProps.message.id &&
         prevProps.message.status === nextProps.message.status;
});

MessageItem.displayName = 'MessageItem';
