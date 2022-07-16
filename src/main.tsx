import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { IoProvider } from 'socket.io-react-hook';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <IoProvider>
  <App />
  </IoProvider>
</React.StrictMode>
)
