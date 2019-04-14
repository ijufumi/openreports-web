import React from 'react'
import {Layout, Panel, NavDrawer} from 'react-toolbox/lib/layout/'
import Navigation from 'react-toolbox/lib/navigation'
import {Input} from 'react-toolbox/lib/input/index'
import {Button} from 'react-toolbox/lib/button/index'
import styles from './theme.css'

import inputStyles from '../../css/input.css'

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
            <Layout className={styles.layout}>
                <Panel className={styles.panel}>
                    <NavDrawer>
                        aaa
                    </NavDrawer>
                    <Navigation type='horizontal'>
                        <Button label='Home' raised/>
                    </Navigation>
                    <h2>OpenReports</h2>
                    <div>
                        <Input type='email' name="loginId"
                               label='Email Address' value={this.state.loginId}
                               onChange={this.handleChange.bind(this, 'loginId')} className={inputStyles.input}/>
                    </div>
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