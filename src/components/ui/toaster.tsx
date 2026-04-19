"use client"

import * as React from "react"
import {
  Toaster as ChakraToaster,
  Portal,
  Stack,
  Toast,
  Text,
  createToaster,
} from "@chakra-ui/react"

export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
})

const typeMeta: Record<string, { label: string; accent: string }> = {
  success: { label: "OK", accent: "nothing.text" },
  error: { label: "ERR", accent: "nothing.red" },
  warning: { label: "WARN", accent: "nothing.warning" },
  info: { label: "INFO", accent: "nothing.textSecondary" },
  loading: { label: "…", accent: "nothing.textSecondary" },
}

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }}>
        {(toast) => {
          const meta = typeMeta[toast.type ?? "info"] ?? typeMeta.info
          return (
            <Toast.Root
              width={{ md: "sm" }}
              bg="nothing.surface"
              color="nothing.text"
              borderWidth="1px"
              borderColor="nothing.text"
              borderRadius="technical"
              boxShadow="none"
              p="16px"
            >
              <Text
                fontFamily="mono"
                fontSize="10px"
                letterSpacing="0.25em"
                textTransform="uppercase"
                color={meta.accent}
                minW="40px"
              >
                [{meta.label}]
              </Text>
              <Stack gap="4px" flex="1" maxWidth="100%">
                {toast.title && (
                  <Toast.Title
                    fontFamily="heading"
                    fontSize="14px"
                    fontWeight={500}
                    color="nothing.text"
                  >
                    {toast.title}
                  </Toast.Title>
                )}
                {toast.description && (
                  <Toast.Description
                    fontSize="13px"
                    color="nothing.textSecondary"
                    lineHeight="1.5"
                  >
                    {toast.description}
                  </Toast.Description>
                )}
              </Stack>
              {toast.action && (
                <Toast.ActionTrigger
                  fontFamily="mono"
                  fontSize="10px"
                  letterSpacing="0.2em"
                  textTransform="uppercase"
                >
                  {toast.action.label}
                </Toast.ActionTrigger>
              )}
              {toast.closable && <Toast.CloseTrigger />}
            </Toast.Root>
          )
        }}
      </ChakraToaster>
    </Portal>
  )
}
