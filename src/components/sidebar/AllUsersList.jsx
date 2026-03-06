import { useCreateConversation } from '../../hooks/mutations/useConversationMutation';
import { useUsers } from '../../hooks/queries/useUserQuery';
import { useChatStore } from '../../store/useChatStore';
import { Loader } from '../common/Loader';

export const AllUsersList = ({ search }) => {
  const { data, isLoading } = useUsers(search);
  const createConversation = useCreateConversation();
  const setActiveConversation = useChatStore(s => s.setActiveConversation);

  const handleUserClick = async (userId) => {
    const conv = await createConversation.mutateAsync({ participantId: userId });
    setActiveConversation(conv.data.conversation);
  };

  const users = data?.data?.users || [];

  return (
    <div className="flex-1 overflow-y-auto">
      {!search ? (
        <p className="text-center p-5 text-gray-500">Search users to start chat</p>
      ) : isLoading ? (
        <Loader />
      ) : users.length === 0 ? (
        <p className="text-center p-5 text-gray-500">No users found</p>
      ) : (
        users.map((user) => (
          <div key={user.id} onClick={() => handleUserClick(user.id)} className="p-4 hover:bg-gray-100 cursor-pointer">
            <p className="font-semibold">{user.username}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        ))
      )}
    </div>
  );
};
