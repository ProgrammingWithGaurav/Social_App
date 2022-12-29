import { ChevronLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/StateContext";
import Comment from "./Comment";
import Reply from "./Reply";

import { addDoc, collection, doc, serverTimestamp, getDoc, query , onSnapshot, orderBy} from "firebase/firestore";
import { db } from "../../firebase";

export default function CommentTab() {
  const { posts, user, setPosts } = useStateContext();
  const router = useRouter();
  const { query: activePost } = useRouter();
  const [input, setInput] = useState("");
  const [comments, setComments] = useState([]);
  const [postDetails, setPostDetails] = useState(null);
  console.log(activePost,'hiiii')


  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "social_app", 'WGUazYB0uHW9eJ7fYQ77', "comments"),
          orderBy("timestamp", "asc")
        ),
        (snapshot) =>
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [db, activePost["CommentPage"]]
  );

  useEffect(() => {
    const getPostDetais = async () => {
      const docRef = doc(db, "social_app", 'WGUazYB0uHW9eJ7fYQ77');
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data())
      setPostDetails({...docSnap.data()})
    };
    getPostDetais();
  }, [db, activePost["CommentPage"]]);

  useEffect(() => {console.log(postDetails)}, [postDetails])

  const sendComment = async (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      const commentToSend = input;
      setInput('');
      const newComment = {
        username: user.displayName,
        comment: commentToSend,
        photoURL: user.photoURL,
        timestamp: serverTimestamp(),
        type: "comment",
      };
      await addDoc(
        collection(db, "social_app", 'WGUazYB0uHW9eJ7fYQ77', "comments"),
        newComment
      );
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  return (
    <div
      className={` scrollbar scrollbar-thumb-transparent scrollbar-transparent flex-1 flex-col flex h-[100%] shadow bg-white dark:bg-gray-700 dark:text-white space-y-1 mx-auto mb-12 rounded-2xl`}
    >
      <div className="fixed top-12 w-[23.5rem] bg-white dark:bg-gray-800 z-[1000] rounded-none flex items-center justify-between border-b border-gray-50 dark:border-none mt-2 p-2 rounded-b-2xl">
        <ChevronLeftIcon
          className="post-icon"
          onClick={() => router.push("/")}
        />
        <span className="font-semibold flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer text-gray-700 rounded transition dark:text-white dark:hover:bg-gray-800">
          Comments{" "}
          <span className="font-bold bg-gray-300 text-white rounded-full px-4 text-lg ml-1">
            {comments?.length}
          </span>
        </span>
        <PaperAirplaneIcon className="post-icon" />
      </div>
      {/* Comments */}
      <div className="flex flex-col justify-center px-2 h-full">
        <Comment
          {...postDetails}
          comment={postDetails?.title}
          postedUserComment={true}
        />
        <span className="w-full border-b border-gray-100 dark:border-gray-800 " />
        {comments?.map((comment, index) =>
          comment.type === "comment" ? (
            <Comment key={index} {...comment} />
          ) : (
            <Reply key={index} {...comment} />
          )
        )}
      </div>

      {/* Input */}
      <div className="bottom-0 w-[23.5rem] fixed  border-gray-50">
        <input
          type="text"
          placeholder="Comment..."
          value={input}
          onKeyUp={(e) => sendComment(e)}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border-none p-2 focus:outline-none dark:bg-gray-800 bg-gray-100 rounded-t-xl"
        />
      </div>
    </div>
  );
}
