import {
  createSystem,
  defaultConfig,
  defineConfig,
  mergeConfigs,
} from "@chakra-ui/react"

const customConfig = defineConfig({
  globalCss: {
    "html, body": {
      bg: "nothing.bg",
      color: "nothing.text",
      fontFamily: "body",
      fontWeight: 400,
      letterSpacing: "-0.01em",
    },
    "*, *::before, *::after": {
      borderColor: "nothing.border",
    },
    "::selection": {
      bg: "nothing.text",
      color: "nothing.bg",
    },
  },
  theme: {
    tokens: {
      fonts: {
        body: { value: "'Space Grotesk', system-ui, sans-serif" },
        heading: { value: "'Space Grotesk', system-ui, sans-serif" },
        mono: { value: "'Space Mono', ui-monospace, monospace" },
        display: { value: "'Doto', 'Space Mono', monospace" },
      },
      colors: {
        nothing: {
          bg: { value: "#F5F3EF" },
          surface: { value: "#FFFFFF" },
          subtle: { value: "#EEEBE5" },
          border: { value: "#DCD8D1" },
          borderStrong: { value: "#A5A19B" },
          text: { value: "#0A0A0A" },
          textSecondary: { value: "rgba(10,10,10,0.62)" },
          textDisabled: { value: "rgba(10,10,10,0.38)" },
          red: { value: "#D71921" },
          success: { value: "#1E7F3E" },
          warning: { value: "#B87B00" },
        },
      },
      radii: {
        none: { value: "0" },
        sharp: { value: "2px" },
        technical: { value: "4px" },
        card: { value: "8px" },
        pill: { value: "999px" },
      },
    },
    recipes: {
      button: {
        base: {
          fontFamily: "body",
          fontWeight: 500,
          letterSpacing: "0.02em",
          borderRadius: "technical",
          transition: "background 120ms ease-out, border-color 120ms ease-out",
          minWidth: "unset !important",
        },
        variants: {
          variant: {
            solid: {
              bg: "nothing.text",
              color: "nothing.bg",
              _hover: { bg: "#2A2A2A" },
              _disabled: {
                bg: "nothing.subtle",
                color: "nothing.textDisabled",
                cursor: "not-allowed",
              },
            },
            outline: {
              bg: "transparent",
              color: "nothing.text",
              borderWidth: "1px",
              borderColor: "nothing.text",
              _hover: { bg: "nothing.text", color: "nothing.bg" },
              _disabled: {
                color: "nothing.textDisabled",
                borderColor: "nothing.border",
                cursor: "not-allowed",
                _hover: { bg: "transparent", color: "nothing.textDisabled" },
              },
            },
            ghost: {
              bg: "transparent",
              color: "nothing.text",
              _hover: { bg: "nothing.subtle" },
            },
            login: {
              bg: "nothing.text",
              color: "nothing.bg",
              _hover: { bg: "#2A2A2A" },
            },
            action: {
              bg: "nothing.text",
              color: "nothing.bg",
              _hover: { bg: "#2A2A2A" },
            },
            icon: {
              minWidth: "40px !important",
              minHeight: "40px !important",
              bg: "transparent",
              color: "nothing.text",
              borderWidth: "1px",
              borderColor: "nothing.border",
              borderRadius: "technical",
              _hover: { bg: "nothing.subtle", borderColor: "nothing.text" },
            },
            actionIcons: {
              minWidth: "32px !important",
              minHeight: "32px !important",
              bg: "transparent",
              color: "nothing.text",
              borderRadius: "technical",
              _hover: { bg: "nothing.subtle" },
              _disabled: {
                color: "nothing.textDisabled",
                cursor: "not-allowed",
              },
            },
            pager: {
              minWidth: "32px !important",
              minHeight: "32px !important",
              bg: "transparent",
              color: "nothing.text",
              borderWidth: "1px",
              borderColor: "nothing.border",
              borderRadius: "technical",
              _hover: { bg: "nothing.subtle", borderColor: "nothing.text" },
              _disabled: {
                color: "nothing.textDisabled",
                borderColor: "nothing.border",
                cursor: "not-allowed",
                _hover: { bg: "transparent" },
              },
            },
          },
        },
      },
      link: {
        base: {
          color: "nothing.text",
          textDecoration: "underline",
          textDecorationThickness: "1px",
          textUnderlineOffset: "3px",
          _hover: { color: "nothing.red" },
        },
      },
      input: {
        base: {
          fontFamily: "body",
          borderRadius: "technical",
        },
      },
    },
  },
})

const config = mergeConfigs(defaultConfig, customConfig)
const system = createSystem(config)

export default system
