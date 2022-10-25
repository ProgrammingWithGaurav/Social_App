import Head from "next/head";
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Image from "next/image";

function Home({ color }) {
  const [data, setData] = useState(null);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      let { data, error } = await supabase
        .from("test")
        .select("title, id, Image");

      if (error) {
        console.log(error);
      }

      setData(data);
    };
    getData();
  }, []);

  const send = async ()  =>{
    if(!title && !image) return;
    else {
        setLoading(true);
    await supabase
     .from("test")
     .insert({ title, Image: image })
     setTitle('');
     setImage('');
     window.location.reload()
    }
  }

  //   useEffect(() => {
  //     console.log(data);
  //   }, [data]);

  const inputStyle = "animate-pulse focus:animate-none focus:outline-pink-500 shadow w-4/12 p-2 my-1 border focus:border-pink-500 rounded bg-rose-300 placeholder-white text-white";

  return (
    <div className="w-screen h-auto bg-gradient-to-r from-red-200/50 to-pink-400/80">
      <Head>
        <title>Halloween Website</title>
        <link rel="icon" href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8T6tAurGi4bLaUc1RV6b0zRokkmEG4Q-pQ&usqp=CAU" />
      </Head>
      <div className="w-full h-80 m-auto flex flex-col items-center justify-center ">
        <h1 className="text-5xl font-semibold text-rose-600/50 my-4">Halloween Speical</h1>
        <input
          className={inputStyle}
          placeholder="Enter Title..."
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <input
          className={inputStyle}
          placeholder="Enter Image Url"
          type='url'
          onChange={(e) => setImage(e.target.value)}
          value={image}
        />

        <button className={`bg-pink-400 text-white p-2 m-2 rounded outline outline-none hover:bg-pink-500 transition-all duration-500 focus:outline-white/50 ${loading && 'animate-bounce'}`} onClick={send}>Send</button>
      </div>
      {data && (
        <div className="flex justify-center items-center m-auto flex-wrap">
          {data.map(({title, Image, id}) => (
            <div key={id} className="shadow m-3 rounded-lg group relative">
              <h1
                className={`text-white bg-pink-500 hidden group-hover:inline w-full h-2xl absolute z-10 top-[40%] py-4 px-2 text-lg text-center group-hover:bg-opacity-50`}
              >
                {title}
              </h1>
              <Image
                src={Image}
                className="rounded-lg w-40 h-72 object-cover cursor-pointer"
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
