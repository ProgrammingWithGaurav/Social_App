import React from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import Moment from "react-moment";

const Comment = ({ photoURL, comment, timestamp, postedUserComment , id, username}) => {
  return (
    <div classNmae="flex flex-col border-b border-gray-200 dark:border-gray-800 " id={id}>
      <div className="flex items-center justify-around">
        <div className="flex items-center w-[90%]">
          <img
            src={photoURL}
            className="h-[1.8rem] w-[1.8rem] rounded-full mr-2"
          />
          <span className="font-bold text-sm">
            {username?.toLocaleLowerCase().trim()}
            <span className="text-sm font-semibold ml-1 text-gray-700 dark:text-gray-200">
              {comment}
            </span>
          </span>
        </div>
        {!postedUserComment && (
          <HeartIcon className="w-[1.8rem] sidebar-icon text-gray-400 " />
        )}
      </div>

      <div className=" w-[40%] ml-8 flex justify-between items-center">
        <span className="comment-bottom-text mr-2">
        <Moment fromNow className="text-sm pr-5">
                {timestamp?.toDate()}
              </Moment>
        </span>
        <span className="comment-bottom-text">2 likes</span>
        <span className="comment-bottom-text">Reply</span>
      </div>
    </div>
  );
};

export default Comment;
