import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import Image from 'next/image';
import Lost404Page from 'public/404-lost-page.svg';

const Custom404Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>404 - Página não encontrada</title>
      </Head>
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <div className="relative w-80 h-80">
          <Image src={Lost404Page} alt="Not found illustration" />
        </div>
        <h1 className="text-8xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold">Página não encontrada</h2>
      </div>
    </>
  );
};

export default Custom404Page;
