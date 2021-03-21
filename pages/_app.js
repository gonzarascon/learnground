import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { globalStyles } from '@/lib/globalStyle';
import theme from '@/lib/theme';
import { AppHead } from '@/components';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AppHead />
      <Component {...pageProps} />
      <style jsx global>
        {globalStyles}
      </style>
    </ChakraProvider>
  );
}

export default MyApp;
