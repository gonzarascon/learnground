import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import gemoji from 'remark-gemoji';
import { Box, Button, Flex } from '@chakra-ui/react';

import { Heading, Code } from './renderers';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

import { useCourseStore } from '@/lib/store';

const Markdown = ({ source = '' }) => {
  const router = useRouter();
  const [isFirstClass, setIsFirstClass] = useState(false);
  const [isLastClass, setIsLastClass] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const contents = useCourseStore((state) => state.contentsPreview);

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
        setIsLastClass(true);
      }
    }
  }, [router, contents]);

  useEffect(() => {
    if (contents) {
      setHasLoaded(true);
    }
  }, [contents]);

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
      maxH="720px"
    >
      <Box p="10" height="100%" bgColor="white" overflowY="auto">
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
          disabled={!hasLoaded || isFirstClass}
        >
          Clase anterior
        </Button>
        <Button
          colorScheme="blue"
          rightIcon={<ChevronRightIcon />}
          disabled={!hasLoaded}
        >
          Próxima clase
        </Button>
      </Flex>
    </Box>
  );
};

Markdown.propTypes = {
  source: PropTypes.string,
};

export default Markdown;
