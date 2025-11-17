import React, { FC, useState, useEffect } from "react"
import {
  Box,
  Grid,
  GridItem,
  Text,
  Input,
  Wrap,
  WrapItem,
  Button,
  NativeSelect,
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
        {
          title: "Data source",
        },
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
    <Box
      css={{ borderRadius: "10px", borderColor: "gray.100", bgColor: "white" }}
      p={5}
      w="50%"
    >
      <Grid templateColumns="repeat(5, 1fr)" gap={0}>
        <GridItem
          colSpan={2}
          h={50}
          p={5}
          display="flex"
          alignItems="center"
          bgColor="gray.50"
        >
          <Text fontWeight={600}>Name</Text>
        </GridItem>
        <GridItem
          colSpan={3}
          h={50}
          display="flex"
          alignItems="center"
          bgColor="gray.50"
        >
          <Input
            variant="flushed"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </GridItem>
        <GridItem
          colSpan={2}
          h={50}
          p={5}
          display="flex"
          alignItems="center"
          bgColor="gray.50"
        >
          <Text fontWeight={600}>Url</Text>
        </GridItem>
        <GridItem
          colSpan={3}
          h={50}
          display="flex"
          alignItems="center"
          bgColor="gray.50"
        >
          <Input
            variant="flushed"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </GridItem>
        <GridItem
          colSpan={2}
          h={50}
          p={5}
          display="flex"
          alignItems="center"
          bgColor="gray.50"
        >
          <Text fontWeight={600}>Username</Text>
        </GridItem>
        <GridItem
          colSpan={3}
          h={50}
          display="flex"
          alignItems="center"
          bgColor="gray.50"
        >
          <Input
            variant="flushed"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </GridItem>
        <GridItem
          colSpan={2}
          h={50}
          p={5}
          display="flex"
          alignItems="center"
          bgColor="gray.50"
        >
          <Text fontWeight={600}>Password</Text>
        </GridItem>
        <GridItem
          colSpan={3}
          h={50}
          display="flex"
          alignItems="center"
          bgColor="gray.50"
        >
          <Input
            variant="flushed"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </GridItem>
        <GridItem
          colSpan={2}
          h={50}
          p={5}
          display="flex"
          alignItems="center"
          bgColor="gray.50"
        >
          <Text fontWeight={600}>Driver type</Text>
        </GridItem>
        <GridItem
          colSpan={3}
          h={50}
          display="flex"
          alignItems="center"
          bgColor="gray.50"
        >
          <NativeSelect.Root>
            <NativeSelect.Field
              onChange={(e) => setDriverTypeId(e.target.value)}
              value={driverTypeId}
            >
              {driverTypes.map((driverType) => {
                return (
                  <option key={driverType.id} value={driverType.id}>
                    {driverType.name}
                  </option>
                )
              })}
            </NativeSelect.Field>
          </NativeSelect.Root>
        </GridItem>
      </Grid>
      <Box mt={1} display="flex" justifyContent="flex-end">
        <Wrap gap={2}>
          <WrapItem>
            <Button onClick={handleCancel} variant="outline">
              Cancel
            </Button>
          </WrapItem>
          <WrapItem>
            <Button onClick={handleUpdate}>Update</Button>
          </WrapItem>
        </Wrap>
      </Box>
    </Box>
  )
}

export default DataSourceEdit
