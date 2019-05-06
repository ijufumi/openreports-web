import React from 'react'
import {Accordion} from 'grommet/components/Accordion'
import {AccordionPanel} from 'grommet/components/AccordionPanel'
import {Box} from "grommet/components/Box"
import {Heading} from "grommet/components/Heading";
import {Anchor} from 'grommet/components/Anchor';
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
    render() {
        return (
            <div className={menuStyles.menu}>
                <header className={menuStyles.menu_header}><Heading level="3">メニュー</Heading></header>
                <Accordion multiple={true} activeIndex={[0,1]}>

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
                            <Anchor href="/private/settings/member" label="ユーザ設定" color="black"/>
                        </Box>
                        <Box pad="medium">
                            <Anchor href="/private/settings/group" label="ユーザグループ設定" color="black"/>
                        </Box>
                        <Box pad="medium">
                            レポート設定
                        </Box>
                        <Box pad={hasChildPad}>
                            <Box pad={childPad}>
                                <Anchor href="/private/settings/report" label="レポート一覧" color="black"/>
                            </Box>
                            <Box pad={childPad}>
                                <Anchor href="/private/settings/report-group" label="レポートグループ一覧" color="black"/>
                            </Box>
                            <Box pad={childPad}>
                                <Anchor href="/private/settings/report-template" label="レポートテンプレート一覧" color="black"/>
                            </Box>
                            <Box pad={childPad}>
                                <Anchor href="/private/settings/report-param" label="レポートパラメータ一覧" color="black"/>
                            </Box>
                        </Box>
                    </AccordionPanel>
                </Accordion>
            </div>
        );
    }
}

export default SideMenu