import React from 'react'
import ReactDOM from 'react-dom/client'
import { ReduxMeta, ReduxMetaProvider } from '@package/redux-meta'

// css
import '@assets/css/style.css'

// views
import App from '@views/app'

// modules
import app from '@modules/app'

const reduxMeta = new ReduxMeta()
reduxMeta.useModules(app())

// global variables
window.$reduxMeta = reduxMeta

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReduxMetaProvider store={reduxMeta.store}>
      <App />
    </ReduxMetaProvider>
  </React.StrictMode>,
)
