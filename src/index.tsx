import React from 'react';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AuthProvider } from './contexts/AuthContext';
import { ProductsProvider } from './contexts/ProductsContext';
import { CartProvider } from './contexts/CartContext';
import { store } from './store';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);


