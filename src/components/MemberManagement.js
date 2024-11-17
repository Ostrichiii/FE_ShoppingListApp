import React, { useState } from 'react';

const MemberManagement = ({ members, addMember, removeMember, currentUser }) => {
  const [newMember, setNewMember] = useState('');

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-medium mb-4">Members:</h2>
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
            onClick={() => {
              addMember(newMember);
              setNewMember('');
            }}
            className="bg-blue-500 text-white px-4 sm:px-5 py-2 sm:py-3 rounded-lg shadow hover:bg-blue-600 transition w-full sm:w-48"
          >
            + New Member
          </button>
        </div>
      )}
      <ul className="divide-y divide-gray-200">
        {members.map((member, index) => (
          <li key={index} className="flex justify-between items-center py-2 sm:py-3">
            <span className="text-gray-800">{member}</span>
            {currentUser.role === 'owner' && (
              <button onClick={() => removeMember(member)} className="text-red-500 hover:underline hover:text-red-600 transition text-sm sm:text-base">Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberManagement;