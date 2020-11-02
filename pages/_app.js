import React from 'react';
import Head from 'next/head';
import { ThemeProvider, ColorModeProvider } from '@chakra-ui/core';
import { globalStyles } from '@/lib/globalStyle';
import { useStore } from '@/lib/store';
import theme from '@/lib/theme';
import { Layout } from '@/components';

function MyApp({ Component, pageProps }) {
  const info = useStore((state) => state.info);
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <Head>
          <title>My site</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <style jsx global>
          {globalStyles}
        </style>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default MyApp;
