import React from 'react';
import {Accordion} from 'grommet/components/Accordion'
import {AccordionPanel} from 'grommet/components/AccordionPanel'
import {Box} from "grommet/components/Box";
import {Add} from 'grommet-icons'
import extendDefaultTheme from 'grommet/default-props'


const accordionTheme = {
    accordion: {
        icons: {
            collapse: <Add/>,
            expand: <Add/>,
        },
        border : {"side": "bottom", "color": "border"},
    }
} | extendDefaultTheme;

class SideMenu extends React.Component {
    render() {
        return (
            <Accordion multiple={true}>
                <AccordionPanel label="nav1" theme={accordionTheme}>
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
                <AccordionPanel label="nav2">
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