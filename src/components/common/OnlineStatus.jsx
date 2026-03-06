export const OnlineStatus = ({ isOnline }) => {
  return (
    <span className={`inline-block w-2 h-2 rounded-full ml-1 ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
  );
};
