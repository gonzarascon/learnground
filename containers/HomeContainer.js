import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Flex,
  Heading,
  Link as ChakraLink,
  Box,
  Text,
  Button,
} from '@chakra-ui/core';

const MotionFlex = motion.custom(Flex);

function HomeContainer() {
  const [userType, setUserType] = useState(null);

  /**
   * handleClickUserType
   * @param {'instructor' | 'alumn' | null} type
   */
  const handleClickUserType = (type) => {
    setUserType(type);
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
            <Box textAlign="center" paddingY="10">
              <Heading>¡Hola! 👋</Heading>
              <Text>
                Gracias por participar de estas pruebas.
                <br />
                Antes de comenzar, por favor indica que tipo de usuario eres:
              </Text>
            </Box>
            <Flex
              wrap="nowrap"
              justify="space-evenly"
              width="100%"
              maxWidth="600px"
            >
              <Button
                variantColor="blue"
                variant="ghost"
                onClick={() => handleClickUserType('instructor')}
              >
                Soy profesor
              </Button>
              <Button
                variantColor="blue"
                variant="ghost"
                onClick={() => handleClickUserType('alumn')}
              >
                Soy alumno
              </Button>
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
            <Box textAlign="center" paddingY="10">
              <Button
                leftIcon="arrow-back"
                variantColor="blue"
                variant="ghost"
                onClick={() => handleClickUserType(null)}
              >
                Atrás
              </Button>
              <Heading>¿Cuál demo quieres utilizar?</Heading>
            </Box>
            <Flex
              wrap="nowrap"
              justify="space-evenly"
              width="100%"
              maxWidth="600px"
            >
              <Button variantColor="blue" variant="ghost" border="0">
                Demo sin gamificar
              </Button>
              <Button variantColor="blue" variant="ghost" border="0">
                Demo gamificada
              </Button>
            </Flex>
          </MotionFlex>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default HomeContainer;
