import React from 'react'
import {withRouter} from 'react-router'
import {Helmet} from 'react-helmet'
import {Box} from 'grommet/components/Box'
import {Heading} from 'grommet/components/Heading'
import {Button} from 'grommet/components/Button'

import {Grid} from 'grommet/components/Grid'

import SideMenu from '../../layout/Menu'
import layoutStyle from '../../../css/layout.css'

class Index extends React.Component {
    render() {
        return(
            <div className={layoutStyle.layout}>
                <Helmet>
                    <title>ユーザ一覧 | OpenReports</title>
                </Helmet>
                <Grid rows={['large']}
                      columns={['medium', 'xlarge']}
                      gap="small"
                      areas={[
                          { name: 'nav', start: [0, 0], end: [0, 0] },
                          { name: 'main', start: [1, 0], end: [1, 0] }
                      ]}>

                    <Box gridArea="main">
                        <Heading>ユーザ一覧</Heading>
                        <Box width="small">
                            <Button label="登録" onClick={() => {
                                window.location.href="/private/settings/member/register"
                            }}/>
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

export default withRouter(Index)
