import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

interface Props extends AppProps {
  session: any;
}

export default function App({ Component, pageProps, session }: Props) {
  return (
    <>
      <Head>
        <title>Batteries Project</title>
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
