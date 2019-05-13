import React from 'react'
import {withRouter} from 'react-router'
import {Helmet} from 'react-helmet'
import {Box} from 'grommet/components/Box'
import {Heading} from 'grommet/components/Heading'

import {Grid} from 'grommet/components/Grid'

import SideMenu from './Menu'
import layoutStyle from '../../css/layout.css'

class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    render() {
        return(
            <div className={layoutStyle.layout}>
                <Helmet>
                    <title>{this.props.title} | OpenReports</title>
                </Helmet>
                <Grid rows={['large']}
                      columns={['medium', 'xlarge']}
                      gap="small"
                      areas={[
                          { name: 'nav', start: [0, 0], end: [0, 0] },
                          { name: 'main', start: [1, 0], end: [1, 0] }
                      ]}>

                    <Box gridArea="main">
                        <Heading>{this.props.title}</Heading>
                        {this.props.children}
                    </Box>
                    <Box gridArea="nav" width="medium">
                        <SideMenu/>
                    </Box>

                </Grid>

            </div>
        );
    }
}

export default withRouter(Index)
