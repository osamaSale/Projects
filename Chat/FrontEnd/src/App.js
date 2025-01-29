import React, { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Signin } from "./components/Signin"
import { Chats } from './components/Chats';
import { Signup } from './components/Signup';
import './App.css';
import { CreateChat } from './components/CreateChat';
import { Support } from './components/Support';
import { PasswordReset } from './components/PasswordReset';
import { Settings } from './components/Settings';
import { Modals } from './components/Modals';
import { NavbarVertical } from './components/NavbarVertical';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from './redux/api/users';
import { PasswordVerify } from './components/PasswordVerify';
import { getMessages } from './redux/api/message';
import { getAllChat } from './redux/api/chat';
import { io } from "socket.io-client";
import { getChatGroup, getChatGroupMessage, getChatGroupUsers } from './redux/api/chatGroup';
import { ChatGroup } from './components/ChatGroup';
function App() {
  const { user } = useSelector((store) => store.data)
  const [onlineUsers, setOnlineUsers] = useState([]);
  const number = 12345
  const dispatch = useDispatch()
  useEffect(() => {
    update()
  }, [])
  const update = () => {
    dispatch(getAllUsers())
    dispatch(getAllChat())
    dispatch(getMessages())
    dispatch(getChatGroup())
    dispatch(getChatGroupUsers())
    dispatch(getChatGroupMessage())
  }
  const socket = useRef()
  useEffect(() => {
   /*  socket.current = io('http://localhost:5000') */
    socket.current = io('https://chat-server-bz17.onrender.com')
    if (user) {
      socket.current.emit("online", user.id)
      socket.current.on("get-users", (user) => {
        setOnlineUsers(user);
      });
    }
  }, [user])

  return (
    <div className="App">
      <ToastContainer />
      <Modals />
      <div className="layout overflow-hidden">
        <NavbarVertical />
        <Routes>
          <Route path='/chat' element={<Chats update={update} onlineUsers={onlineUsers}/>} />
          <Route path='/chatGroup' element={<ChatGroup update={update} onlineUsers={onlineUsers} />} />
          <Route path='/support' element={<Support update={update} onlineUsers={onlineUsers}/>} />
          <Route path='/createChat' element={<CreateChat update={update} onlineUsers={onlineUsers}/>} />
          <Route path='/' element={<Signin update={update} />} />
          <Route path='/signup' element={<Signup update={update} />} />
          <Route path='/passwordReset' element={<PasswordReset update={update} number={number} />} />
          <Route path='/verifyPassword' element={<PasswordVerify update={update} number={number} />} />
          <Route path='/settings' element={<Settings update={update} />} />
        </Routes>
        <Modals />
      </div>
    </div>
  );
}

export default App;
