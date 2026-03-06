import { FaCheck, FaCheckDouble } from 'react-icons/fa';
import { useAuthStore } from '../../store/useAuthStore';
import { formatMessageTime } from '../../utils/helpers';

export const MessageItem = ({ message }) => {
  const { user } = useAuthStore();
  const isSent = message.senderId === user?.id;

  return (
    <div className={`message-item ${isSent ? 'sent' : 'received'}`}>
      <div className="message-content">
        <p>{message.content}</p>
        <div className="message-meta">
          <span>{formatMessageTime(message.createdAt)}</span>
          {isSent && (
            <span className="message-status">
              {message.status === 'READ' ? (
                <FaCheckDouble color="#4caf50" />
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
};
