import React from "react";
import Head from "next/head";
import { globalStyles } from "@/lib/globalStyle";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>My site</title>
      </Head>

      <Component {...pageProps} />
      <style jsx global>
        {globalStyles}
      </style>
    </>
  );
}

export default MyApp;
