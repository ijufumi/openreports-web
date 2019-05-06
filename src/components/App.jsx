import React from "react";
import {BrowserRouter, Route} from "react-router-dom";

import Top from './public/top/Top'
import PrivateTop from './private/top/Top'
import MemberTop from './private/settings/member/index'
import GroupTop from './private/settings/group/index'
import ReportTop from './private/settings/report/index'
import ReportGroupTop from './private/settings/report-group/index'
import ReportTemplateTop from './private/settings/report-template/index'
import ReportParamTop from './private/settings/report-param/index'

const App = () => (
    <BrowserRouter>
        <div>
            <Route exact path='/' component={Top}/>
            <Route exact path='/private/' component={PrivateTop}/>
            <Route exact path='/private/settings/member' component={MemberTop}/>
            <Route exact path='/private/settings/group' component={GroupTop}/>
            <Route exact path='/private/settings/report' component={ReportTop}/>
            <Route exact path='/private/settings/report-group' component={ReportGroupTop}/>
            <Route exact path='/private/settings/report-template' component={ReportTemplateTop}/>
            <Route exact path='/private/settings/report-param' component={ReportParamTop}/>
        </div>
    </BrowserRouter>
);

export default App
