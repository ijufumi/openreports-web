import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.100",
      },
      button: {
        minWidth: "200px !important",
      },
    },
  },
  components: {
    Button: {
      variants: {
        login: {
          bg: "blue.50 !important",
        },
      },
    },
  },
});

export default theme;
