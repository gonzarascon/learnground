import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/react';
import { signUp } from '@/lib/firebase/dataFunctions';
import { useStore } from '@/lib/store';

const LoginContainer = () => {
  const router = useRouter();
  const toast = useToast();
  const [signupData, setSignupnData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const userType = useStore((state) => state.userType);

  useEffect(() => {
    router.prefetch('/auth/iniciar-sesion');
  }, []);

  const handleInputChange = (key, value) => {
    setSignupnData({ ...signupData, [key]: value });
  };

  const handleSignup = () => {
    //TODO: handle errors
    signUp({
      username: signupData.username,
      email: signupData.email,
      password: signupData.password,
      userType,
    })
      .then(() => router.push('/demo'))
      .catch(() =>
        toast({
          duration: 5000,
          status: 'error',
          position: 'top',
          title: 'Ocurrió un error.',
          description: 'Por favor, inténtalo nuevamente.',
        })
      );
  };

  const isEmailValid = signupData.email !== '';
  const isPasswordValid = signupData.password.length >= 6;
  const isUsernameValid = signupData.username !== '';

  return (
    <Flex align="center" h="calc(100vh - 94px - 21px)">
      <Flex
        shadow="lg"
        w="100%"
        maxW="450px"
        direction="column"
        align="center"
        m="0 auto"
        p={5}
        bg="white"
      >
        <Heading as="h3">Regístrate</Heading>

        <FormControl my={3}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="usuario@ejemplo.com"
            value={signupData.email}
          />
        </FormControl>
        <FormControl my={3}>
          <FormLabel>Nombre de usuario</FormLabel>
          <Input
            type="text"
            onChange={(e) => handleInputChange('username', e.target.value)}
            placeholder="JuanPerez"
            value={signupData.username}
          />
        </FormControl>
        <FormControl my={3}>
          <FormLabel>Contraseña</FormLabel>
          <Input
            type="password"
            onChange={(e) => handleInputChange('password', e.target.value)}
            value={signupData.password}
          />
          <FormHelperText>
            Debe tener, por lo menos, 6 caracteres de largo.
          </FormHelperText>
        </FormControl>

        <Button
          colorScheme="green"
          disabled={!isEmailValid || !isPasswordValid || !isUsernameValid}
          onClick={handleSignup}
        >
          Registrarme
        </Button>
      </Flex>
    </Flex>
  );
};

export default LoginContainer;
