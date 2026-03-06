import { FaSignOutAlt } from 'react-icons/fa';
import { useLogout } from '../../hooks/mutations/useAuthMutation';
import { useAuthStore } from '../../store/useAuthStore';
import { Avatar } from '../common/Avatar';

export const Header = () => {
  const { user } = useAuthStore();
  const { mutate: logout } = useLogout();

  return (
    <header className="header">
      <h1>Chat App</h1>
      <div className="header-user">
        <Avatar name={user?.username} avatar={user?.avatar} size={35} />
        <span>{user?.username}</span>
        <button onClick={() => logout()} className="logout-btn">
          <FaSignOutAlt />
        </button>
      </div>
    </header>
  );
};
