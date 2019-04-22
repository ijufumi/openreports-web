import React from 'react';
import {Accordion} from 'grommet/components/Accordion'
import {AccordionPanel} from 'grommet/components/AccordionPanel'
import {Box} from "grommet/components/Box";
import {FormAdd, FormSubtract} from 'grommet-icons'

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
            <Accordion multiple={true}>
                <AccordionPanel label="メニュー１" theme={accordionTheme}>
                    <Box>
                        menu1
                    </Box>
                    <Box>
                        menu2
                    </Box>
                    <Box>
                        menu3
                    </Box>
                </AccordionPanel>
                <AccordionPanel label="メニュー２" theme={accordionTheme}>
                    <Box>
                        menu1
                    </Box>
                    <Box>
                        menu2
                    </Box>
                    <Box>
                        menu3
                    </Box>
                </AccordionPanel>
            </Accordion>
        );
    }
}

export default SideMenu