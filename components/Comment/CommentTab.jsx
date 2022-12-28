import { ChevronLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/StateContext";
import Comment from "./Comment";
import Reply from "./Reply";

export default function CommentTab() {
  const { posts, user, setPosts } = useStateContext();
  const router = useRouter();
  const { query: activePost } = useRouter();
  const [input, setInput] = useState("");
  const [comments, setComments] = useState([]);
  const postDetail = posts.filter(
    (post) => post.id === activePost["CommentPage"]
  )[0];

  const sendComment = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      const newComment = {
        id: Math.floor(Math.random() * 10000),
        name: user.displayName,
        comment: input,
        photoURL: user.photoURL,
        timestamp: new Date(),
        type: "comment",
      };
      setInput("");
    }
  };

  useEffect(() => {
    if (activePost) {
      const { comments } = posts?.filter(
        (post) => post?.id === activePost["CommentPage"]
      )[0];
      setComments(comments);
    }
  }, [comments, activePost]);

  return (
    <div
      className={` scrollbar scrollbar-thumb-transparent scrollbar-transparent flex-1 flex-col flex h-[100%] shadow bg-white dark:bg-gray-700 dark:text-white space-y-1 mx-auto mb-4rounded-2xl`}
    >
      <div className="sticky top-0 bg-white dark:bg-gray-800 z-[1000] rounded-none flex items-center justify-between border-b border-gray-50 dark:border-none w-full mt-2 p-2 rounded-b-2xl">
        <ChevronLeftIcon
          className="post-icon"
          onClick={() => router.push("/")}
        />
        <span className="font-semibold flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer text-gray-700 rounded transition dark:text-white dark:hover:bg-gray-800">
          Comments{" "}
          <span className="font-bold bg-gray-300 text-white rounded-full px-4 text-lg ml-1">
            5
          </span>
        </span>
        <PaperAirplaneIcon className="post-icon" />
      </div>
      {/* Comments */}
      <div className="flex flex-col justify-center px-2 h-full">
        <Comment
          {...postDetail}
          comment={postDetail.title}
          postedUserComment={true}
        />
        <span className="w-full border-b border-gray-100 dark:border-gray-800 mb-4" />
        {comments?.map((comment, index) =>
          comment.type === "comment" ? (
            <Comment key={index} {...comment} />
          ) : (
            <Reply key={index} {...comment} />
          )
        )}
      </div>

      {/* Input */}
      <div className="bottom-0 w-full sticky border-gray-50">
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
