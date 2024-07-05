import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./components/Home/Home";
import { Route, Routes ,BrowserRouter} from "react-router-dom";
import Adminchat from "./components/chatpage/adminchat";
import Applicantchat from "./components/chatpage/applicantchat";
import Login from "./components/Authentication/Login";
import ChatPage from "./components/chatpage/message";
import UserList from "./components/chatpage/userlist";
import PrivateRoute from "./components/privateroute/Privateroute";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute/>}>
          <Route path="/adminchat" element={<Adminchat />} />
          <Route path="/userchat" element={<Applicantchat />} />
          <Route path="/chat/:userId" element={<ChatPage />} />
          <Route path="/userlist" element={<UserList/>} />
          </Route>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
