import React from 'react'
import {bindActionCreators} from "redux";
import {connect} from 'react-redux'
import {Helmet} from 'react-helmet'
import {Box} from 'grommet/components/Box'
import {FormField} from 'grommet/components/FormField'
import {TextInput} from 'grommet/components/TextInput'
import {Button} from 'grommet/components/Button'
import {Heading} from 'grommet/components/Heading'

import {login} from '../../../actions/public/top'

import layoutStyle from '../../css/layout.css'

class Top extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {loginId: '', password: ''};
    }

    handleChange(name, value) {
        this.setState({[name]: value});
    };

    render() {
        const login = this.props.login;
        return (
            <div className={layoutStyle.layout}>
                <Helmet>
                    <title>OpenReports</title>
                </Helmet>
                <Box width="medium">
                    <Heading>OpenReports</Heading>
                    <FormField label="Email Address">
                        <TextInput placeholder="Email Address" type="email" value={this.state.loginId} onChange={e => this.handleChange('loginId', e.target.value)}/>
                    </FormField>
                    <FormField label="Password">
                        <TextInput placeholder="Password" type="password" value={this.state.password} onChange={e => this.handleChange('password', e.target.value)}/>
                    </FormField>
                    <Button label="Sign In" onClick={login}/>
                </Box>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(login, dispatch)
};

const mapStateToProps = state => {
    return {"loginId": state.loginId}
};

export default connect(mapStateToProps, mapDispatchToProps)(Top)