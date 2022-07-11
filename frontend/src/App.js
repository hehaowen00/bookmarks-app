import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Protected from './components/Protected';

import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';

import Collection from './pages/Collection';
import NewCollection from './pages/NewCollection';

import NewBookmark from './pages/NewBookmark';

import Settings from './pages/Settings';

import { AuthProvider } from './context/Auth';
import { CollectionProvider } from './context/Collection';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <CollectionProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/register' element={
              <Register />
            } />
            <Route exact path='/logout' element={
              <Logout />
            } />
            <Route exact path='/home' element={
              <Protected>
                <Home />
              </Protected>
            } />
            <Route exact path='/collection/new' element={
              <Protected>
                <NewCollection />
              </Protected>
            } />
            <Route path='/collection/:id' element={
              <Protected>
                <Collection />
              </Protected>
            } />
            <Route path='/bookmark/new/:id' element={
              <Protected>
                <NewBookmark />
              </Protected>
            } />
            <Route path='/settings' element={
              <Protected>
                <Settings />
              </Protected>
            } />
          </Routes>
        </BrowserRouter>
      </CollectionProvider>
    </AuthProvider>
  );
}

export default App;
