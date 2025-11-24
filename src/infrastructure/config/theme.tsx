import { createSystem, defaultConfig, defineConfig, mergeConfigs } from "@chakra-ui/react"

const customConfig = defineConfig({
  globalCss: {
    body: {
      bg: "gray.100",
    },
    button: {
      minWidth: "200px !important",
    },
  },
  theme: {
    recipes: {
      button: {
        variants: {
          variant: {
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
      link: {
        base: {
          color: "blue.600",
          textDecoration: "underline",
        },
      },
    },
  },
})

const config = mergeConfigs(defaultConfig, customConfig)
const system = createSystem(config)

export default system
