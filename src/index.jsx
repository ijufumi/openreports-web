import React from 'react';
import {render} from 'react-dom';
import createSagaMiddleware from 'redux-saga'
import {createStore, applyMiddleware} from "redux";
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import reducer from './reducers'
import rootSaga from './sagas';

import App from './components/App'

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware, logger),
);
sagaMiddleware.run(rootSaga);

render(
    <Provider store={store}>
        <App/>
    </Provider>
    ,
    document.getElementById('root')
);