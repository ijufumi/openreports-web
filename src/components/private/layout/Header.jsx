import React from 'react'
import Navigation from "react-toolbox/lib/navigation";
import {Button} from "react-toolbox/lib/button";

class Header extends React.Component {
    render() {
        return(
            <Navigation type='horizontal'>
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