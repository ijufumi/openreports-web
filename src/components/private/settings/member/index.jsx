import React from 'react'
import {withRouter} from 'react-router'
import {Box} from 'grommet/components/Box'
import {Button} from 'grommet/components/Button'

class Index extends React.Component {
    render() {
        return(
            <div>
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
            </div>
        );
    }
}

export default withRouter(Index)
