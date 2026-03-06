import { useState } from 'react';
import { AllUsersList } from './AllUsersList';
import { SearchBar } from './SearchBar';
import { UserList } from './UserList';

export const Sidebar = () => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('chats'); // 'chats' or 'users'

  return (
    <div className="w-80 border-r flex flex-col bg-gray-50">
      <div className="p-5 bg-white border-b">
        <h3 className="text-xl font-bold text-gray-800">Chats</h3>
        <div className="flex gap-2 mt-3">
          <button 
            onClick={() => setActiveTab('chats')}
            className={`flex-1 py-2 rounded ${activeTab === 'chats' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Chats
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`flex-1 py-2 rounded ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            New Chat
          </button>
        </div>
      </div>
      <SearchBar onSearch={setSearch} />
      {activeTab === 'chats' ? <UserList /> : <AllUsersList search={search} />}
    </div>
  );
};
