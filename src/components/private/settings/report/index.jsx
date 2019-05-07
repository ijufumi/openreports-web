import React from 'react'
import {Helmet} from 'react-helmet'
import {Box} from 'grommet/components/Box'
import {Heading} from 'grommet/components/Heading'

import {Grid} from 'grommet/components/Grid'

import SideMenu from '../../layout/Menu'
import layoutStyle from '../../../css/layout.css'
import {Button} from "grommet/components/Button";

class Index extends React.Component {
    render() {
        return(
            <div className={layoutStyle.layout}>
                <Helmet>
                    <title>レポート一覧 | OpenReports</title>
                </Helmet>
                <Grid rows={['large']}
                      columns={['medium', 'xlarge']}
                      gap="small"
                      areas={[
                          { name: 'nav', start: [0, 0], end: [0, 0] },
                          { name: 'main', start: [1, 0], end: [1, 0] }
                      ]}>

                    <Box gridArea="main">
                        <Heading>レポート一覧</Heading>
                        <Box width="small">
                            <Button label="登録"/>
                        </Box>
                        <Box width="medium" pad={{top:"medium"}} gap="small">
                            <Box border="all" pad="xsmall" round="small">
                                aaaaa
                            </Box>
                            <Box border="all" pad="xsmall" round="small">
                                bbbbb
                            </Box>
                            <Box border="all" pad="xsmall" round="small">
                                ccccc
                            </Box>
                        </Box>
                    </Box>
                    <Box gridArea="nav" width="medium">
                        <SideMenu/>
                    </Box>

                </Grid>

            </div>
        );
    }
}

export default Index