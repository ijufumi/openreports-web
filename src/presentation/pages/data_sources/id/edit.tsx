import React, { FC, useState, useEffect } from "react"
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  NativeSelect,
  Field,
} from "@chakra-ui/react"
import useNavigator from "../../navigator"
import UseCaseFactory from "../../../../di/UseCaseFactory"
import { setBreadcrumbs } from "../../../../infrastructure/state/Breadcrumbs"
import { successToast, errorToast } from "../../../../infrastructure/state/Toast"
import DriverTypeVo from "../../../../application/dto/vos/responses/DriverTypeVo"
import { useParams } from "react-router"

interface Props {}

const DataSourceEdit: FC<Props> = () => {
  const [initialized, setInitialized] = useState<boolean>(false)
  const [name, setName] = useState<string>("")
  const [url, setUrl] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [driverTypeId, setDriverTypeId] = useState<string>("")
  const [driverTypes, setDriverTypes] = useState<Array<DriverTypeVo>>([])

  const params = useParams()
  const navigator = useNavigator()
  const dataSourceUseCase = UseCaseFactory.createDataSourceUseCase()

  const id = !!params?.id ? params.id : ""

  useEffect(() => {
    const initialize = async () => {
      if (id) {
        const _dataSource = await dataSourceUseCase.getById({ id })
        if (_dataSource) {
          setName(_dataSource.name)
          setUrl(_dataSource.url)
          setUsername(_dataSource.username)
          setPassword(_dataSource.password)
          setDriverTypeId(_dataSource.driverTypeId)
        } else {
          navigator.toNotfoundError()
          return
        }
      }
      const _driverTypes = await dataSourceUseCase.getDriverTypes()
      setDriverTypes(_driverTypes)
      setBreadcrumbs([
        { func: navigator.toDataSources, title: "Data Sources" },
        { title: id },
      ])
      setInitialized(true)
    }
    initialize()
  }, [])

  const handleUpdate = async () => {
    const result = await dataSourceUseCase.update({
      id,
      name,
      url,
      username,
      password,
      driverTypeId,
    })
    if (result) {
      successToast({
        title: "Update succeeded.",
        description: "You've finished updating data source well.",
      })
    } else {
      errorToast({
        title: "Update failed.",
        description: "You couldn't update data source because of errors.",
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
    <VStack gap="48px" align="stretch" maxW="720px">
      <Box>
        <Text
          fontFamily="mono"
          fontSize="10px"
          letterSpacing="0.25em"
          textTransform="uppercase"
          color="nothing.textSecondary"
          mb="8px"
        >
          [Data Sources / Edit]
        </Text>
        <Text
          fontFamily="heading"
          fontSize="56px"
          lineHeight="1"
          letterSpacing="-0.03em"
          fontWeight={500}
          color="nothing.text"
        >
          {name || "Untitled"}
        </Text>
        <Text
          mt="12px"
          fontFamily="mono"
          fontSize="12px"
          color="nothing.textDisabled"
        >
          {id}
        </Text>
      </Box>

      <VStack
        gap="32px"
        align="stretch"
        borderTopWidth="1px"
        borderColor="nothing.text"
        pt="32px"
      >
        <Field.Root>
          <Field.Label
            fontFamily="mono"
            fontSize="10px"
            letterSpacing="0.2em"
            textTransform="uppercase"
            color="nothing.textSecondary"
            mb="8px"
          >
            Name
          </Field.Label>
          <Input
            variant="flushed"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fontSize="17px"
            px={0}
            borderColor="nothing.border"
            _focus={{ borderColor: "nothing.text" }}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label
            fontFamily="mono"
            fontSize="10px"
            letterSpacing="0.2em"
            textTransform="uppercase"
            color="nothing.textSecondary"
            mb="8px"
          >
            URL
          </Field.Label>
          <Input
            variant="flushed"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            fontFamily="mono"
            fontSize="15px"
            px={0}
            borderColor="nothing.border"
            _focus={{ borderColor: "nothing.text" }}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label
            fontFamily="mono"
            fontSize="10px"
            letterSpacing="0.2em"
            textTransform="uppercase"
            color="nothing.textSecondary"
            mb="8px"
          >
            Username
          </Field.Label>
          <Input
            variant="flushed"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fontFamily="mono"
            fontSize="15px"
            px={0}
            borderColor="nothing.border"
            _focus={{ borderColor: "nothing.text" }}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label
            fontFamily="mono"
            fontSize="10px"
            letterSpacing="0.2em"
            textTransform="uppercase"
            color="nothing.textSecondary"
            mb="8px"
          >
            Password
          </Field.Label>
          <Input
            variant="flushed"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fontFamily="mono"
            fontSize="15px"
            px={0}
            borderColor="nothing.border"
            _focus={{ borderColor: "nothing.text" }}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label
            fontFamily="mono"
            fontSize="10px"
            letterSpacing="0.2em"
            textTransform="uppercase"
            color="nothing.textSecondary"
            mb="8px"
          >
            Driver
          </Field.Label>
          <NativeSelect.Root variant="plain">
            <NativeSelect.Field
              onChange={(e) => setDriverTypeId(e.target.value)}
              value={driverTypeId}
              fontSize="17px"
              px={0}
              borderBottomWidth="1px"
              borderColor="nothing.border"
              borderRadius={0}
              _focus={{ borderColor: "nothing.text" }}
            >
              {driverTypes.map((driverType) => (
                <option key={driverType.id} value={driverType.id}>
                  {driverType.name}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator color="nothing.textSecondary" />
          </NativeSelect.Root>
        </Field.Root>
      </VStack>

      <HStack justifyContent="flex-end" gap="12px" pt="24px">
        <Button
          variant="outline"
          onClick={handleCancel}
          h="44px"
          fontFamily="mono"
          fontSize="11px"
          letterSpacing="0.2em"
          textTransform="uppercase"
        >
          Cancel
        </Button>
        <Button
          onClick={handleUpdate}
          h="44px"
          fontFamily="mono"
          fontSize="11px"
          letterSpacing="0.2em"
          textTransform="uppercase"
        >
          Update →
        </Button>
      </HStack>
    </VStack>
  )
}

export default DataSourceEdit
