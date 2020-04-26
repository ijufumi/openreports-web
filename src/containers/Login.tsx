import React from 'react';
import styled from 'styled-components';

import { injectContext } from "../contexts/InjectContext";

class Login extends React.Component {
    state = {
        username: '',
        password: ''
    };

    handleInputUsername = (e) => {
        const { username } = e.target;
        this.setState({
            username
        });
    };

    handleInputPassword = (e) => {
        const { password } = e.target;
        this.setState({
            password
        });
    }
    render() {
        return (
            <LoginContainer>
                <input type={'email'} placeholder={'Input username'} />
            </LoginContainer>
        );
    }
}

const LoginContainer = styled.div`
  width: 500px;
  height: 500px;
  border: solid 1px;
`;


export default injectContext(Login);
