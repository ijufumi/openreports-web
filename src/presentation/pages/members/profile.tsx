import React, { FC, useState, useEffect } from "react"
import {
  Box,
  Button,
  Input,
  Text,
  Wrap,
  WrapItem,
  Icon,
  Field,
  InputGroup,
  VStack,
} from "@chakra-ui/react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useFormik } from "formik"
import { z, ZodIssue } from "zod"
import useNavigator from "../navigator"
import { errorToast, successToast } from "@/infrastructure/state/Toast"
import UseCaseFactory from "../../../di/UseCaseFactory"
import { setBreadcrumbs } from "@/infrastructure/state/Breadcrumbs"

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
            Profile Settings
          </Text>
          <Text fontSize="sm" color="gray.600">
            Update your personal information and password
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
        <form onSubmit={formik.handleSubmit}>
          <VStack gap={6} align="stretch">
            <Field.Root
              invalid={!!formik.errors.name && !!formik.touched.name}
            >
              <Field.Label fontSize="md" fontWeight="600" color="gray.700">
                Name
              </Field.Label>
              <Input
                id="name"
                size="lg"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your name"
                bg="gray.50"
                borderColor="gray.300"
                _focus={{ bg: "white", borderColor: "blue.400" }}
              />
              <Field.ErrorText>{formik.errors.name}</Field.ErrorText>
            </Field.Root>

            <Field.Root
              invalid={!!formik.errors.password && !!formik.touched.password}
            >
              <Field.Label fontSize="md" fontWeight="600" color="gray.700">
                Password
              </Field.Label>
              <InputGroup
                endElement={
                  <Icon
                    as={showPassword ? AiOutlineEye : AiOutlineEyeInvisible}
                    color="gray.500"
                    boxSize={5}
                    onClick={handleShowPassword}
                  />
                }
                endElementProps={{ cursor: "pointer", pr: 3 }}
              >
                <Input
                  id="password"
                  size="lg"
                  value={formik.values.password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password (optional)"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  bg="gray.50"
                  borderColor="gray.300"
                  _focus={{ bg: "white", borderColor: "blue.400" }}
                />
              </InputGroup>
              {formik.errors.password && (
                <VStack align="start" gap={1} mt={2}>
                  {formik.errors.password
                    .split(",")
                    .map((e: string) => (
                      <Field.ErrorText key={e}>{e}</Field.ErrorText>
                    ))}
                </VStack>
              )}
            </Field.Root>

            <Box
              pt={4}
              borderTopWidth="1px"
              borderColor="gray.200"
              display="flex"
              justifyContent="flex-end"
            >
              <Wrap gap={3}>
                <WrapItem key="cancel-button">
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    size="lg"
                    colorScheme="gray"
                  >
                    Cancel
                  </Button>
                </WrapItem>
                <WrapItem key="submit-button">
                  <Button
                    type="submit"
                    size="lg"
                    colorScheme="blue"
                    boxShadow="sm"
                  >
                    Update Profile
                  </Button>
                </WrapItem>
              </Wrap>
            </Box>
          </VStack>
        </form>
      </Box>
    </VStack>
  )
}

export default Profile
