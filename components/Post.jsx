import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisVerticalIcon,
  HeartIcon,
  PaperAirplaneIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Moment from 'react-moment';
import { useState, useEffect } from "react";

import { collection, onSnapshot, setDoc, doc, deleteDoc, query } from "firebase/firestore";
import { db } from "../firebase";
import { useStateContext } from "../contexts/StateContext";


const Post = ({ photoURL, username, postPic, id, timestamp , user_uid}) => {
  const router = useRouter();
  const [comments, setComments] = useState([]);
  const {user} = useStateContext();
  
  
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  
  useEffect(() => onSnapshot(
    query(
      collection(db, 'social_app', id, 'comments'),
    )
    , snapshot => setComments(snapshot.docs.map(doc => ({
      id: doc.id, ...doc.data()
    })))
  ), [db, id])

  
  // Setting number of likes
  useEffect(
    () =>
      onSnapshot(
        collection(db, "social_app", id, "likes"),
        (snapshot) =>
          setLikes(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [db, id]
  );

  
  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "social_app", id, "likes", user.uid));
    } else {
      const audio = new Audio('./like.mp3');
      audio.play();
      audio.loop = false;
      await setDoc(doc(db, "social_app", id, "likes", user.uid), {
        username: user?.displayName,
        id: user?.uid,
      })
    }
  }

  useEffect(() => {
    setHasLiked(
      likes.findIndex(like => like.id === user?.uid)!== -1)
  }, [likes])
  
  const deletePost = async () => {
    if(user.uid === user_uid){
      await deleteDoc(doc(db, 'social_app', id))
    }
  }


  return (
    <div
      className={`flex-1 flex-col flex h-[500px] justify-center shadow bg-white dark:bg-gray-700 dark:text-white space-y-1 mx-auto mb-4 p-4 rounded-2xl`}
    >
      <div className="flex items-center justify-between ">
        <img src={photoURL} className="w-8 h-8 rounded-full" />
        <span className="font-bold w-[80%] text-sm text-gray-700 dark:text-white">
          {username}
          <span className="text-sm font-normal text-gray-600 dark:text-gray-300 ml-2">
          <Moment fromNow className="text-sm pr-5">
                {timestamp?.toDate()}
              </Moment>
          </span>
        </span>
        <span>
         {user.uid === user_uid ?  <XCircleIcon onClick={deletePost} className="post-icon text-red-500" /> : <EllipsisVerticalIcon className="post-icon" />}
        </span>
      </div>

      <img
        src={postPic}
        onClick={() => {
          router.push(`/post/${id}`);
        }}
        className="w-full cursor-pointer h-[90%] rounded-2xl opacity-90 hover:opacity-85"
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-[9px] flex flex-col items-center">
            <HeartIcon onClick={likePost} className={`post-icon ${hasLiked  && 'dark:text-red-400 fill-red-400 text-red-400 scale-125'} `} />
            {likes.length} {likes.length <= 1 ? "like" : "likes"} 
          </span>
          <span className="text-[9px] flex flex-col items-center">
            <ChatBubbleOvalLeftIcon className="post-icon" />
            {comments?.length} {comments?.length <= 1 ? "comment" : "comments"}
          </span>

          <span className="flex flex-col items-center">
            <PaperAirplaneIcon className="post-icon" />
            <span className="text-[9px] flex flex-col items-center opacity-0">
              1
            </span>
          </span>
        </div>
        <span className="flex flex-col items-center">
          <BookmarkIcon className="post-icon" />
          <span className="text-[9px] flex flex-col items-center opacity-0">
            •
          </span>
        </span>
      </div>
    </div>
  );
};

export default Post;
