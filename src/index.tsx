import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { RouterStore, syncHistoryWithStore } from "mobx-react-router";
import { createBrowserHistory } from 'history';

import AppContext from "./contexts/AppContext";
import Action from "./actions";
import {RootRepository} from "./repositories/RootRepository";

const action = new Action(new RootRepository());
const routerStore = new RouterStore();

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, routerStore);


ReactDOM.render(
    <AppContext.Provider value={{ rootStore: null, action: action }}>
        <Router history={ history } >
        </Router>
    </AppContext.Provider>
);
