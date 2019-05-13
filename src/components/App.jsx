import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Top from './public/top/Top'
import Base from './private/layout/base'

const App = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route exact={true} path="/" component={Top}/>
                <Route path='/private' component={Base}/>
            </Switch>
        </div>
    </BrowserRouter>
);

export default App
