import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './samples/node-api'
import './styles/index.css'

const root = document.getElementById('root')
if (!root) {
  throw new Error('Could not find #root element')
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

postMessage({ payload: 'removeLoading' }, '*')
