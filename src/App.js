import React, { useEffect, useState } from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';

// import the bootstrap styles from node_modules folder
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { auth } from './firebase/firebase';

import './App.css';

// import page components
import ChatsPage from './components/chats/ChatsPage';
import RegisterPage from './components/auth/RegisterPage';
import LoginPage from './components/auth/LoginPage';
import Navbar from './components/common/Navbar';
import RequireAuth from './components/common/RequireAuth';
import Spinner from './components/common/Spinner';

export default function App() {

  const [user, setUser] = useState(null);
  const [isUserSet, setIsUserSet] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsUserSet(true);
    });

    return () => unsub();
  }, []);

  return (
    <BrowserRouter>
      <Navbar user={user} />
      {
        isUserSet ?
          <Routes>
            <Route path="/" element={
              <RequireAuth user={user}>
                <ChatsPage user={user} />
              </RequireAuth>
            } />

            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          :
          <div className='text-center m-4'>
            <Spinner />
          </div>
      }

    </BrowserRouter>
  )
}
