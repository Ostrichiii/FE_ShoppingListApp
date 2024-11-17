import React from 'react';

const Header = ({ title, currentUser, setCurrentUser, users }) => (
  <header className="flex justify-between items-center mb-6">
    <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
    <select
      value={currentUser.id}
      onChange={(e) => setCurrentUser(users.find(user => user.id === parseInt(e.target.value)))}
      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {users.map(user => (
        <option key={user.id} value={user.id}>
          {user.name} ({user.role})
        </option>
      ))}
    </select>
  </header>
);

export default Header;