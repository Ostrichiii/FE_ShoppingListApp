import React from 'react';

const ShoppingListItem = ({ list, onDetail, onArchive, onDelete }) => (
  <li className="flex justify-between items-center py-3 border-b border-gray-200">
    <button onClick={onDetail} className="text-lg text-blue-500 hover:underline">{list.name}</button>
    <div className="flex gap-4">
      <button onClick={onArchive} className="text-blue-500 hover:underline">
        {list.archived ? 'Unarchive' : 'Archive'}
      </button>
      <button onClick={onDelete} className="text-red-500 hover:underline">Delete</button>
    </div>
  </li>
);

export default ShoppingListItem;