import React , {useEffect, useState} from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import Moment from "react-moment";
import { useStateContext } from "../../contexts/StateContext";



import { collection, onSnapshot, setDoc, doc, deleteDoc, query } from "firebase/firestore";
import { db } from "../../firebase";

const Comment = ({ photoURL, comment, timestamp, postedUserComment , id, username, title}) => {
  const { setReplyMessage, replyMessage, user} = useStateContext();
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState([]);

  
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

  
  const likeComment = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "social_app", id, "comment_likes", user.uid));
    } else {
      await setDoc(doc(db, "social_app", id, "comment_likes", user.uid), {
        username: user?.displayName,
        id: user?.uid,
      })
    }
  }

  useEffect(() => {
    setHasLiked(
      likes.findIndex(like => like.id === user?.uid)!== -1)
  }, [likes])



  const handleReply = () => {
    setReplyMessage({
              repliedMessage: {
                id: id,
                username: username,
                photoURL: photoURL,
                comment: comment
              },
    })
  }
  const handleReplyToPostSender = () => {
    setReplyMessage({
              repliedMessage: {
                id: id,
                username: username,
                photoURL: photoURL,
                comment: title
              },
    })
    console.log(replyMessage)
  }
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
          <HeartIcon className={`w-[1.8rem] sidebar-icon text-gray-400 ${hasLiked  && 'dark:text-red-400 fill-red-400 text-red-400 scale-125'}`} onClick={likeComment} />
        )}
      </div>

      <div className=" w-[40%] ml-8 flex justify-between items-center">
        <span className="comment-bottom-text mr-2">
        <Moment fromNow className="text-sm pr-5">
                {timestamp?.toDate()}
              </Moment>
        </span>
        <span className="comment-bottom-text">{likes.length} {likes.length === 0 ? 'like' : 'likes'}</span>
        {postedUserComment ? (
        <span className="comment-bottom-text" onClick={handleReplyToPostSender}>Reply</span>
          ): (
            <span className="comment-bottom-text" onClick={handleReply}>Reply</span>
        )}
      </div>
    </div>
  );
};

export default Comment;
