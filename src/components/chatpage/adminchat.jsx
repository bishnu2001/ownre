// Import React and necessary hooks
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router
import UserList from './userlist';
import{ SignoutuserSuccess} from "../../redux/user/useSlice";
import { useDispatch,useSelector } from "react-redux";

// Define the component
const Adminchat = () => {
  const navigate= useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
const dispatch=useDispatch()
  // Function to handle sending a new message
  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, newMessage]);
      setNewMessage('');
    }
  };
  const handleLogout = () => {
    dispatch(SignoutuserSuccess()); // Dispatch Redux action for logout
    localStorage.removeItem('token'); // Clear token from localStorage
    navigate('/login'); // Redirect to login page after logout
  };
  // Navigate to chat page function
  const goToChatPage = () => {
    navigate('/userlist');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* <UserList/> */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl mb-4 text-center">Admin Chat</h1>
        <div className="mb-4">
          <button
            onClick={goToChatPage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go to Chat Page
          </button>
        </div>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

// Export the component
export default Adminchat;
