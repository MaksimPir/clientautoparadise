import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthState } from './context/auth.context';
import { UserState } from './context/user.context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthState>
    <UserState>
      <App />
    </UserState>
  </AuthState>
)


