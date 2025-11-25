import React, { FC, useEffect } from "react";
import {
  VStack,
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
  Button,
  Card,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { FiFileText, FiDatabase, FiLayout } from "react-icons/fi";
import { setBreadcrumbs } from "../../../infrastructure/state/Breadcrumbs";
import useNavigator from "../navigator";

interface Props {}

const Top: FC<Props> = () => {
  const navigator = useNavigator();

  useEffect(() => {
    setBreadcrumbs([]);
  }, []);

  const quickActions = [
    {
      title: "Reports",
      description: "View and manage your reports",
      icon: FiFileText,
      color: "blue.500",
      bgColor: "blue.50",
      onClick: () => navigator.toReports(),
    },
    {
      title: "Templates",
      description: "Manage report templates",
      icon: FiLayout,
      color: "purple.500",
      bgColor: "purple.50",
      onClick: () => navigator.toTemplates(),
    },
    {
      title: "Data Sources",
      description: "Configure data connections",
      icon: FiDatabase,
      color: "green.500",
      bgColor: "green.50",
      onClick: () => navigator.toDataSources(),
    },
  ];

  return (
    <VStack gap={8} align="stretch" w="100%">
      {/* Welcome Section */}
      <Box
        bg="white"
        borderRadius="xl"
        p={8}
        boxShadow="sm"
        borderWidth="1px"
        borderColor="gray.200"
      >
        <VStack align="start" gap={2}>
          <Heading size="2xl" color="gray.800">
            Welcome to OpenReports
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Manage your reports, templates, and data sources efficiently
          </Text>
        </VStack>
      </Box>

      {/* Quick Actions */}
      <Box>
        <Heading size="lg" mb={4} color="gray.700">
          Quick Actions
        </Heading>
        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
          {quickActions.map((action) => (
            <GridItem key={action.title}>
              <Card.Root
                bg="white"
                borderRadius="lg"
                p={6}
                boxShadow="md"
                borderWidth="1px"
                borderColor="gray.200"
                transition="all 0.3s"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "xl",
                  borderColor: action.color,
                }}
                cursor="pointer"
                onClick={action.onClick}
              >
                <Flex direction="column" gap={4}>
                  <Flex align="center" gap={3}>
                    <Box
                      bg={action.bgColor}
                      p={3}
                      borderRadius="lg"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon
                        as={action.icon}
                        boxSize={8}
                        color={action.color}
                      />
                    </Box>
                    <Heading size="md" color="gray.800">
                      {action.title}
                    </Heading>
                  </Flex>
                  <Text color="gray.600" fontSize="sm">
                    {action.description}
                  </Text>
                  <Button
                    variant="outline"
                    colorScheme={action.color.split(".")[0]}
                    size="sm"
                    mt={2}
                  >
                    View {action.title}
                  </Button>
                </Flex>
              </Card.Root>
            </GridItem>
          ))}
        </Grid>
      </Box>

      {/* Getting Started */}
      <Box
        bg="gradient-to-r"
        bgGradient="to-r"
        gradientFrom="blue.50"
        gradientTo="purple.50"
        borderRadius="xl"
        p={8}
        borderWidth="1px"
        borderColor="blue.100"
      >
        <VStack align="start" gap={4}>
          <Heading size="lg" color="gray.800">
            Getting Started
          </Heading>
          <Text color="gray.700" fontSize="md">
            Start by creating a new report or template to organize your data efficiently.
          </Text>
          <Flex gap={4} flexWrap="wrap">
            <Button
              colorScheme="blue"
              onClick={() => navigator.toReportNew()}
              size="md"
            >
              Create New Report
            </Button>
            <Button
              variant="outline"
              colorScheme="purple"
              onClick={() => navigator.toTemplateNew()}
              size="md"
            >
              Create New Template
            </Button>
          </Flex>
        </VStack>
      </Box>
    </VStack>
  );
};

export default Top;
