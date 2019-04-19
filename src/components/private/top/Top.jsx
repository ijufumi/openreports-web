import React from 'react'
import {Helmet} from 'react-helmet'
import {Box} from 'grommet/components/Box'
import {Heading} from 'grommet/components/Heading'

import {Grid} from 'grommet/components/Grid'

import SideMenu from '../layout/Menu'

class Top extends React.Component {
    render() {
        return(
            <div>
                <Helmet>
                    <title>OpenReports - Home</title>
                </Helmet>
                <Grid rows={['large']}
                      columns={['small', 'xlarge']}
                      gap="small"
                      areas={[
                          { name: 'nav', start: [0, 0], end: [0, 0] },
                          { name: 'main', start: [1, 0], end: [1, 0] }
                      ]}>

                    <Box gridArea="main" width="medium">
                        <Heading>Home</Heading>
                    </Box>
                    <Box gridArea="nav" width="medium">
                        <SideMenu/>
                    </Box>

                </Grid>

            </div>
        );
    }
}

export default Top