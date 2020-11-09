import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import gemoji from 'remark-gemoji';
import highlight from 'remark-highlight.js';
import footnotes from 'remark-footnotes';
import { Box } from '@chakra-ui/core';

import { Heading } from './renderers';

const Markdown = ({ source = '' }) => {
  const renderers = {
    heading: Heading,
  };

  return (
    <Box overflowY="auto" bg="gray.100" p="5">
      <ReactMarkdown renderers={renderers} plugins={[gfm, gemoji, highlight]}>
        {source}
      </ReactMarkdown>
    </Box>
  );
};

Markdown.propTypes = {
  source: PropTypes.string,
};

export default Markdown;
