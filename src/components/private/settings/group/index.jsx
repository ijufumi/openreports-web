import React from 'react'
import {withRouter} from 'react-router'
import {Helmet} from 'react-helmet'
import {Box} from 'grommet/components/Box'
import {Heading} from 'grommet/components/Heading'

import {Grid} from 'grommet/components/Grid'

import SideMenu from '../../layout/menu'
import layoutStyle from '../../../css/layout.css'
import {Button} from "grommet/components/Button";

class Index extends React.Component {
    render() {
        return(
            <div>
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
            </div>
        );
    }
}

export default withRouter(Index)
