import { useState, useEffect } from "react";
import { ArrowDownIcon, HeartIcon } from "@heroicons/react/24/solid";
import Moment from "react-moment";
import { useStateContext } from "../../contexts/StateContext";

import {
  collection,
  onSnapshot,
  setDoc,
  doc,
  deleteDoc,
  query,
  user_uid
} from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/router";

const Reply = ({
  photoURL,
  username,
  comment,
  timestamp,
  id,
  replyMessage: {repliedMessage},
  user_uid,
}) => {
  const { setReplyMessage, user } = useStateContext();

  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const {query} = useRouter();

  // Setting number of likes
  useEffect(
    () =>
      onSnapshot(
        collection(db, "social_app", id, "comment_likes"),
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

  const handleDelete = async () => {
    await deleteDoc(doc(db, "social_app", query?.CommentPage[0], "comments", id));
  };

  const likeReply = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "social_app", id, "comment_likes", user.uid));
    } else {
      await setDoc(doc(db, "social_app", id, "comment_likes", user.uid), {
        username: user?.displayName,
        id: user?.uid,
      });
    }
  };

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === user?.uid) !== -1);
  }, [likes]);

  const handleReply = () => {
    setReplyMessage({
      repliedMessage: {
        id: id,
        username: username,
        photoURL: photoURL,
        comment: comment,
      },
    });
  };
  return (
    <div
      classNmae="flex flex-col border-b border-gray-200 dark:border-gray-800 "
      style={{ marginTop: "10px", marginBottom: "10px" }}
    >
      <div className="flex items-center justify-around bg-gray-200 dark:bg-gray-800 rounded-lg w-[80%] ml-4 my-1">
        <a
          href={`#${repliedMessage.id}`}
          className="flex items-center w-[90%] mb-2 "
        >
          <ArrowDownIcon className="w-4 h-4" text-gray-400 mr-2 />
          <img
            src={repliedMessage.photoURL}
            className="h-[1.2rem] w-[1.2rem] rounded-full mr-2"
          />
          <span className="font-bold text-sm text-gray-400">
            {repliedMessage?.username?.toLocaleLowerCase().trim()}
            <span className="text-sm font-semibold ml-1">
              {repliedMessage?.comment?.length > 15
                ? repliedMessage?.comment?.splice(0, 15) + "..."
                : repliedMessage?.comment}
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
            {username.toLocaleLowerCase().trim()}{" "}
            <span className="text-blue-400 text-[10px] font-normal">
              replied
            </span>
            <span className="text-sm font-semibold ml-1 text-gray-700 dark:text-gray-200">
              {comment}
            </span>
          </span>
        </div>
        <HeartIcon className={`w-[1.8rem] sidebar-icon text-gray-400 ${hasLiked  && 'dark:text-red-400 fill-red-400 text-red-400 scale-125'}`} onClick={likeReply} />
      </div>
      <div className=" w-[40%] ml-8 flex justify-between items-center">
        <span className="comment-bottom-text mr-2">
          <Moment fromNow>{timestamp?.toDate()}</Moment>
        </span>
        <span className="comment-bottom-text">{likes.length} {likes.length === 0 ? 'like' : 'likes'}</span>
        <span className="comment-bottom-text" onClick={handleReply}>
          Reply
        </span>
        
        {user?.uid === user_uid && (
          <span className="comment-bottom-text ml-2" onClick={handleDelete}>
            Delete
          </span>
        )}
      </div>
      
    </div>
  );
};

export default Reply;
