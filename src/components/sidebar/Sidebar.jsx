import { useState } from 'react';
import { SearchBar } from './SearchBar';
import { UserList } from './UserList';

export const Sidebar = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="w-80 border-r flex flex-col bg-gray-50">
      <div className="p-5 bg-white border-b">
        <h3 className="text-xl font-bold text-gray-800">Chats</h3>
      </div>
      <SearchBar onSearch={setSearch} />
      <UserList search={search} />
    </div>
  );
};
