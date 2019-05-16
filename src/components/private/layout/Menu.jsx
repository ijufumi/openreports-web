import React from 'react'
import {withRouter} from 'react-router'
import {Accordion} from 'grommet/components/Accordion'
import {AccordionPanel} from 'grommet/components/AccordionPanel'
import {Box} from "grommet/components/Box"
import {Button} from "grommet/components/Button"
import {Heading} from "grommet/components/Heading";
import {FormAdd, FormSubtract} from 'grommet-icons'

import menuStyles from '../layout/theme.css'

const accordionTheme = {
    global: {
      colors: {
//          icon: "red"
      }
    },
    accordion: {
        icons: {
            collapse: FormSubtract,
            expand: FormAdd,
            color: "blue",
        },
        border : {"side": "bottom", "color": "border"},
    }
};

const hasChildPad = {
    left: "medium",
    bottom: "small"
};

const childPad = {
    top: "small",
    left: "medium",
    bottom: "medium"
};


class SideMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClicked(path){
        this.props.history.push(path);
    };

    render() {
        return (
            <div>
                <div className={menuStyles.menu}>
                    <header className={menuStyles.menu_header}><Heading level="3">メニュー</Heading></header>
                    <Accordion multiple={true} activeIndex={[0, 1]}>

                        <AccordionPanel label="メニュー１" theme={accordionTheme}>
                            <Box pad="medium">
                                menu1
                            </Box>
                            <Box pad="medium">
                                menu2
                            </Box>
                            <Box pad="medium">
                                menu3
                            </Box>
                        </AccordionPanel>
                        <AccordionPanel label="設定" theme={accordionTheme}>
                            <Box pad="medium">
                                <Button type="button" onClick={() => {this.handleClicked("/private/settings/member")}}>ユーザ設定</Button>
                            </Box>
                            <Box pad="medium">
                                <Button type="button" onClick={() => {this.handleClicked("/private/settings/group")}}>ユーザグループ設定</Button>
                            </Box>
                            <Box pad="medium">
                                レポート設定
                            </Box>
                            <Box pad={hasChildPad}>
                                <Box pad={childPad}>
                                    <Button type="button" onClick={() => {this.handleClicked("/private/settings/report")}}>レポート一覧</Button>
                                </Box>
                                <Box pad={childPad}>
                                    <Button type="button" onClick={() => {this.handleClicked("/private/settings/report-group")}}>レポートグループ一覧</Button>
                                </Box>
                                <Box pad={childPad}>
                                    <Button type="button" onClick={() => {this.handleClicked("/private/settings/report-template")}}>レポートテンプレート一覧</Button>
                                </Box>
                                <Box pad={childPad}>
                                    <Button type="button" onClick={() => {this.handleClicked("/private/settings/report-param")}}>レポートパラメータ一覧</Button>
                                </Box>
                            </Box>
                        </AccordionPanel>
                    </Accordion>
                </div>
            </div>
        );
    }
}

export default withRouter(SideMenu)
