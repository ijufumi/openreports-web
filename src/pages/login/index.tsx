import React, { FC, useState } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  VStack,
  InputLeftElement,
  Icon,
  Box,
  Flex,
  Text,
  Image,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { MdOutlineEmail } from "react-icons/md";
import { CgPassword } from "react-icons/cg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import logoImg from "../../assets/logo.png";
import UseCaseFactory from "../../use_cases/UseCaseFactory";
import useNavigator from "../navigator";

interface Props {}

const Login: FC<Props> = () => {
  const navigator = useNavigator();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toast = useToast();
  const loginUseCase = UseCaseFactory.createLoginUseCase();

  const handleLogin = async () => {
    const member = await loginUseCase.login({ email, password });
    if (member) {
      navigator.toTop();
      return;
    } else {
      toast({
        title: "Login failed.",
        description: "You couldn't logged in report because of some errors.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleGoogleLogin = async () => {
    const googleUrl = await loginUseCase.getGoogleLoginUrl();
    if (googleUrl != undefined) {
      window.location.replace(googleUrl.url);
    } else {
      toast({
        title: "Google login failed.",
        description: "You couldn't logged in report because of some errors.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Flex
      minWidth="100%"
      alignItems="center"
      justifyContent="center"
      minHeight="100%"
    >
      <Box w="450px" bg={"white"} borderRadius="10px">
        <VStack margin={"10px"} spacing={"25px"}>
          <Image src={logoImg} alt={"logo"} margin={"10px"} />
          <Text fontSize="3xl">Login</Text>
          <VStack width={"90%"} spacing={"15px"}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={
                  <Icon
                    as={MdOutlineEmail}
                    color="gray.500"
                    w={10}
                    h={10}
                    style={{ padding: "0 5px 0 5px" }}
                  />
                }
              />
              <Input
                id="email"
                value={email}
                placeholder={"Enter your email address"}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={
                  <Icon
                    as={CgPassword}
                    color="gray.500"
                    w={10}
                    h={10}
                    style={{ padding: "0 5px 0 5px" }}
                  />
                }
              />
              <Input
                id="password"
                value={password}
                type={showPassword ? "text" : "password"}
                placeholder={"Enter your password"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem" cursor="pointer">
                <Icon
                  as={showPassword ? AiOutlineEye : AiOutlineEyeInvisible}
                  color="gray.500"
                  w={8}
                  h={8}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </InputRightElement>
            </InputGroup>
          </VStack>
          <Button onClick={handleLogin} variant="login">
            Login
          </Button>
        </VStack>
        <Box margin={"10px"} sx={{ position: "relative" }}>
          <Divider />
          <Text
            sx={{ position: "absolute", top: -3, left: 210 }}
            color="gray.400"
          >
            or
          </Text>
        </Box>
        <VStack margin={"10px"} spacing={"25px"}>
          <Button
            leftIcon={<Icon as={FcGoogle} />}
            onClick={handleGoogleLogin}
            variant="login"
          >
            Login with Google
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Login;