import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Page Not Found</p>
      <Link to="/chat" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        Go to Chat
      </Link>
    </div>
  );
};
