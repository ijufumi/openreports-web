import React from 'react'
import {Accordion} from 'grommet/components/Accordion'
import {AccordionPanel} from 'grommet/components/AccordionPanel'
import {Box} from "grommet/components/Box"
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


class SideMenu extends React.Component {
    render() {
        return (
            <div className={menuStyles.menu}>
                <header className={menuStyles.menu_header}><Heading level="3">header</Heading></header>
                <Accordion multiple={true}>

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
                        <Box pad="medium">
                            <Box pad="medium">
                                menu3
                            </Box>
                        </Box>
                    </AccordionPanel>
                    <AccordionPanel label="メニュー２" theme={accordionTheme}>
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
                </Accordion>
            </div>
        );
    }
}

export default SideMenu