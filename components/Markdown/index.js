import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import gemoji from 'remark-gemoji';
import { Box, Button, Flex } from '@chakra-ui/react';

import { Heading, Code } from './renderers';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

import { useCourseStore, useStore, useUserStore } from '@/lib/store';
import { updateSubscriber } from '@/lib/firebase/dataFunctions';

const Markdown = ({ source = '' }) => {
  const router = useRouter();
  const [isGamified] = useStore((state) => [
    state.appType === 'gamified' ? true : false,
  ]);
  const [isFirstClass, setIsFirstClass] = useState(false);
  const [isLastClass, setIsLastClass] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  /**
   * @type {Array} contents
   */
  const [contents, courseId] = useCourseStore((state) => [
    state.contentsPreview,
    state.courseId,
  ]);

  const uid = useUserStore((state) => state.uid);

  useEffect(() => {
    if (router && contents) {
      const classIndex = contents.findIndex(
        (o) => o.order.toString() === router.query['class-number']
      );

      if (classIndex === 0) {
        setIsFirstClass(true);
      } else if (classIndex === contents.length - 1) {
        /**
         * This **is not** for disabling buttons but for redirection to congrats page
         */
        setIsFirstClass(false);
        setIsLastClass(true);
      } else {
        setIsFirstClass(false);
      }
    }
  }, [router, contents]);

  useEffect(() => {
    if (contents) {
      setHasLoaded(true);
    }
  }, [contents]);

  /**
   *
   * @param {Number | undefined} lastClass
   */
  const updateSubscriberData = async (currentClass) => {
    const progress = (currentClass * 100) / contents.length;
    await updateSubscriber({
      courseUid: courseId,
      userUid: uid,
      data: { lastClass: 2, progress },
    });
  };

  const handleBackButton = () => {
    const currentClass = router.query['class-number'];

    const urlToRedirect = router.asPath.replace(
      `/clase/${currentClass}`,
      `/clase/${parseInt(currentClass) - 1}`
    );

    router.push(urlToRedirect);
  };

  const handleNextButton = () => {
    const currentClass = router.query['class-number'];

    const nextContent = contents.find(
      (o) => o.order === parseInt(currentClass) + 1
    );

    let urlToRedirect;

    if (nextContent) {
      urlToRedirect = router.asPath.replace(
        `/clase/${currentClass}`,
        `/clase/${nextContent.order}`
      );
    } else {
      urlToRedirect = router.asPath.replace(
        `/clase/${currentClass}`,
        `/finalizado`
      );
    }

    updateSubscriberData(currentClass).then(() => router.push(urlToRedirect));
  };

  const renderers = {
    heading: Heading,
    code: Code,
  };

  return (
    <Box
      overflow="hidden"
      borderColor="gray.100"
      borderWidth="2px"
      roundedTopLeft="lg"
      roundedBottomLeft="lg"
      position="relative"
      height="100%"
      w="100%"
    >
      <Box p="10" height="100%" bgColor="white" overflowY="auto" pb="80px">
        <ReactMarkdown renderers={renderers} plugins={[gfm, gemoji]}>
          {source}
        </ReactMarkdown>
      </Box>

      <Flex
        position="sticky"
        left={0}
        bottom={0}
        width="100%"
        bgColor="gray.300"
        py="2"
        px="2"
        align="center"
        justify="space-between"
      >
        <Button
          colorScheme="blue"
          leftIcon={<ChevronLeftIcon />}
          onClick={handleBackButton}
          disabled={!hasLoaded || isFirstClass}
        >
          Clase anterior
        </Button>
        <Button
          colorScheme="blue"
          rightIcon={<ChevronRightIcon />}
          disabled={!hasLoaded}
          onClick={handleNextButton}
        >
          Próxima clase
        </Button>
      </Flex>
      <style jsx>{`
        :global(a) {
          color: #4299e1;
          text-decoration: underline;
        }
        :global(h1, h2, h3, h4, h5, h6) {
          margin-top: 1.25rem;
        }

        :global(img, picture, figure) {
          margin: 1.25rem 0;
        }
      `}</style>
    </Box>
  );
};

Markdown.propTypes = {
  source: PropTypes.string,
};

export default Markdown;
