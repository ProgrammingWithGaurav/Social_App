import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisVerticalIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Moment from 'react-moment';


const Post = ({ photoURL, name, postPic, likes, comment, id, timestamp }) => {
  const router = useRouter();

  return (
    <div
      className={`flex-1 flex-col flex h-[500px] justify-center shadow bg-white dark:bg-gray-700 dark:text-white space-y-1 mx-auto mb-4 p-4 rounded-2xl`}
    >
      <div className="flex items-center justify-between ">
        <img src={photoURL} className="w-8 h-8 rounded-full" />
        <span className="font-bold w-[80%]">
          {name}
          <span className="text-sm font-normal text-gray-600 dark:text-gray-300 ml-2">
          <Moment fromNow className="text-sm pr-5">
                {timestamp?.toDate()}
              </Moment>
          </span>
        </span>
        <span>
          <EllipsisVerticalIcon className="post-icon" />
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
            <HeartIcon className="post-icon" />
            {likes} {likes <= 1 ? "like" : "likes"}
          </span>
          <span className="text-[9px] flex flex-col items-center">
            <ChatBubbleOvalLeftIcon className="post-icon" />
            {comment?.length} {comment?.length <= 1 ? "comment" : "comments"}
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
