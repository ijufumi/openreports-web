import React, { FC, useState, useEffect } from "react"
import {
  Box,
  Button,
  Grid,
  GridItem,
  Input,
  InputRightElement,
  InputGroup,
  Text,
  Wrap,
  WrapItem,
  Icon,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useFormik } from "formik"
import { z, ZodIssue } from "zod"
import useNavigator from "../navigator"
import { errorToast, successToast } from "../../../infrastructure/state/Toast"
import UseCaseFactory from "../../../di/UseCaseFactory"
import { setBreadcrumbs } from "../../../infrastructure/state/Breadcrumbs"

interface Props {}

const Profile: FC<Props> = () => {
  const [initialized, setInitialized] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const navigator = useNavigator()

  const memberUseCase = UseCaseFactory.createMembersUseCase()

  const formSchema = z.object({
    name: z.string().max(100, "Name length is too long"),
    password: z
      .string()
      .refine((password) => password.length < 1 || /[A-Z]/.test(password), {
        message: "Should include a uppercase Alphabet at least",
      })
      .refine((password) => password.length < 1 || /[a-z]/.test(password), {
        message: "Should include a lower Alphabet at least",
      })
      .refine((password) => password.length < 1 || /[0-9]/.test(password), {
        message: "Should include a number at least",
      })
      .refine(
        (password) => password.length < 1 || /[!@#$%^&*]/.test(password),
        {
          message: "Should include a special character at least",
        }
      ),
  })
  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validateOnBlur: true,
    validate: async (values) => {
      const result = formSchema.safeParse(values)
      const errors = {} as { [key: string]: string }
      const allErrors = {} as { [key: string]: string[] }
      if (!result.success) {
        result.error.issues.forEach((value: ZodIssue) => {
          const key = value.path.join(".")
          if (!(key in allErrors)) {
            allErrors[key] = []
          }
          allErrors[key].push(value.message)
        })
      }
      for (const key in allErrors) {
        errors[key] = allErrors[key].join(",")
      }
      return errors
    },
    onSubmit: async (values) => handleUpdate(values),
  })

  useEffect(() => {
    const initialize = async () => {
      const user = await memberUseCase.user()
      if (user) {
        await formik.setFieldValue("name", user.name)
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

  const handleUpdate = async (args: { name: string; password: string }) => {
    const member = await memberUseCase.update(args)
    if (member) {
      successToast({
        title: "Edit updated.",
        description: "You've finished updating profile well.",
      })
      await formik.setFieldValue("password", "")
      setShowPassword(false)
    } else {
      errorToast({
        title: "Edit didn't updated.",
        description: "You couldn't update profile because of errors.",
      })
    }
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
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
      <form onSubmit={formik.handleSubmit}>
        <Grid templateColumns="repeat(5, 1fr)" gap={0}>
          <GridItem
            key="name-label"
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
            key="name-value"
            colSpan={3}
            minH={50}
            display="flex"
            alignItems="center"
            bgColor="gray.50"
          >
            <FormControl
              isInvalid={!!formik.errors.name && !!formik.touched.name}
            >
              <Input
                variant="flushed"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem
            key="password-label"
            colSpan={2}
            h={50}
            p={5}
            display="flex"
            alignItems="center"
          >
            <Text fontWeight={600}>Password</Text>
          </GridItem>
          <GridItem
            key="password-value"
            colSpan={3}
            minH={50}
            display="flex"
            alignItems="center"
          >
            <FormControl
              isInvalid={!!formik.errors.password && !!formik.touched.password}
            >
              <InputGroup>
                <Input
                  variant="flushed"
                  value={formik.values.password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <InputRightElement width="4.5rem" cursor="pointer">
                  <Icon
                    as={showPassword ? AiOutlineEye : AiOutlineEyeInvisible}
                    color="gray.500"
                    w={8}
                    h={8}
                    onClick={handleShowPassword}
                  />
                </InputRightElement>
              </InputGroup>
              {formik.errors.password
                ?.split(",")
                .map((e: string) => (
                  <FormErrorMessage key={e}>{e}</FormErrorMessage>
                ))}
            </FormControl>
          </GridItem>
        </Grid>
        <Box mt={1} display="flex" justifyContent="flex-end">
          <Wrap spacingX={2}>
            <WrapItem key="cancel-button">
              <Button onClick={handleCancel} variant="outline">
                Cancel
              </Button>
            </WrapItem>
            <WrapItem key="submit-button">
              <Button type="submit">Update</Button>
            </WrapItem>
          </Wrap>
        </Box>
      </form>
    </Box>
  )
}

export default Profile
