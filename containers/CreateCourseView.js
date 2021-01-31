import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Box,
  Divider,
  Flex,
  Heading,
  Text,
  Input,
  Button,
} from '@chakra-ui/react';
import Select from 'react-select';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import {
  createCourse,
  getById,
  updateCollection,
} from '@/lib/firebase/dataFunctions';
import { useStore, useUserStore } from '@/lib/store';

const StepLabel = ({ number, label, active }) => {
  return (
    <Flex direction="column" align="center" w="100%" maxW="150px">
      <Flex
        bg={active ? 'blue.200' : 'gray.200'}
        rounded="100%"
        p="15px"
        color="white"
        w="50px"
        h="50px"
        justify="center"
        align="center"
      >
        <Text>{number}</Text>
      </Flex>
      <Text mt="3" color={!active && 'gray.300'}>
        {label}
      </Text>
    </Flex>
  );
};

StepLabel.propTypes = {
  active: PropTypes.bool,
  label: PropTypes.string,
  number: PropTypes.string,
};

const MotionBox = motion.custom(Flex);

const CreateCourseView = ({ categories }) => {
  const router = useRouter();
  const appType = useStore((state) => state.appType);
  const [uid, createdCourses] = useUserStore((state) => [
    state.uid,
    state.user.createdCourses,
  ]);
  const [step, setStep] = useState(1);
  const [courseInfo, setCourseInfo] = useState({
    title: '',
    category: '',
  });

  const BoxVariants = {
    initial: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  /**
   * handleInfo
   * @param {{key: 'title' | 'category'; value: string}} Obj
   */
  const handleInfo = ({ key, value }) => {
    setCourseInfo((state) => ({ ...state, [key]: value }));
  };

  const handleSubmit = async () => {
    const courseId = await createCourse({
      title: courseInfo.title,
      category: courseInfo.category,
      uid,
    });

    await updateCollection('users', uid, {
      createdCourses: [...createdCourses, courseId],
    });

    await getById('courses', courseId).then((response) => {
      if (response.data()) {
        const pathType = appType === 'normal' ? 'no-gamificado' : 'gamificado';
        const slug = response.data().slug;
        router.push(`/demo/${pathType}/curso/${slug}/editar`);
      }
    });
  };

  return (
    <Flex direction="column" align="center" w="100%">
      <Box w="100%" maxW="600px" py="5">
        <Heading as="h4" fontSize="lg" color="gray.400" textAlign="center">
          Crear un nuevo curso
        </Heading>
        <Flex wrap="nowrap" align="center" justify="space-evenly">
          <StepLabel number="1" active={step === 1} label="Primer paso" />
          <Divider orientation="horizontal" mx="5" maxW="200px" />
          <StepLabel number="2" active={step === 2} label="Segundo paso" />
        </Flex>
      </Box>
      <AnimatePresence exitBeforeEnter>
        {step === 1 ? (
          <MotionBox
            key="step_1"
            mt="10"
            direction="column"
            align="center"
            justify="space-between"
            variants={BoxVariants}
            initial="initial"
            animate="visible"
            exit="exit"
          >
            <Heading>Démosle un nombre a tu nuevo curso</Heading>
            <Input
              variant="flushed"
              placeholder="Mi curso súper especial"
              mt="5"
              value={courseInfo.title}
              onChange={(e) =>
                handleInfo({ key: 'title', value: e.target.value })
              }
            />

            <Button
              colorScheme="blue"
              mt="10"
              onClick={() => (courseInfo !== '' ? setStep(2) : null)}
            >
              Continuar
            </Button>
          </MotionBox>
        ) : (
          <MotionBox
            key="step_2"
            mt="10"
            direction="column"
            align="center"
            justify="space-between"
            variants={BoxVariants}
            initial="initial"
            animate="visible"
            exit="exit"
          >
            <Heading>Elige una categoría para tu nuevo curso</Heading>
            <Box w="100%" maxW="600px" mt="10">
              <Select
                options={categories ? categories : []}
                placeholder="Busca una categoría"
                isClearable
                getOptionLabel={(option) => option.fields.name}
                isSearchable
                getOptionValue={(option) => option.fields.id}
                value={courseInfo.category}
                onChange={(v, action) => {
                  if (action.action === 'clear') {
                    handleInfo({ key: 'category', value: '' });
                  }
                  v ? handleInfo({ key: 'category', value: v }) : null;
                }}
              />
            </Box>
            <Flex
              wrap="nowrap"
              justify="space-between"
              mt="10"
              align="center"
              width="100%"
              maxW="300px"
            >
              <Button
                leftIcon={<ChevronLeftIcon />}
                variant="ghost"
                colorScheme="blue"
                alignSelf="flex-start"
                onClick={() => setStep(1)}
              >
                Atrás
              </Button>
              <Button colorScheme="blue" onClick={handleSubmit}>
                Continuar
              </Button>
            </Flex>
          </MotionBox>
        )}
      </AnimatePresence>
    </Flex>
  );
};

CreateCourseView.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      fields: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
      }),
    })
  ),
};

export default CreateCourseView;
