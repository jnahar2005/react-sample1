import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

import './SuperAdmin/polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './SuperAdmin/index.css';

import App from './SuperAdmin/App';
import * as serviceWorker from './SuperAdmin/serviceWorker';

import { Provider } from 'react-redux'
import { createStore } from 'redux';
import rootReducer from './SuperAdmin/reducers/index';
const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

serviceWorker.unregister();