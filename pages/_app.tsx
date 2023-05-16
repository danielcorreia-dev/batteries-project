import Provider from '@/components/layouts/Provider';
import UserProvider from '@/components/layouts/UserProvider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Batteries Project</title>
      </Head>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
