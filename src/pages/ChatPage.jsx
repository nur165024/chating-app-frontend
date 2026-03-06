import { ChatBox } from '../components/chat/ChatBox';
import { Layout } from '../components/layout/Layout';
import { Sidebar } from '../components/sidebar/Sidebar';
import { useSocket } from '../hooks/useSocket';

export const ChatPage = () => {
  useSocket();

  return (
    <Layout>
      <div className="flex h-full">
        <Sidebar />
        <ChatBox />
      </div>
    </Layout>
  );
};
