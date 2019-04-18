import React from 'react'
import {Box} from 'grommet/components/Box'
import {FormField} from 'grommet/components/FormField'
import {TextInput} from 'grommet/components/TextInput'

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
            <Box>
                <FormField label="Email Address">
                    <TextInput placeholder="Email Address" value={this.state.loginId} onChange={this.handleChange.bind(this, 'loginId')}/>
                </FormField>
                <FormField label="Password">
                    <TextInput placeholder="Password" value={this.state.password} onChange={this.handleChange.bind(this, 'password')}/>
                </FormField>
            </Box>
        );
    }
}

export default Top