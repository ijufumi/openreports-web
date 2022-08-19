import React, { FC, useState } from "react";
import { useNavigate } from "react-router";
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
} from "@chakra-ui/react";
import { MdOutlineEmail } from "react-icons/md";
import { CgPassword } from "react-icons/cg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import logoImg from "../../assets/logo.png";
import actions from "../../actions";

interface Props {}

const Login: FC<Props> = () => {
  const navigation = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = async () => {
    const member = await actions.login(email, password);
    if (member) {
      navigation("/top");
      return;
    }
  };

  const handleGoogleLogin = async () => {
    const googleUrl = await actions.getGoogleLoginUrl();
    if (googleUrl != undefined) {
      window.location.replace(googleUrl.url);
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
          <Button onClick={handleLogin}>Login</Button>
        </VStack>
        <Box margin={"10px"}>
          <Divider />
        </Box>
        <VStack margin={"10px"} spacing={"25px"}>
          <Button leftIcon={<Icon as={FcGoogle} />} onClick={handleGoogleLogin}>
            Login with Google
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Login;
