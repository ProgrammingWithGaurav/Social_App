import React from "react";
import { useStateContext } from "../contexts/StateContext";
import CommentTab from "./Comment/CommentTab";
import LeftSidebar from "./LeftSidebar";
import Post from "./Post";

const HomePage = ({ page }) => {
  const { posts } = useStateContext();
  const { darkMode } = useStateContext();
  return (
    <div
      className={`flex-1 items-center flex h-[90vh] ${
        darkMode && "bg-gray-800"
      }`}
    >
      <div className={`lg:w-full md:block lg:block h-full hidden`}>
        <LeftSidebar />
      </div>
      <div
        className={`lg:w-full md:w-[400px] sm:w-[85%] h-full mx-auto p-2 overflow-x-hidden ${"scrollbar"}shadow-lg`}
      >
        {page === "home"
         && posts?.map((post, index) => <Post {...post} key={index} />)
          }
          {page === 'comment' && <CommentTab />}
      </div>
      <div className="w-full h-full hidden lg:block"></div>
    </div>
  );
};

export default HomePage;
