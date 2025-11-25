import React, { FC } from "react";
import { VStack, Box, Heading, Text, Button, Icon } from "@chakra-ui/react";
import { FiAlertCircle, FiHome } from "react-icons/fi";
import useNavigator from "../navigator";

interface Props {}

const NotfoundError: FC<Props> = () => {
  const navigator = useNavigator();

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
          as={FiAlertCircle}
          boxSize={24}
          color="red.400"
          animation="pulse 2s ease-in-out infinite"
        />
        <Heading size="3xl" color="gray.800">
          404
        </Heading>
        <Heading size="xl" color="gray.700">
          Page Not Found
        </Heading>
        <Text fontSize="lg" color="gray.600" maxW="md">
          Sorry, the page you are looking for does not exist or has been moved.
        </Text>
        <Button
          colorScheme="blue"
          size="lg"
          onClick={() => navigator.toTop()}
          mt={4}
        >
          <Icon as={FiHome} />
          Go to Home
        </Button>
      </VStack>
    </Box>
  );
};

export default NotfoundError;
