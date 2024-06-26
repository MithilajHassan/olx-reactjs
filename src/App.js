import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import { authContext, firebaseContext } from './store/Context';
import { onAuthStateChanged } from 'firebase/auth';
import Post from './store/PostContext';
import './App.css';
/**
 * =====Import Components=====
 */
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create'
import ViewPost from './Pages/ViewPost'



function App() {
  const {setUser} = useContext(authContext)
  const {auth} = useContext(firebaseContext)
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      setUser(user)
    })
  })
  return (
    <div>
      <Post>
      <Router>
        <Routes>
        <Route exact path="/" element={<Home />}/> 
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/create" element={<Create />}/> 
        <Route path="/viewpost" element={<ViewPost />}/> 
        </Routes>
      </Router>
      </Post>
    </div>
  );
}

export default App;
