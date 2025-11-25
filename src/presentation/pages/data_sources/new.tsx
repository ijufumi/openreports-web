import React, { FC, useState, useEffect } from "react"
import {
  Box,
  Text,
  Input,
  Wrap,
  WrapItem,
  Button,
  NativeSelect,
  VStack,
  Field,
} from "@chakra-ui/react"
import useNavigator from "../navigator"
import UseCaseFactory from "../../../di/UseCaseFactory"
import { setBreadcrumbs } from "../../../infrastructure/state/Breadcrumbs"
import { successToast, errorToast } from "../../../infrastructure/state/Toast"
import DriverTypeVo from "../../../application/dto/vos/responses/DriverTypeVo"

interface Props {}

const DataSourceNew: FC<Props> = () => {
  const [initialized, setInitialized] = useState<boolean>(false)
  const [name, setName] = useState<string>("")
  const [url, setUrl] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [driverTypeId, setDriverTypeId] = useState<string>("")
  const [driverTypes, setDriverTypes] = useState<Array<DriverTypeVo>>([])

  const navigator = useNavigator()
  const dataSourceUseCase = UseCaseFactory.createDataSourceUseCase()

  useEffect(() => {
    const initialize = async () => {
      const _driverTypes = await dataSourceUseCase.getDriverTypes()
      setDriverTypes(_driverTypes)
      setBreadcrumbs([
        {
          title: "Data source",
        },
      ])
      setInitialized(true)
    }
    initialize()
  }, [])

  const handleCreate = async () => {
    const result = await dataSourceUseCase.register({
      name,
      url,
      username,
      password,
      driverTypeId,
    })
    if (result) {
      successToast({
        title: "Create succeeded.",
        description: "You've finished creating data source well.",
      })
    } else {
      errorToast({
        title: "Create failed.",
        description: "You couldn't create data source because of errors.",
      })
    }
  }

  const handleCancel = () => {
    navigator.toDataSources()
  }

  if (!initialized) {
    return null
  }

  return (
    <VStack gap={6} align="stretch" maxW="800px" mx="auto">
      <Box
        bg="white"
        p={6}
        borderRadius="lg"
        boxShadow="sm"
        borderWidth="1px"
        borderColor="gray.200"
      >
        <VStack align="start" gap={2}>
          <Text fontSize="2xl" fontWeight="bold" color="gray.800">
            Create New Data Source
          </Text>
          <Text fontSize="sm" color="gray.600">
            Configure a new database connection
          </Text>
        </VStack>
      </Box>

      <Box
        bg="white"
        borderRadius="lg"
        boxShadow="sm"
        borderWidth="1px"
        borderColor="gray.200"
        p={8}
      >
        <VStack gap={6} align="stretch">
          <Field.Root>
            <Field.Label fontSize="md" fontWeight="600" color="gray.700">
              Name
            </Field.Label>
            <Input
              size="lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter data source name"
              bg="gray.50"
              borderColor="gray.300"
              _focus={{ bg: "white", borderColor: "blue.400" }}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label fontSize="md" fontWeight="600" color="gray.700">
              URL
            </Field.Label>
            <Input
              size="lg"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter database URL"
              bg="gray.50"
              borderColor="gray.300"
              _focus={{ bg: "white", borderColor: "blue.400" }}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label fontSize="md" fontWeight="600" color="gray.700">
              Username
            </Field.Label>
            <Input
              size="lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              bg="gray.50"
              borderColor="gray.300"
              _focus={{ bg: "white", borderColor: "blue.400" }}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label fontSize="md" fontWeight="600" color="gray.700">
              Password
            </Field.Label>
            <Input
              size="lg"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              bg="gray.50"
              borderColor="gray.300"
              _focus={{ bg: "white", borderColor: "blue.400" }}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label fontSize="md" fontWeight="600" color="gray.700">
              Driver Type
            </Field.Label>
            <NativeSelect.Root size="lg">
              <NativeSelect.Field
                onChange={(e) => setDriverTypeId(e.target.value)}
                value={driverTypeId}
                bg="gray.50"
                borderColor="gray.300"
                _focus={{ bg: "white", borderColor: "blue.400" }}
              >
                <option value="">Select driver type</option>
                {driverTypes.map((driverType) => {
                  return (
                    <option key={driverType.id} value={driverType.id}>
                      {driverType.name}
                    </option>
                  )
                })}
              </NativeSelect.Field>
            </NativeSelect.Root>
          </Field.Root>

          <Box
            pt={4}
            borderTopWidth="1px"
            borderColor="gray.200"
            display="flex"
            justifyContent="flex-end"
          >
            <Wrap gap={3}>
              <WrapItem>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  size="lg"
                  colorScheme="gray"
                >
                  Cancel
                </Button>
              </WrapItem>
              <WrapItem>
                <Button
                  onClick={handleCreate}
                  size="lg"
                  colorScheme="blue"
                  boxShadow="sm"
                >
                  Create Data Source
                </Button>
              </WrapItem>
            </Wrap>
          </Box>
        </VStack>
      </Box>
    </VStack>
  )
}

export default DataSourceNew
