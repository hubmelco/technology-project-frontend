import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import { User, UserContext } from './context/userContext';


function App() {
  const [user, setUser] = useState<User>();

  return (
    <>
      <UserContext.Provider value={user}>
        <Header/>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser}/>}/>
          <Route path="/register" element={<Register setUser={setUser}/>}/>
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
