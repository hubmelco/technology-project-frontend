import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Login from './pages/Login';
import { User, UserContext } from './context/userContext';
import CreatePost from './pages/Post';


function App() {
  const [user, setUser] = useState<User>();

  return (
    <>
      <UserContext.Provider value={user}>
        <Header/>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser}/>}/>
          <Route path="/post" element={<CreatePost/>}/>
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
