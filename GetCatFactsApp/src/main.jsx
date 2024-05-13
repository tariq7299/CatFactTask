// I have imported this at the top of the file before App.jsx so in order to make the styles at any of the <component.scss> files apply !, like by making main.scss come first, this will make any style in any upcoming scss file apply and overrdies the styles in main.scss
import './main.scss'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
