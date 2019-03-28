import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { logger } from './store/middlewares/logger';
import rootReducer from './store/reducers';

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

window.store = store;

const app = (
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
