import React from 'react'
import {Helmet} from 'react-helmet'
import {Box} from 'grommet/components/Box'
import {Heading} from 'grommet/components/Heading'
import {Button} from 'grommet/components/Button'

import {Grid} from 'grommet/components/Grid'

import {Table} from "grommet/components/Table";
import {TableBody} from "grommet/components/TableBody";
import {TableRow} from "grommet/components/TableRow";
import {TableCell} from "grommet/components/TableCell";

import {TextInput} from 'grommet/components/TextInput';

import SideMenu from '../../layout/Menu'
import layoutStyle from '../../../css/layout.css'

class Index extends React.Component {
    render() {
        return(
            <div className={layoutStyle.layout}>
                <Helmet>
                    <title>ユーザ登録 | OpenReports</title>
                </Helmet>
                <Grid rows={['large']}
                      columns={['medium', 'xlarge']}
                      gap="small"
                      areas={[
                          { name: 'nav', start: [0, 0], end: [0, 0] },
                          { name: 'main', start: [1, 0], end: [1, 0] }
                      ]}>

                    <Box gridArea="main">
                        <Heading>ユーザ登録</Heading>
                        <Box width="large" pad={{top:"medium"}}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <strong>Email</strong>
                                        </TableCell>
                                        <TableCell>
                                            <TextInput />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <strong>Name</strong>
                                        </TableCell>
                                        <TableCell>
                                            <TextInput />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <strong>Password</strong>
                                        </TableCell>
                                        <TableCell>
                                            <TextInput />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <strong>Admin</strong>
                                        </TableCell>
                                        <TableCell>
                                            <TextInput />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <strong>グループ</strong>
                                        </TableCell>
                                        <TableCell>
                                            <TextInput />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                        <Box width="medium" direction="row" pad={{top:"medium"}} gap="small">
                            <Button label="キャンセル"/>
                            <Button label="登録"/>
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