import { jsx as _jsx } from 'react/jsx-runtime'
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
  _jsx(React.StrictMode, { children: _jsx(App, {}) })
)
postMessage({ payload: 'removeLoading' }, '*')
