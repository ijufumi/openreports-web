import React, { FC, useState } from 'react';
import { Input, InputGroup, InputRightElement, Button, Stack, InputLeftElement, Icon  } from '@chakra-ui/react'
import { MdOutlineEmail } from 'react-icons/md'
import { CgPassword } from 'react-icons/cg'

interface Props {

}

const Login: FC<Props> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Stack>
      <InputGroup>
        <InputLeftElement
          pointerEvents='none'
          children={<Icon as={MdOutlineEmail} color='gray.500' w={10} h={10} />}
        />
        <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </InputGroup>
      <InputGroup>
        <InputLeftElement
          pointerEvents='none'
          children={<Icon as={CgPassword} color='gray.500' w={10} h={10} />}
        />
        <Input
          id="password"
          value={password}
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}/>
        <InputRightElement width='4.5rem'>
          <Button onClick={() => setShowPassword(!showPassword)}>
            { showPassword ? 'Hidden' : 'Show' }
          </Button>
        </InputRightElement>
      </InputGroup>
    </Stack>
  );
};

export default Login;
