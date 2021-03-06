import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link as ChakraLink,
  Text,
  useToast,
} from '@chakra-ui/react';
import { getById, login } from '@/lib/firebase/dataFunctions';
import { useUserStore, useStore } from '@/lib/store';

const LoginContainer = () => {
  const router = useRouter();
  const toast = useToast();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const setLoggedIn = useStore((state) => state.setLoggedIn);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    router.prefetch('/demo/gamificado');
  }, []);

  const handleInputChange = (key, value) => {
    setLoginData({ ...loginData, [key]: value });
  };

  const handleLogin = () => {
    login({ email: loginData.email, password: loginData.password })
      .then((response) =>
        getById('users', response.user.uid).then((userData) => {
          if (userData.data()) {
            setUser({ user: userData.data(), uid: response.user.uid });
            setLoggedIn(true);

            if (router.query.fromCourse === 'true' && router.query.courseSlug) {
              router.push(`/demo/curso/${router.query.courseSlug}`);
              return;
            }

            router.push('/demo');
          }
        })
      )
      .catch(() => {
        toast({
          title: 'Ocurrió un error',
          description: 'Por favor, inténtalo nuevamente.',
          status: 'error',
          duration: 5000,
          position: 'top',
        });
      });
  };

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
        bgColor="gray.50"
      >
        <Heading as="h3">Iniciar Sesión</Heading>

        <FormControl my={3}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </FormControl>
        <FormControl my={3}>
          <FormLabel>Contraseña</FormLabel>
          <Input
            type="password"
            onChange={(e) => handleInputChange('password', e.target.value)}
          />
        </FormControl>

        <Button
          colorScheme="green"
          disabled={loginData.email === '' || loginData.password === ''}
          onClick={handleLogin}
        >
          Iniciar sesión
        </Button>

        <Text color="gray.400" mt={5}>
          ¿No tienes cuenta?{' '}
          <Link href="/auth/registro">
            <ChakraLink>Registrate ahora.</ChakraLink>
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
};

export default LoginContainer;
