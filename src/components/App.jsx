import React from "react";
import {BrowserRouter, Route} from "react-router-dom";

import Top from './public/top/Top'
import PrivateTop from './private/top/Top'

const App = () => (
    <BrowserRouter>
        <div>
            <Route exact path='/' component={Top}/>
            <Route exact path='/private/' component={PrivateTop}/>
        </div>
    </BrowserRouter>
);

export default App
