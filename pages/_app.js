import React from 'react';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { globalStyles } from '@/lib/globalStyle';
import { useStore } from '@/lib/store';
import theme from '@/lib/theme';
import { AppHead } from '@/components';

function MyApp({ Component, pageProps }) {
  const info = useStore((state) => state.info);
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
