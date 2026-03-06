import { FaSignOutAlt } from 'react-icons/fa';
import { useLogout } from '../../hooks/mutations/useAuthMutation';
import { useAuthStore } from '../../store/useAuthStore';
import { Avatar } from '../common/Avatar';

export const Header = () => {
  const { user } = useAuthStore();
  const { mutate: logout } = useLogout();

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-blue-500 text-white shadow-md">
      <h1 className="text-2xl font-bold">Chat App</h1>
      <div className="flex items-center gap-3">
        <Avatar name={user?.username} avatar={user?.avatar} size={35} />
        <span className="font-medium">{user?.username}</span>
        <button
          onClick={() => logout()}
          className="p-2 hover:bg-blue-600 rounded-full transition"
        >
          <FaSignOutAlt size={20} />
        </button>
      </div>
    </header>
  );
};
