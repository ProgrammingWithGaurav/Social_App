import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisVerticalIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { useStateContext } from "../contexts/StateContext";

const Post = ({ photoURL, name, postPic, likes, comments }) => {
  const { themeColor, darkMode } = useStateContext();
  return (
    <div
      className={`flex-1 flex-col flex h-full justify-center bg-white space-y-1shadow-sm mx-auto mb-4 p-4 rounded-2xl`}
    >
      <div className="flex items-center justify-between">
        <img src={photoURL} className="w-8 h-8 rounded-full" />
        <span className="font-bold text-gray-800 w-[80%]">{name}</span>
        <span>
          <EllipsisVerticalIcon className="post-icon" />
        </span>
      </div>

      <img
        src={postPic}
        className="w-full h-[90%] rounded-2xl opacity-90 hover:opacity-85"
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-[9px] flex flex-col items-center">
            <HeartIcon className="post-icon" />
            {likes} {likes <= 1 ? "like" : "likes"}
          </span>
          <span className="text-[9px] flex flex-col items-center">
            <ChatBubbleOvalLeftIcon className="post-icon" />
            {comments.length} {comments.length <= 1 ? "comment" : "comments"}
          </span>

          <span className="flex flex-col items-center">
          <PaperAirplaneIcon className="post-icon" />
          <span className="text-[9px] flex flex-col items-center opacity-0">1</span>
          </span>
        </div>
        <span className="flex flex-col items-center">
          <BookmarkIcon className="post-icon" />
          <span className="text-[9px] flex flex-col items-center opacity-0">•</span>
          </span>
      </div>
    </div>
  );
};

export default Post;