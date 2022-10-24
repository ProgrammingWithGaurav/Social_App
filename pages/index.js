import React from 'react';
import {useSession, signIn, signOut} from 'next-auth/react';

function Home() {
    const {data: session} = useSession();

    // const session2 = useSession();
    // console.log(session2); // returns {status, data}

    // assigning the value of data to new variable "session", it can be anything instead of session or no need to assign to a variable just
    // const {data} = useSession(); ✅
    if(session) {
        return(
            <div>
                 <p>Welcome, {session.user.email}</p>
                <button className='p-2 text-white bg-rose-500 hover:opacity-80 rounded' onClick={() => signOut()}>Sign Out</button>
                 
            </div>
        )
    } else {
        return (
            <div>
                <h1>Welcome to My Application</h1>
                <p>You are not signed In.</p>
                <button className='p-2 text-white bg-rose-500 hover:opacity-80 rounded' onClick={signIn}>Sign In</button>
            </div>
        )
    }
}

export default Home
