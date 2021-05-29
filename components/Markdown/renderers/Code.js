import React from 'react';
import dynamic from 'next/dynamic';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Box } from '@chakra-ui/react';
// import { githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs';
const style = dynamic(
  () =>
    import('react-syntax-highlighter/dist/esm/styles/hljs').then(
      (mod) => mod.github
    ),
  { ssr: false }
);

const Code = ({ language, value }) => (
  <Box
    p={2}
    borderY="solid"
    rounded="sm"
    mt={2}
    borderWidth="2px"
    borderColor="gray.100"
  >
    <SyntaxHighlighter
      style={style}
      language={language}
      children={value}
      showLineNumbers
    />
  </Box>
);

export default Code;
