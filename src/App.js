import React, { useEffect, useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import jwt_decode from 'jwt-decode';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';

import CastingAgencyApi from './api/api';

import './App.css';

export const TOKEN_STORAGE_ID = 'casting-agency-token';

const TOKEN = process.env.REACT_APP_TOKEN;

function App() {
  console.debug('App');

  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://kep-casting-agency.herokuapp.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Casting Agency
        </a>
        <LoginButton />
        <LogoutButton />
        <Profile />
      </header>
    </div>
  );
}

export default App;
