import React from 'react'
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import {Box} from 'grommet/components/Box'
import {Heading} from 'grommet/components/Heading'

import {Grid} from 'grommet/components/Grid'

import SideMenu from './menu'
import layoutStyle from '../../css/layout.css'
import MemberTop from "../settings/member";
import MemberRegister from "../settings/member/register";
import GroupTop from "../settings/group";
import ReportTop from "../settings/report";
import ReportGroupTop from "../settings/report-group";
import ReportTemplateTop from "../settings/report-template";
import ReportParamTop from "../settings/report-param";

class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    render() {
        return (
            <div className={layoutStyle.layout}>
                <Helmet>
                    <title> aaa | OpenReports</title>
                </Helmet>
                <Grid rows={['large']}
                      columns={['medium', 'xlarge']}
                      gap="small"
                      areas={[
                          {name: 'nav', start: [0, 0], end: [0, 0]},
                          {name: 'main', start: [1, 0], end: [1, 0]}
                      ]}>

                    <Box gridArea="main">
                        <Heading>{this.props.title}</Heading>
                        {this.props.children}
                    </Box>
                    <Box gridArea="nav" width="medium">
                        <SideMenu/>
                    </Box>
                </Grid>
                <Route exact={true} path='{this.props.match.url}' component={MemberTop} title="aaaa" />
                <Route path='{`${this.props.match.url}/settings/member`}' component={MemberTop} title="aaaa" />
                <Route path='{`${this.props.match.url}/settings/register`}' component={MemberRegister}  title={"bbbb"}/>
                <Route path='{`${this.props.match.url}/settings/group`}' component={GroupTop}/>
                <Route exact={true} path='{`${this.props.match.url}/settings/report`}' component={ReportTop}/>
                <Route exact={true} path='{`${this.props.match.url}/settings/report-group`}' component={ReportGroupTop}/>
                <Route exact={true} path='{`${this.props.match.url}/settings/report-template`}' component={ReportTemplateTop}/>
                <Route exact={true} path='{`${this.props.match.url}/settings/report-param`}' component={ReportParamTop}/>
            </div>
        );
    }
}

export default withRouter(Index)
