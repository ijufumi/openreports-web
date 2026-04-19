import React, { FC, useState, useMemo, useEffect } from "react"
import {
  Input,
  Button,
  VStack,
  HStack,
  Icon,
  Box,
  Flex,
  Text,
  Field,
  InputGroup,
} from "@chakra-ui/react"
import { FormikValues, useFormik } from "formik"
import { z, ZodIssue } from "zod"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
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
      minH="100vh"
      minW="100%"
      bg="nothing.bg"
      color="nothing.text"
      position="relative"
    >
      {/* top-left brand mark */}
      <HStack
        position="absolute"
        top="32px"
        left="48px"
        gap="8px"
        alignItems="baseline"
      >
        <Text
          fontFamily="display"
          fontSize="28px"
          lineHeight="1"
          color="nothing.text"
        >
          ●
        </Text>
        <Text
          fontFamily="mono"
          fontSize="11px"
          letterSpacing="0.25em"
          textTransform="uppercase"
          color="nothing.text"
        >
          OpenReport
        </Text>
      </HStack>

      {/* bottom-left meta */}
      <Text
        position="absolute"
        bottom="32px"
        left="48px"
        fontFamily="mono"
        fontSize="10px"
        letterSpacing="0.2em"
        textTransform="uppercase"
        color="nothing.textDisabled"
      >
        [AUTH_v1 / SECURE_CHANNEL]
      </Text>

      {/* bottom-right meta */}
      <Text
        position="absolute"
        bottom="32px"
        right="48px"
        fontFamily="mono"
        fontSize="10px"
        letterSpacing="0.2em"
        textTransform="uppercase"
        color="nothing.textDisabled"
      >
        ● ONLINE
      </Text>

      {/* left: oversized hero */}
      <Flex
        flex="1.2"
        direction="column"
        justifyContent="center"
        pl="96px"
        pr="48px"
        display={{ base: "none", md: "flex" }}
      >
        <Text
          fontFamily="mono"
          fontSize="11px"
          letterSpacing="0.25em"
          textTransform="uppercase"
          color="nothing.textSecondary"
          mb="24px"
        >
          [01 / ENTER]
        </Text>
        <Text
          fontFamily="heading"
          fontSize={{ md: "72px", lg: "104px" }}
          lineHeight="0.95"
          letterSpacing="-0.04em"
          fontWeight={500}
          color="nothing.text"
        >
          Sign in
          <br />
          to continue.
        </Text>
        <Text
          mt="32px"
          fontFamily="body"
          fontSize="15px"
          color="nothing.textSecondary"
          maxW="420px"
          lineHeight="1.5"
        >
          A minimal workspace for reports, templates, and data sources.
        </Text>
      </Flex>

      {/* right: form column */}
      <Flex
        flex="1"
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        px={{ base: "24px", md: "48px" }}
        maxW={{ base: "100%", md: "520px" }}
        w="100%"
      >
        <Box w="100%" maxW="380px">
          <Text
            fontFamily="mono"
            fontSize="10px"
            letterSpacing="0.25em"
            textTransform="uppercase"
            color="nothing.textSecondary"
            mb="8px"
          >
            Credentials
          </Text>
          <form onSubmit={formik.handleSubmit}>
            <VStack width="100%" gap="20px" align="stretch">
              <Field.Root
                invalid={!!formik.errors.email && !!formik.touched.email}
              >
                <Field.Label
                  fontFamily="mono"
                  fontSize="10px"
                  letterSpacing="0.2em"
                  textTransform="uppercase"
                  color="nothing.textSecondary"
                  mb="4px"
                >
                  Email
                </Field.Label>
                <Input
                  id="email"
                  variant="flushed"
                  value={formik.values.email}
                  placeholder="you@example.com"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fontSize="16px"
                  px={0}
                  borderColor="nothing.border"
                  _focus={{ borderColor: "nothing.text" }}
                />
                <Field.ErrorText
                  fontFamily="mono"
                  fontSize="11px"
                  color="nothing.red"
                >
                  {formik.errors.email}
                </Field.ErrorText>
              </Field.Root>

              <Field.Root
                invalid={!!formik.errors.password && !!formik.touched.password}
              >
                <Field.Label
                  fontFamily="mono"
                  fontSize="10px"
                  letterSpacing="0.2em"
                  textTransform="uppercase"
                  color="nothing.textSecondary"
                  mb="4px"
                >
                  Password
                </Field.Label>
                <InputGroup
                  endElement={
                    <Icon
                      as={showPassword ? AiOutlineEye : AiOutlineEyeInvisible}
                      color="nothing.textSecondary"
                      boxSize={5}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  }
                  endElementProps={{ cursor: "pointer" }}
                >
                  <Input
                    id="password"
                    variant="flushed"
                    value={formik.values.password}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    fontSize="16px"
                    px={0}
                    borderColor="nothing.border"
                    _focus={{ borderColor: "nothing.text" }}
                  />
                </InputGroup>
                <Field.ErrorText
                  fontFamily="mono"
                  fontSize="11px"
                  color="nothing.red"
                >
                  {formik.errors.password}
                </Field.ErrorText>
              </Field.Root>

              <Button
                type="submit"
                size="lg"
                width="100%"
                mt="16px"
                disabled={!canLogin}
                h="52px"
                fontFamily="mono"
                fontSize="12px"
                letterSpacing="0.2em"
                textTransform="uppercase"
              >
                Enter →
              </Button>
            </VStack>
          </form>

          <HStack my="32px" align="center" gap="12px">
            <Box flex="1" h="1px" bg="nothing.border" />
            <Text
              fontFamily="mono"
              fontSize="10px"
              letterSpacing="0.2em"
              textTransform="uppercase"
              color="nothing.textDisabled"
            >
              Or
            </Text>
            <Box flex="1" h="1px" bg="nothing.border" />
          </HStack>

          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            size="lg"
            width="100%"
            h="52px"
            fontFamily="mono"
            fontSize="12px"
            letterSpacing="0.2em"
            textTransform="uppercase"
          >
            <Icon as={FcGoogle} boxSize={5} />
            Continue with Google
          </Button>
        </Box>
      </Flex>
    </Flex>
  )
}

export default Login
