import React from 'react';

const ItemFilter = ({ filter, setFilter }) => (
  <div className="flex bg-gray-200 rounded-full p-1">
    <button
      onClick={() => setFilter('active')}
      className={`px-4 py-2 rounded-full ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-transparent text-gray-700 hover:bg-gray-300'} transition`}
    >
      Active
    </button>
    <button
      onClick={() => setFilter('archive')}
      className={`px-4 py-2 rounded-full ${filter === 'archive' ? 'bg-blue-500 text-white' : 'bg-transparent text-gray-700 hover:bg-gray-300'} transition`}
    >
      Archived
    </button>
  </div>
);

export default ItemFilter;