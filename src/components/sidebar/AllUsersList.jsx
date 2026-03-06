import { useCreateConversation } from '../../hooks/mutations/useConversationMutation';
import { useUsers } from '../../hooks/queries/useUserQuery';
import { useAuthStore } from '../../store/useAuthStore';
import { useChatStore } from '../../store/useChatStore';
import { Loader } from '../common/Loader';

export const AllUsersList = ({ search }) => {
  const { data, isLoading } = useUsers(search);
  const createConversation = useCreateConversation();
  const setActiveConversation = useChatStore(s => s.setActiveConversation);
  const user = useAuthStore(s => s.user);

  const handleUserClick = async (userId) => {
    try {
      const conv = await createConversation.mutateAsync({ participantId: userId });
      const conversation = conv.data?.conversation;
      
      if (conversation) {
        // Format conversation to match expected structure
        const otherParticipant = conversation.participant1Id === user?.id 
          ? conversation.participant2 
          : conversation.participant1;

        const formattedConversation = {
          ...conversation,
          otherParticipant,
          unreadCount: conversation.participant1Id === user?.id 
            ? conversation.unreadCount1 
            : conversation.unreadCount2
        };

        setActiveConversation(formattedConversation);
      }
    } catch (error) {
      console.error('Failed to create conversation:', error);
    }
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
