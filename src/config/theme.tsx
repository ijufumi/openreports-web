import { extendTheme } from "@chakra-ui/react"

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
        action: {
          bg: "blue.100",
        },
        icon: {
          minWidth: "80px !important",
          borderWidth: "1px",
          borderRadius: "6px",
        },
        actionIcons: {
          minWidth: "30px !important",
          minHeight: "20px !important",
          borderRadius: "6px",
        },
        pager: {
          bg: "gray.300",
        },
      },
    },
  },
})

export default theme
