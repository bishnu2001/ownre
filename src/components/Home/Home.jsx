import React, { useState } from 'react';
import Login from '../Authentication/Login';
import Signup from '../Authentication/Signup';

const Home = () => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(prevState => !prevState);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">{showLogin ? 'Sign in to your account' : 'Create a new account'}</h2>
        {showLogin ? (
          <Login />
        ) : (
          <Signup />
        )}
        <button
          type="button"
          onClick={toggleForm}
          className="mt-4 w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {showLogin ? 'Create new account' : 'Sign in with existing account'}
        </button>
      </div>
    </div>
  );
};

export default Home;
