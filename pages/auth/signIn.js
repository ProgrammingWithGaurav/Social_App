import { signIn as signIntoProvider } from 'next-auth/react';

function signIn({ providers }) {
    return (
        <>
            <div className="flex items-center flex-col justify-center min-h-screen py-2 -m-46 px-14 text-center">
                <p className='font-xs italic'>This is not a REAL app, it is built for educational purposes only.</p>
            <div className='mt-40'>
                    <div>
                        <button className='bg-blue-500 rounded-lg p-3 text-white' onClick={() => signIntoProvider('google', {callbackUrl: '/'})}>
                           Sign in with Google
                        </button>
                    </div>
            </div>
            </div>
        </>
    );
}
export default signIn;