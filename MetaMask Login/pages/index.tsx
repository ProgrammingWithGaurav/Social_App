import type { NextPage } from "next";
import Head from "next/head";
import {ConnectWallet, useAddress } from "@thirdweb-dev/react";

const Home: NextPage = () => {
  const address = useAddress();
  console.log(address)
  return (
    <div>
      <Head>
        <title>Learning Web3</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col items-center justify-center">
        <ConnectWallet />
        
      </div>
    </div>
  );
};

export default Home;
