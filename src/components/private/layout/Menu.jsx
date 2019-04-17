import React from 'react';
import Navigation from 'react-toolbox/lib/navigation'
import Link from 'react-toolbox/lib/link';

class SideMenu extends React.Component {
    render() {
        return (
            <Navigation type='vertical'>
                <Link label='aaa'/>
                <Navigation type='vertical'>
                    <Link  label='bbb'/>
                    <Link  label='ccc'/>
                </Navigation>
                <Link  label='ddd'/>
            </Navigation>
        );
    }
}

export default SideMenu