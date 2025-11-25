import React, { FC } from "react";
import { VStack, Box, Heading, Text, Button, Icon } from "@chakra-ui/react";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";
import useNavigator from "../navigator";

interface Props {}

const GoogleAuthError: FC<Props> = () => {
  const navigator = useNavigator();

  const handleRetry = () => {
    navigator.toLogin();
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
    >
      <VStack gap={6} textAlign="center" p={8}>
        <Icon
          as={FiAlertTriangle}
          boxSize={24}
          color="orange.400"
          animation="pulse 2s ease-in-out infinite"
        />
        <Heading size="2xl" color="gray.800">
          Authentication Error
        </Heading>
        <Text fontSize="lg" color="gray.600" maxW="md">
          There was a problem authenticating with Google. Please try again.
        </Text>
        <Button
          colorScheme="blue"
          size="lg"
          onClick={handleRetry}
          leftIcon={<Icon as={FiRefreshCw} />}
          mt={4}
        >
          Try Again
        </Button>
      </VStack>
    </Box>
  );
};

export default GoogleAuthError;
