import React from 'react'
import {Layout, Panel} from 'react-toolbox/lib/layout/'
import Navigation from 'react-toolbox/lib/navigation'
import {Input} from 'react-toolbox/lib/input/index'
import {Button} from 'react-toolbox/lib/button/index'

import inputStyles from '../../css/input.css'
import layoutStyles from '../../css/layout.css'

class Top extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loginId: '', password: ''};
    }

    handleChange(name, value) {
        this.setState({[name]: value});
    };

    render() {
        return (
            <Layout className={layoutStyles.layout}>
                <Panel className={layoutStyles.panel}>
                    <Navigation type='horizontal' className={layoutStyles.header}>
                        <Button label='Home' raised/>
                    </Navigation>
                    <h2>OpenReports</h2>
                    <Input type='email' name="loginId"
                           label='Email Address' value={this.state.loginId}
                           onChange={this.handleChange.bind(this, 'loginId')} className={inputStyles.input}/>
                    <Input type='password' name="password"
                           label='Password' value={this.state.password}
                           onChange={this.handleChange.bind(this, 'password')} className={inputStyles.input}/>
                    <Button label='Sign In' raised primary/>
                </Panel>
            </Layout>
        );
    }
}

export default Top