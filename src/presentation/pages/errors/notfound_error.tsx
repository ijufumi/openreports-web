import React, { FC } from "react"
import { VStack, HStack, Box, Text, Button } from "@chakra-ui/react"
import useNavigator from "../navigator"

interface Props {}

const NotfoundError: FC<Props> = () => {
  const navigator = useNavigator()

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
        ● ERROR / 404
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
          [Status / 404]
        </Text>
        <Text
          fontFamily="display"
          fontSize={{ base: "120px", md: "220px" }}
          lineHeight="0.9"
          letterSpacing="-0.02em"
          color="nothing.text"
        >
          404
        </Text>
        <Text
          fontFamily="heading"
          fontSize={{ base: "32px", md: "48px" }}
          lineHeight="1"
          letterSpacing="-0.02em"
          fontWeight={500}
          color="nothing.text"
        >
          Page not found.
        </Text>
        <Text
          fontSize="15px"
          color="nothing.textSecondary"
          maxW="480px"
          lineHeight="1.5"
        >
          The page you are looking for does not exist, or has been moved.
        </Text>
        <Button
          onClick={() => navigator.toTop()}
          mt="16px"
          h="44px"
          fontFamily="mono"
          fontSize="11px"
          letterSpacing="0.2em"
          textTransform="uppercase"
        >
          ← Back home
        </Button>
      </VStack>
    </Box>
  )
}

export default NotfoundError
