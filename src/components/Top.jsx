import React from 'react'
import {Layout, Panel} from 'react-toolbox/lib/layout'
import {Input} from 'react-toolbox/lib/input'
import {Button} from 'react-toolbox/lib/button'
import theme from './css/input.css'

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
            <Layout>
                <Panel>
                    <h2>OpenReports</h2>
                    <div>
                        <Input type='email' name="loginId"
                               label='Email Address' value={this.state.loginId}
                               onChange={this.handleChange.bind(this, 'loginId')} theme={theme}/>
                    </div>
                    <Input type='password' name="password"
                           label='Password' value={this.state.password}
                           onChange={this.handleChange.bind(this, 'password')} theme={theme}/>
                    <Button label='Sign In' primary/>
                </Panel>
            </Layout>
        );
    }
}

export default Top