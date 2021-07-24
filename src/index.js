import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDom from 'react-dom';
import { AuthProvider } from './Components/AuthContext';
import App from './Components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
ReactDom.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>,

  document.getElementById('root')
);
