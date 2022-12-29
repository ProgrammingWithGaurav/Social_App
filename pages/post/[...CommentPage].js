import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { useStateContext } from '../../contexts/StateContext';
import HomePage from '../../components/Home';

export default function CommentPage() {
  const {darkMode, isSidebarOpen, user} = useStateContext();
  const router = useRouter();
  console.log(router.query)

  useEffect(() => {
    if(!user) router.push('/login'); 
  }, [user])
  return (
    <div>
      <Head>
        <title>Social App | Post</title>
        <meta name="description" content="NextJs App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${darkMode && 'dark bg-gray-800'} w-full h-screen`}>
          <Header />
         {isSidebarOpen &&  <Sidebar />}
         <HomePage page='comment' />
      </div>
    </div>
  )
}