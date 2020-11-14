import Document, { Html, Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';
import { ColorModeScript } from '@chakra-ui/react';

class MyDocument extends Document {
  render() {
    const styles = flush();
    return (
      <Html>
        <Head>{styles}</Head>
        <body>
          <ColorModeScript initialColorMode="light" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
