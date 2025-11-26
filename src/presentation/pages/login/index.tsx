import React, { FC, useState, useMemo, useEffect } from "react"
import {
  Input,
  Button,
  VStack,
  Icon,
  Box,
  Flex,
  Text,
  Image,
  Separator,
  Field,
  InputGroup,
} from "@chakra-ui/react"
import { FormikValues, useFormik } from "formik"
import { z, ZodIssue } from "zod"
import { MdOutlineEmail } from "react-icons/md"
import { CgPassword } from "react-icons/cg"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import logoImg from "../../../assets/logo.svg"
import UseCaseFactory from "../../../di/UseCaseFactory"
import useNavigator from "../navigator"
import { errorToast, useToastState } from "@/infrastructure/state/Toast"
import { toaster } from "@/components/ui/toaster"

interface Props {}

const Login: FC<Props> = () => {
  const navigator = useNavigator()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const loginUseCase = UseCaseFactory.createLoginUseCase()
  const toastState = useToastState()

  const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnBlur: true,
    validate: async (values) => {
      const result = formSchema.safeParse(values)
      const errors = {} as { [key: string]: string }
      if (!result.success) {
        result.error.issues.forEach((value: ZodIssue) => {
          errors[value.path.join(".")] = value.message
        })
      }
      return errors
    },
    onSubmit: async (values) => handleLogin(values),
  })

  useEffect(() => {
    if (toastState.message) {
      toaster.create({
        title: toastState.message.getTitle(),
        description: toastState.message.getDescription(),
        type: toastState.message.getStatus(),
        meta: { closable: true },
        onStatusChange: (details: any) => {
          if (details.status === "unmounted") {
            toastState.clear()
          }
        },
      })
    }
  }, [toastState.message])

  const handleLogin = async (values: FormikValues) => {
    const { email, password } = values
    const member = await loginUseCase.login({ email, password })
    if (member) {
      navigator.toTop()
      return
    } else {
      errorToast({
        title: "Login failed.",
        description: "You couldn't logged in report because of some errors.",
      })
    }
  }

  const handleGoogleLogin = async () => {
    const googleUrl = await loginUseCase.getGoogleLoginUrl()
    if (googleUrl != undefined) {
      window.location.replace(googleUrl.url)
    } else {
      errorToast({
        title: "Google login failed.",
        description: "You couldn't logged in report because of some errors.",
      })
    }
  }

  const canLogin = useMemo(() => {
    return formik.isValid && !!formik.touched && !formik.isSubmitting
  }, [formik])

  return (
    <Flex
      minWidth="100%"
      alignItems="center"
      justifyContent="center"
      minHeight="100%"
    >
      <Box
        w="450px"
        bg="white"
        borderRadius="xl"
        boxShadow="xl"
        borderWidth="1px"
        borderColor="gray.200"
      >
        <form onSubmit={formik.handleSubmit}>
          <VStack p={8} gap={6}>
            <Image src={logoImg} alt="logo" w="200px" />
            <Text fontSize="3xl" fontWeight="bold" color="gray.800">
              Welcome Back
            </Text>
            <VStack width="100%" gap={4}>
              <Field.Root
                invalid={!!formik.errors.email && !!formik.touched.email}
              >
                <InputGroup
                  flex={"1"}
                  startElement={
                    <Icon
                      as={MdOutlineEmail}
                      color="gray.500"
                      size="lg"
                    />
                  }
                >
                  <Input
                    id="email"
                    value={formik.values.email}
                    placeholder={"Enter your email address"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </InputGroup>
                <Field.ErrorText>{formik.errors.email}</Field.ErrorText>
              </Field.Root>
              <Field.Root
                invalid={!!formik.errors.password && !!formik.touched.password}
              >
                <InputGroup
                  startElement={
                    <Icon
                      as={CgPassword}
                      color="gray.500"
                      size="lg"
                    />
                  }
                  endElement={
                    <Icon
                      as={showPassword ? AiOutlineEye : AiOutlineEyeInvisible}
                      color="gray.500"
                      size="lg"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  }
                  endElementProps={{ cursor: "pointer", width: "4.5rem" }}
                >
                  <Input
                    id="password"
                    value={formik.values.password}
                    type={showPassword ? "text" : "password"}
                    placeholder={"Enter your password"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </InputGroup>
                <Field.ErrorText>{formik.errors.password}</Field.ErrorText>
              </Field.Root>
            </VStack>
            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              width="100%"
              disabled={!canLogin}
              boxShadow="sm"
            >
              Login
            </Button>
          </VStack>
        </form>
        <Box px={8} pb={8} css={{ position: "relative" }}>
          <Separator my={4} />
          <Text
            css={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "0 10px",
            }}
            color="gray.500"
            fontSize="sm"
          >
            or
          </Text>
        </Box>
        <VStack px={8} pb={8} gap={4}>
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            size="lg"
            width="100%"
          >
            <Icon as={FcGoogle} boxSize={5} />
            Login with Google
          </Button>
        </VStack>
      </Box>
    </Flex>
  )
}

export default Login
