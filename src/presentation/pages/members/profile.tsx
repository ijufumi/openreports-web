import React, { FC, useState, useEffect } from "react"
import {
  Box,
  VStack,
  HStack,
  Button,
  Input,
  Text,
  Icon,
  Field,
  InputGroup,
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
      setBreadcrumbs([{ title: "Profile" }])
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
          [Account / Profile]
        </Text>
        <Text
          fontFamily="heading"
          fontSize="56px"
          lineHeight="1"
          letterSpacing="-0.03em"
          fontWeight={500}
          color="nothing.text"
        >
          Profile.
        </Text>
        <Text
          mt="12px"
          fontSize="14px"
          color="nothing.textSecondary"
          maxW="480px"
        >
          Update your personal information and password.
        </Text>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <VStack
          gap="32px"
          align="stretch"
          borderTopWidth="1px"
          borderColor="nothing.text"
          pt="32px"
        >
          <Field.Root
            invalid={!!formik.errors.name && !!formik.touched.name}
          >
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
              id="name"
              variant="flushed"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Your name"
              fontSize="17px"
              px={0}
              borderColor="nothing.border"
              _focus={{ borderColor: "nothing.text" }}
            />
            <Field.ErrorText
              fontFamily="mono"
              fontSize="11px"
              color="nothing.red"
            >
              {formik.errors.name}
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
              mb="8px"
            >
              New password
              <Text as="span" ml="8px" color="nothing.textDisabled">
                (optional)
              </Text>
            </Field.Label>
            <InputGroup
              endElement={
                <Icon
                  as={showPassword ? AiOutlineEye : AiOutlineEyeInvisible}
                  color="nothing.textSecondary"
                  boxSize={5}
                  onClick={handleShowPassword}
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
                fontSize="17px"
                px={0}
                borderColor="nothing.border"
                _focus={{ borderColor: "nothing.text" }}
              />
            </InputGroup>
            {formik.errors.password && (
              <VStack align="start" gap={1} mt={2}>
                {formik.errors.password
                  .split(",")
                  .map((e: string) => (
                    <Field.ErrorText
                      key={e}
                      fontFamily="mono"
                      fontSize="11px"
                      color="nothing.red"
                    >
                      {e}
                    </Field.ErrorText>
                  ))}
              </VStack>
            )}
          </Field.Root>
        </VStack>

        <HStack justifyContent="flex-end" gap="12px" pt="48px">
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
            type="submit"
            h="44px"
            fontFamily="mono"
            fontSize="11px"
            letterSpacing="0.2em"
            textTransform="uppercase"
          >
            Update →
          </Button>
        </HStack>
      </form>
    </VStack>
  )
}

export default Profile
