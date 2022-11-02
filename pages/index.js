import Head from "next/head";
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function Home({ color }) {
  const [data, setData] = useState(null);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      let { data, error } = await supabase
        .from("test")
        .select("title, id, Image,author");

      if (error) {
        console.log(error);
      }
      setData(data);
    };
    getData();
  }, []);

  const send = async () => {
    if (!title && !image) return;
    else {
      setLoading(true);
      await supabase.from("test").insert({ title, Image: image, author: user.user_metadata.full_name });
      setTitle("");
      setImage("");
      window.location.reload();
    }
  };

  //   useEffect(() => {
  //     console.log(data);
  //   }, [data]);

  const login = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) return;
      setUser(data.session.user);
    };
    getData();
  }, []);

  const inputStyle =
    "animate-pulse focus:animate-none focus:outline-pink-500 shadow xl:w-4/12 p-2 my-1 border focus:border-pink-500 rounded bg-rose-300 placeholder-white text-white md:w-8/12 sm:w-10/12 ";

  const headerTextStyle =
    "lg:text-5xl md:text-3xl font-semibold text-rose-600/50 text-center flex-1 animate-bounce";

  return (
    <div className="w-screen h-auto bg-gradient-to-r from-red-200/50 to-pink-400/80">
      <Head>
        <title>Halloween Website</title>
        <link
          rel="icon"
          href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8T6tAurGi4bLaUc1RV6b0zRokkmEG4Q-pQ&usqp=CAU"
        />
      </Head>
      <div className="w-full h-auto m-auto flex flex-col items-center justify-center">
        <div className="flex items-center justify-between w-screen mb-10 px-5 my-10">
          {!user && (
            <>
              <button
                onClick={login}
                className={`bg-rose-500 text-white px-4 py-2 outline-none rounded text-lg font-semibold transition-all duration-500 focus:outline-white/50 ${
                  loading && "animate-bounce"
                }`}
              >
                Login
              </button>
              <h1 className={headerTextStyle}>Halloween Speical</h1>
            </>
          )}

          {user && (
            <>
              <button
                onClick={() => {
                  supabase.auth.signOut();
                  supabase.auth.setSession(null);
                  window.location.reload();
                }}
                className={`bg-rose-500 text-white px-4 py-2 outline-none rounded text-lg font-semibold transition-all duration-500 focus:outline-white/50 ${
                  loading && "animate-bounce"
                }`}
              >
                Log Out
              </button>
              <h1 className={headerTextStyle}>
                Happy Halloween {` `}
                <span className="text-rose-500 border-b-2 border-white cursor-pointer">
                  {user.user_metadata.full_name}
                </span>
              </h1>

              <img
                src={user.user_metadata.avatar_url}
                className="rounded-full w-10 h-10 cursor-pointer"
                alt=""
              />
            </>
          )}
        </div>

{user && (
        <div className='flex flex-col w-screen items-center'>
        <input
          className={inputStyle}
          placeholder="Enter Title..."
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <input
          className={inputStyle}
          placeholder="Enter Image Url"
          type="url"
          onChange={(e) => setImage(e.target.value)}
          value={image}
        />

        <button
          className={`bg-pink-400 text-white p-2 m-2 rounded outline outline-none hover:bg-pink-500 transition-all duration-500 focus:outline-white/50 ${
            loading && "animate-bounce"
          }`}
          onClick={send}
        >
          Send
        </button>

        </div>
        )}
      </div>
      {data && (
        <div className="flex justify-center items-center m-auto flex-wrap">
          {data.map(({ title, Image, id, author }) => (
            <div key={id} className="shadow m-3 rounded-lg group relative">
              <h1
                className={`text-white bg-pink-500 hidden group-hover:inline w-full h-2xl absolute z-10 top-[40%] py-4 px-2 text-lg text-center group-hover:bg-opacity-50`}
              >
                {title}<span className='text-green-300 font-bold text-2xl'>By</span> <span className='font-bold text-2xl'>@</span><span className='text-yellow-200 font-bold'>{author}</span>
              </h1>
              <img
                src={Image}
                className="rounded-lg w-80 h-1/3 object-cover cursor-pointer"
                alt={title}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
