import React from 'react';
import Head from 'next/head';
import { ThemeProvider, ColorModeProvider } from '@chakra-ui/core';
import { globalStyles } from '@/lib/globalStyle';
import { useStore } from '@/lib/store';

function MyApp({ Component, pageProps }) {
  const info = useStore((state) => state.info);
  const unsub1 = useStore.subscribe((state) =>
    console.log('ESTADO SUBSCRIPTO', state)
  );
  return (
    <ThemeProvider>
      <ColorModeProvider>
        <Head>
          <title>My site</title>
        </Head>
        {console.log('info', info)}
        <Component {...pageProps} />
        <style jsx global>
          {globalStyles}
        </style>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default MyApp;
