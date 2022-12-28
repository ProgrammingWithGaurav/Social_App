import React from "react";
import { ArrowDownIcon, HeartIcon } from "@heroicons/react/24/solid";
import ReactTimeAgo from "react-time-ago";

const Reply = ({ photoURL, name, comment, timestamp, postedUserComment,repliedMessage: {id} }) => {
  return (
    <div classNmae="flex flex-col border-b border-gray-200 dark:border-gray-800 " style={{marginTop: '10px', marginBottom: '10px'}}>
      <div className="flex items-center justify-around bg-gray-200 dark:bg-gray-800 rounded-lg w-[80%] ml-4 my-1">
        <a href={`#${id}`} className="flex items-center w-[90%] mb-2 ">
        <ArrowDownIcon className='w-4 h-4' text-gray-400 mr-2/>
          <img
            src={photoURL}
            className="h-[1.2rem] w-[1.2rem] rounded-full mr-2"
          />
          <span className="font-bold text-sm text-gray-400">
            {name.toLocaleLowerCase().trim()}
            <span className="text-sm font-semibold ml-1">
              {comment.length > 15 ? comment.splice(0, 15) + '...' : comment}
            </span>
          </span>
        </a>
      </div>

      <div className="flex items-center justify-around">
        <div className="flex items-center w-[90%]">
          <img
            src={photoURL}
            className="h-[1.8rem] w-[1.8rem] rounded-full mr-2"
          />
          <span className="font-bold text-sm">
            {name.toLocaleLowerCase().trim()} <span className='text-blue-400 text-[10px] font-normal'>replied</span>
            <span className="text-sm font-semibold ml-1 text-gray-700 dark:text-gray-200">
              {comment}
            </span>
          </span>
        </div>
        <HeartIcon className="w-[1.8rem] post-icon text-gray-400 " />
      </div>
      <div className=" w-[40%] ml-8 flex justify-between items-center">
        <span className="comment-bottom-text mr-2">
          <ReactTimeAgo date={new Date()} locale="en-US" />
        </span>
        <span className="comment-bottom-text">2 likes</span>
        <span className="comment-bottom-text">Reply</span>
      </div>
    </div>
  );
};

export default Reply;
