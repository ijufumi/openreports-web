import React from 'react'
import Navigation from "react-toolbox/lib/navigation";
import {Button} from "react-toolbox/lib/button";

import styles from './theme.css'

class Header extends React.Component {
    render() {
        return(
            <Navigation type='horizontal' className={styles.header}>
                <Button label='Home' raised/>
                <Button label='Home' raised/>
                <Button label='Home' raised/>
                <Button label='Home' raised/>
                <Button label='Home' raised/>
            </Navigation>
        );
    }
}

export default Header