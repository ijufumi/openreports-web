import React from 'react'
import {Layout, Panel} from 'react-toolbox/lib/layout/'

import Header from '../layout/Header'

import SideMenu from '../layout/Menu'

import layoutStyles from '../../css/layout.css'

class Top extends React.Component {
    render() {
        return(
            <Layout className={layoutStyles.layout}>
                <SideMenu/>
                <Panel className={layoutStyles.panel}>
                    <Header/>
                    <h2>Home</h2>
                </Panel>
            </Layout>
        );
    }
}

export default Top