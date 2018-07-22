import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from 'utils/registerServiceWorker'
import createStore from './store'
import AppRouter from 'routes/AppRouter'
import 'normalize.css'
import './styles/pagination.css'
import './styles/index.css'

const store = createStore()

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
)

registerServiceWorker()
