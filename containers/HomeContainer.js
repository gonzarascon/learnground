import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { Flex, Heading, Box, Text, Button } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

import { useStore } from '@/lib/store';

const MotionFlex = motion.custom(Flex);

function HomeContainer() {
  const router = useRouter();
  const [userType, setUserType] = useState(null);
  const [setStoreUserType, setAppType] = useStore((state) => [
    state.setUserType,
    state.setAppType,
  ]);

  useEffect(() => {
    //TODO: add prefetchs for all pages
    router.prefetch(`/demo`);
  }, []);

  /**
   * handleClickUserType
   * @param {'instructor' | 'alumn' | null} type
   */
  const handleClickUserType = (type) => {
    setStoreUserType(type);
    setUserType(type);
  };

  /**
   * handleRedirect
   * @param {'no-gamificado' | 'gamificado'} version
   */

  const handleRedirect = (version) => {
    setAppType(version === 'no-gamificado' ? 'normal' : 'gamified');
    router.push(`/demo`);
  };

  return (
    <Box
      height="calc(100vh - 94px - 21px)"
      width="100%"
      as="section"
      overflow="hidden"
    >
      <AnimatePresence exitBeforeEnter>
        {userType === null ? (
          <MotionFlex
            key="firstScreen"
            direction="column"
            align="center"
            justify="center"
            height="100%"
            initial={{ x: '0%', opacity: 0 }}
            animate={{ x: '0%', opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: 'tween' }}
          >
            <Flex
              as="section"
              bgColor="rgba(255,255,255, 0.75)"
              rounded="md"
              w="100%"
              h="100%"
              maxW="800px"
              maxH="500px"
              direction="column"
              align="center"
              justify="center"
            >
              <Box textAlign="center" paddingY="10">
                <Heading>¡Hola! 👋</Heading>
                <Text>
                  Gracias por participar de estas pruebas.
                  <br />
                  Antes de comenzar, por favor eligí tu tipo de usuario:
                </Text>
              </Box>
              <Flex
                wrap="nowrap"
                justify="space-evenly"
                width="100%"
                maxWidth="600px"
              >
                <Button
                  colorScheme="blue"
                  variant="ghost"
                  onClick={() => handleClickUserType('instructor')}
                  color="blue.400"
                >
                  Soy profesor
                </Button>
                <Button
                  colorScheme="blue"
                  variant="ghost"
                  onClick={() => handleClickUserType('alumn')}
                  color="blue.400"
                >
                  Soy alumno
                </Button>
              </Flex>
            </Flex>
          </MotionFlex>
        ) : (
          <MotionFlex
            key="secondScreen"
            direction="column"
            align="center"
            justify="center"
            height="100%"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: '0%', opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'tween' }}
          >
            <Flex
              bgColor="rgba(255,255,255, 0.75)"
              rounded="md"
              as="section"
              w="100%"
              h="100%"
              maxW="800px"
              maxH="500px"
              direction="column"
              align="center"
              justify="center"
            >
              <Flex direction="column" align="center" paddingY="10">
                <Button
                  alignSelf="flex-start"
                  leftIcon={<ArrowBackIcon />}
                  colorScheme="blue"
                  variant="ghost"
                  onClick={() => handleClickUserType(null)}
                  color="blue.400"
                  mb="10"
                >
                  Atrás
                </Button>
                <Heading>¿Cuál demo quieres utilizar?</Heading>
              </Flex>
              <Flex
                wrap="nowrap"
                justify="space-evenly"
                width="100%"
                maxWidth="600px"
              >
                <Button
                  colorScheme="blue"
                  variant="ghost"
                  border="0"
                  color="blue.400"
                  onClick={() => handleRedirect('no-gamificado')}
                >
                  Demo sin gamificar
                </Button>
                <Button
                  colorScheme="blue"
                  color="blue.400"
                  variant="ghost"
                  border="0"
                  onClick={() => handleRedirect('gamificado')}
                >
                  Demo gamificada
                </Button>
              </Flex>
            </Flex>
          </MotionFlex>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default HomeContainer;
