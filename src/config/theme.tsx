import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.100",
      },
      button: {
        bg: "blue.50 !important",
        minWidth: "200px !important",
      },
    },
  },
});

export default theme;
