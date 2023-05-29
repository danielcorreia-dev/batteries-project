import Provider from '@/contexts/Provider';
import 'react-toastify/dist/ReactToastify.css';
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
