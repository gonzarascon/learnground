import React from 'react';
import Head from 'next/head';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { globalStyles } from '@/lib/globalStyle';
import { useStore } from '@/lib/store';
import theme from '@/lib/theme';
import { AppHead } from '@/components';

function MyApp({ Component, pageProps }) {
  const info = useStore((state) => state.info);
  return (
    <ThemeProvider theme={theme}>
      <AppHead />
      <CSSReset />
      <Component {...pageProps} />
      <style jsx global>
        {globalStyles}
      </style>
    </ThemeProvider>
  );
}

export default MyApp;
