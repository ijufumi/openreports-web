import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Base from './private/layout/base'

import Top from './public/top/Top'
import PrivateTop from './private/top/Top'
import MemberTop from './private/settings/member/index'
import MemberRegister from './private/settings/member/register'
import GroupTop from './private/settings/group/index'
import ReportTop from './private/settings/report/index'
import ReportGroupTop from './private/settings/report-group/index'
import ReportTemplateTop from './private/settings/report-template/index'
import ReportParamTop from './private/settings/report-param/index'

const App = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route component={Base}>
                    <Route exact path="/" component={Top} />
                </Route>
                <Route exact path='/private/' component={PrivateTop}/>
                <Route exact path='/private/settings/member' component={MemberTop}/>
                <Route exact path='/private/settings/member/register' component={MemberRegister}/>
                <Route exact path='/private/settings/group' component={GroupTop}/>
                <Route exact path='/private/settings/report' component={ReportTop}/>
                <Route exact path='/private/settings/report-group' component={ReportGroupTop}/>
                <Route exact path='/private/settings/report-template' component={ReportTemplateTop}/>
                <Route exact path='/private/settings/report-param' component={ReportParamTop}/>
            </Switch>
        </div>
    </BrowserRouter>
);

export default App
