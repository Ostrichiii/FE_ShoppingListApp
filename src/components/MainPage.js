import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import data from './data.json';

const MainPage = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const users = [
    { id: 1, name: 'Owner', role: 'owner' },
    { id: 2, name: 'Guest', role: 'guest' },
  ];
  const [shoppingLists, setShoppingLists] = useState(data.shoppingLists || []);
  const [filter, setFilter] = useState('active');
  const [newListName, setNewListName] = useState('');

  const addNewList = () => {
    if (newListName.trim() !== '') {
      const newList = {
        id: shoppingLists.length + 1,
        name: newListName,
        archived: false,
        items: [],
        members: [],
      };
      setShoppingLists([...shoppingLists, newList]);
      setNewListName('');
    }
  };

  const toggleArchive = (id) => {
    setShoppingLists((prevLists) =>
      prevLists.map((list) =>
        list.id === id ? { ...list, archived: !list.archived } : list
      )
    );
  };

  const deleteList = (id) => {
    setShoppingLists((prevLists) => prevLists.filter((list) => list.id !== id));
  };

  const filteredLists = shoppingLists.filter(
    (list) => (filter === 'active' ? !list.archived : list.archived)
  );

  const goToShoppingListDetail = (list) => {
    navigate(`/shopping-list/${list.id}`, { state: { list } });
  };

  return (
    <div className="max-w-4xl w-full mx-auto bg-white p-8 rounded-lg shadow-lg relative">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-800">My Shopping App</h1>
        </div>
        <div className="absolute top-2 right-4">
          <select
            value={currentUser.id}
            onChange={(e) =>
              setCurrentUser(users.find((user) => user.id === parseInt(e.target.value)))
            }
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.role})
              </option>
            ))}
          </select>
        </div>
      </header>
      <div className="flex justify-between items-center mb-6">
        <div className="flex bg-gray-200 rounded-full p-1">
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-full focus:outline-none ${
              filter === 'active'
                ? 'bg-blue-500 text-white'
                : 'bg-transparent text-gray-700 hover:bg-gray-300'
            } transition`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('archive')}
            className={`px-4 py-2 rounded-full focus:outline-none ${
              filter === 'archive'
                ? 'bg-blue-500 text-white'
                : 'bg-transparent text-gray-700 hover:bg-gray-300'
            } transition`}
          >
            Archived
          </button>
        </div>
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="Enter new shopping list name"
          className="p-3 border border-gray-300 rounded-lg shadow-sm w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addNewList}
          className="w-full bg-green-500 text-white px-5 py-2 rounded-lg shadow hover:bg-green-600 transition"
        >
          Add Shopping List
        </button>
      </div>
      <ul>
        {filteredLists.map((list) => (
          <li
            key={list.id}
            className="flex justify-between items-center py-3 border-b border-gray-200"
          >
            <button
              onClick={() => goToShoppingListDetail(list)}
              className="text-lg text-blue-500 hover:underline"
            >
              {list.name}
            </button>
            <div className="flex gap-4">
              <button
                onClick={() => toggleArchive(list.id)}
                className="text-blue-500 hover:underline"
              >
                {list.archived ? 'Unarchive' : 'Archive'}
              </button>
              <button
                onClick={() => deleteList(list.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainPage;