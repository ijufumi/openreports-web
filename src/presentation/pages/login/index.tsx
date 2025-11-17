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
} from "@chakra-ui/react"
import { InputGroup } from "@/components/ui/input-group"
import { FormikValues, useFormik } from "formik"
import { z, ZodIssue } from "zod"
import { MdOutlineEmail } from "react-icons/md"
import { CgPassword } from "react-icons/cg"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import logoImg from "../../../assets/logo.png"
import UseCaseFactory from "../../../di/UseCaseFactory"
import useNavigator from "../navigator"
import { errorToast, useToastState } from "../../../infrastructure/state/Toast"
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
        onStatusChange: (details) => {
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
      <Box w="450px" bg={"white"} borderRadius="10px">
        <form onSubmit={formik.handleSubmit}>
          <VStack margin={"10px"} gap={"25px"}>
            <Image src={logoImg} alt={"logo"} margin={"10px"} />
            <Text fontSize="3xl">Login</Text>
            <VStack width={"90%"} gap={"15px"}>
              <Field.Root
                invalid={!!formik.errors.email && !!formik.touched.email}
              >
                <InputGroup
                  startElement={
                    <Icon
                      as={MdOutlineEmail}
                      color="gray.500"
                      w={10}
                      h={10}
                      style={{ padding: "0 5px 0 5px" }}
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
                      w={10}
                      h={10}
                      style={{ padding: "0 5px 0 5px" }}
                    />
                  }
                  endElement={
                    <Icon
                      as={showPassword ? AiOutlineEye : AiOutlineEyeInvisible}
                      color="gray.500"
                      w={8}
                      h={8}
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
            <Button type="submit" variant={"login" as any} disabled={!canLogin}>
              Login
            </Button>
          </VStack>
        </form>
        <Box margin={"10px"} css={{ position: "relative" }}>
          <Separator />
          <Text
            css={{ position: "absolute", top: -3, left: 210 }}
            color="gray.400"
          >
            or
          </Text>
        </Box>
        <VStack margin={"10px"} gap={"25px"}>
          <Button
            onClick={handleGoogleLogin}
            variant={"login" as any}
          >
            <Icon as={FcGoogle} />
            Login with Google
          </Button>
        </VStack>
      </Box>
    </Flex>
  )
}

export default Login
