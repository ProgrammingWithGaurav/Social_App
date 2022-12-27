import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import HomePage from '../components/Home.jsx';
import { useStateContext } from '../contexts/StateContext';

export default function Home() {
  const {darkMode, isSidebarOpen, user, handleClick} = useStateContext();
  const router = useRouter();

  useEffect(() => {
    if(!user) router.push('/login'); 
  }, [user])
  return (
    <div>
      <Head>
        <title>Next App</title>
        <meta name="description" content="NextJs App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${darkMode && 'dark bg-gray-800'} w-full h-screen`}>
          <Header />
         {isSidebarOpen &&  <Sidebar />}
         <HomePage />
      </div>
    </div>
  )
}
