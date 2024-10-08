import React, { FC, useState, useEffect } from "react"
import {
  Box,
  Button,
  Grid,
  GridItem,
  Input,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import useNavigator from "../navigator"
import { errorToast, successToast } from "../../states/Toast"
import UseCaseFactory from "../../usecases/UseCaseFactory"
import useLoginUser from "../../states/LoginUser"
import { setBreadcrumbs } from "../../states/Breadcrumbs"

interface Props {}

const Profile: FC<Props> = () => {
  const [initialized, setInitialized] = useState<boolean>(false)
  const [name, setName] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const navigator = useNavigator()

  const memberUseCase = UseCaseFactory.createMembersUseCase()
  const loginUser = useLoginUser()

  useEffect(() => {
    const initialize = async () => {
      const user = loginUser.get()
      if (user) {
        setName(user.name)
      }
      setBreadcrumbs([
        {
          title: "Profile",
        },
      ])
      setInitialized(true)
    }
    initialize()
  }, [])

  const handleCancel = () => {
    navigator.toTop()
  }

  const handleUpdate = async () => {
    const member = await memberUseCase.update({ name, password })
    if (member) {
      successToast({
        title: "Edit updated.",
        description: "You've finished updating profile well.",
      })
    } else {
      errorToast({
        title: "Edit didn't updated.",
        description: "You couldn't update profile because of errors.",
      })
    }
  }
  if (!initialized) {
    return null
  }

  return (
    <Box
      sx={{ borderRadius: "10px", borderColor: "gray.100", bgColor: "white" }}
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
        <GridItem colSpan={2} h={50} p={5} display="flex" alignItems="center">
          <Text fontWeight={600}>Password</Text>
        </GridItem>
        <GridItem colSpan={3} h={50} display="flex" alignItems="center">
          <Input
            variant="flushed"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </GridItem>
      </Grid>
      <Box mt={1} display="flex" justifyContent="flex-end">
        <Wrap spacingX={2}>
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

export default Profile
