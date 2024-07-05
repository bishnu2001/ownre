import React from 'react';
import { Link } from 'react-router-dom';
import useSWR from '../../HOOKS/useSWR';

const UserList = () => {
  const { data: user, isValidating } = useSWR('users/getalluser');
  console.log(user, '111');

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  const users = user.data.data.data;

  return (
    <div className="h-screen bg-gray-100">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-blue-500 text-white">
          <h2 className="text-2xl font-semibold">Users</h2>
        </div>
        <div className="p-4">
          {isValidating ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {users.map((user) => (
                <li key={user.id} className="border-b border-gray-200 last:border-b-0">
                  <Link
                    to={`/chat/${user._id}`}
                    className="block px-6 py-4 hover:bg-gray-100 transition duration-300"
                  >
                    <div className="flex items-center">
                      <div className="rounded-full bg-blue-500 text-white flex items-center justify-center h-10 w-10 font-semibold text-lg mr-4">
                        {user.name.charAt(0)}
                      </div>
                      <span className="text-lg">{user.name}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
