import React, { FC } from "react"
import { VStack, HStack, Box, Text, Button } from "@chakra-ui/react"
import useNavigator from "../navigator"

interface Props {}

const GoogleAuthError: FC<Props> = () => {
  const navigator = useNavigator()

  const handleRetry = () => {
    navigator.toLogin()
  }

  return (
    <Box
      minH="100vh"
      bg="nothing.bg"
      color="nothing.text"
      display="flex"
      alignItems="center"
      position="relative"
    >
      <HStack
        position="absolute"
        top="32px"
        left="48px"
        gap="8px"
        alignItems="baseline"
      >
        <Text fontFamily="display" fontSize="28px" lineHeight="1">
          ●
        </Text>
        <Text
          fontFamily="mono"
          fontSize="11px"
          letterSpacing="0.25em"
          textTransform="uppercase"
        >
          OpenReport
        </Text>
      </HStack>

      <Text
        position="absolute"
        bottom="32px"
        right="48px"
        fontFamily="mono"
        fontSize="10px"
        letterSpacing="0.2em"
        textTransform="uppercase"
        color="nothing.red"
      >
        ● AUTH / FAILED
      </Text>

      <VStack
        align="flex-start"
        gap="24px"
        pl={{ base: "24px", md: "96px" }}
        pr="48px"
        maxW="900px"
      >
        <Text
          fontFamily="mono"
          fontSize="11px"
          letterSpacing="0.25em"
          textTransform="uppercase"
          color="nothing.textSecondary"
        >
          [Status / Auth]
        </Text>
        <Text
          fontFamily="heading"
          fontSize={{ base: "56px", md: "96px" }}
          lineHeight="0.95"
          letterSpacing="-0.03em"
          fontWeight={500}
          color="nothing.text"
        >
          Auth failed.
        </Text>
        <Text
          fontSize="15px"
          color="nothing.textSecondary"
          maxW="480px"
          lineHeight="1.5"
        >
          There was a problem authenticating with Google. Please try again.
        </Text>
        <Button
          onClick={handleRetry}
          mt="16px"
          h="44px"
          fontFamily="mono"
          fontSize="11px"
          letterSpacing="0.2em"
          textTransform="uppercase"
        >
          Try again →
        </Button>
      </VStack>
    </Box>
  )
}

export default GoogleAuthError
