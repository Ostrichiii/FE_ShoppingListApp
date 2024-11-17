import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ShoppingListDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const users = [
    { id: 1, name: 'Owner', role: 'owner' },
    { id: 2, name: 'Guest', role: 'guest' },
  ];
  const defaultList = {
    name: 'Default Shopping List',
    items: [
      { id: 1, name: 'Default Item 1', resolved: false },
      { id: 2, name: 'Default Item 2', resolved: false },
      { id: 3, name: 'Default Item 3', resolved: true },
    ],
    members: ['Member 1', 'Member 2', 'Member 3'],
  };
  const defaultUser = users[0];

  const { list = defaultList, passedUser = defaultUser } = location.state || {};
  const [currentUser, setCurrentUser] = useState(passedUser);
  const [listName, setListName] = useState(list.name);
  const [newItem, setNewItem] = useState('');
  const [newMember, setNewMember] = useState('');
  const [items, setItems] = useState(list?.items || []);
  const [members, setMembers] = useState(list?.members || []);
  const [filter, setFilter] = useState('active');

  const handleListNameChange = (e) => {
    if (currentUser.role === 'owner') {
      setListName(e.target.value);
    }
  };

  const addItem = () => {
    if (newItem) {
      setItems([...items, { id: items.length + 1, name: newItem, resolved: false }]);
      setNewItem('');
    }
  };

  const addMember = () => {
    if (currentUser.role === 'owner' && newMember) {
      setMembers([...members, newMember]);
      setNewMember('');
    }
  };

  const removeItem = (id) => {
    if (currentUser.role === 'owner') {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const removeMember = (member) => {
    if (currentUser.role === 'owner') {
      setMembers(members.filter((m) => m !== member));
    }
  };

  const toggleResolved = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, resolved: !item.resolved } : item
      )
    );
  };

  const leaveList = () => {
    navigate('/');
  };

  const filteredItems = items.filter(
    (item) => (filter === 'active' ? !item.resolved : item.resolved)
  );

  return (
    <div className="max-w-4xl w-full mx-auto bg-white p-4 sm:p-8 rounded-lg shadow-lg">
      <header className="flex items-center justify-between mb-6 border-b pb-4 relative">
        <button
          onClick={() => navigate('/')}
          className="text-xl sm:text-2xl text-gray-700 hover:text-gray-900 transition absolute left-0"
        >
          ←
        </button>
        <h1 className="text-lg sm:text-3xl font-semibold text-gray-800 mx-auto">
          {currentUser.role === 'owner' ? (
            <input
              type="text"
              value={listName}
              onChange={handleListNameChange}
              className="border-b border-gray-300 focus:outline-none focus:border-blue-500"
            />
          ) : (
            listName
          )}
        </h1>
        <div className="absolute top-2 right-4">
          <select
            value={currentUser.id}
            onChange={(e) =>
              setCurrentUser(users.find((user) => user.id === parseInt(e.target.value)))
            }
            className="p-1 sm:p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.role})
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-medium mb-2 sm:mb-0">Items:</h2>
          <div className="flex bg-gray-200 rounded-full p-1">
            <button
              onClick={() => setFilter('active')}
              className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full focus:outline-none ${
                filter === 'active'
                  ? 'bg-blue-500 text-white'
                  : 'bg-transparent text-gray-700 hover:bg-gray-300'
              } transition`}
            >
              Active Items
            </button>
            <button
              onClick={() => setFilter('archive')}
              className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full focus:outline-none ${
                filter === 'archive'
                  ? 'bg-blue-500 text-white'
                  : 'bg-transparent text-gray-700 hover:bg-gray-300'
              } transition`}
            >
              Archived Items
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="New item"
            className="flex-grow p-2 sm:p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addItem}
            className="bg-green-500 text-white px-4 sm:px-5 py-2 sm:py-3 rounded-lg shadow hover:bg-green-600 transition w-full sm:w-48"
          >
            + New Item
          </button>
        </div>
        <ul className="divide-y divide-gray-200">
          {filteredItems.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center py-2 sm:py-3"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={item.resolved}
                  onChange={() => toggleResolved(item.id)}
                  className="form-checkbox h-4 w-4 sm:h-5 sm:w-5 text-blue-600"
                />
                <span
                  className={`${
                    item.resolved ? 'line-through text-gray-500' : 'text-gray-800'
                  }`}
                >
                  {item.name}
                </span>
              </div>
              {currentUser.role === 'owner' && (
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:underline hover:text-red-600 transition text-sm sm:text-base"
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-medium">Members:</h2>
        {currentUser.role === 'guest' && (
          <button
            onClick={leaveList}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition text-sm sm:text-base"
          >
            Leave List
          </button>
        )}
      </div>
      {currentUser.role === 'owner' && (
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
          <input
            type="text"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
            placeholder="New member"
            className="flex-grow p-2 sm:p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addMember}
            className="bg-blue-500 text-white px-4 sm:px-5 py-2 sm:py-3 rounded-lg shadow hover:bg-blue-600 transition w-full sm:w-48"
          >
            + New Member
          </button>
        </div>
      )}
      <ul className="divide-y divide-gray-200">
        {members.map((member, index) => (
          <li
            key={index}
            className="flex justify-between items-center py-2 sm:py-3"
          >
            <span className="text-gray-800">{member}</span>
            {currentUser.role === 'owner' && (
              <button
                onClick={() => removeMember(member)}
                className="text-red-500 hover:underline hover:text-red-600 transition text-sm sm:text-base"
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingListDetail;