import { ChevronLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/StateContext";
import Comment from "./Comment";

const PostDetails = () => {
  const [input, setInput] = useState("");
  const [comments, setComments] = useState([]);
  const { handleClick } = useStateContext();

  const sendComment = (e) => {
    if (e.key === "Enter") {
      console.log(input);
      setInput("");
    }
  };

  const {posts } = useStateContext();

  useEffect(() => {
    const { comments } = posts?.filter((post) => post?.id === activePost)[0];
    setComments(comments);
  }, [activePost, comments]);

  return (
    <div
      className={` scrollbar relative scrollbar-thumb-transparent scrollbar-transparent flex-1 flex-col flex h-full shadow bg-white dark:bg-gray-700 dark:text-white space-y-1 mx-auto mb-4rounded-2xl`}
    >
      <div className="flex items-center justify-between border-b border-gray-50 dark:border-none w-full mt-2 p-2 rounded-lg">
        <ChevronLeftIcon
          className="sidebar-icon"
          onClick={() => handleClick("HomePage")}
        />
        <span className="font-semibold flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer text-gray-700 rounded transition dark:text-white dark:hover:bg-gray-800">
          Comments{" "}
          <span className="font-bold bg-gray-300 text-white rounded-full px-4 text-lg ml-1">
            5
          </span>
        </span>
        <PaperAirplaneIcon className="sidebar-icon" />
      </div>
      {/* Comments */}
      <div className="flex flex-col justify-center px-2">
        {comments?.map((comment, index) => (
          <Comment key={index} {...comment}/>
        ))}
      </div>

      {/* Input */}
      <div className="bottom-0 absolute w-full border-gray-50">
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
};

export default PostDetails;
