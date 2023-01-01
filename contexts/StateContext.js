import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  PaperAirplaneIcon,
  HeartIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import {
  MagnifyingGlassIcon as ActiveMagnifyingGlassIcon,
  HomeIcon as ActiveHomeIcon,
  PaperAirplaneIcon as ActiveAirplaneIcon,
  HeartIcon as ActiveHeartIcon,
  PlusCircleIcon as ActivePlusCircleIcon,
  ArrowLeftOnRectangleIcon as ActiveArrowLeftOnRectangleIcon
} from "@heroicons/react/24/solid";
import { ExploreIcon, ActiveExploreIcon } from "../components/Icons/Icon";
import { useRouter } from "next/router";
import { onSnapshot, orderBy, query, collection } from "firebase/firestore";
import { db } from "../firebase";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [themeColor, setThemeColor] = useState("indigo");
  const [user, setUser] = useState(null);
  const [activeSidebarMenu, setActiveSidebarMenu] = useState("Home");
  const [activePost, setActivePost] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState(null);

  const [posts, setPosts] = useState([
    // {
    //   photoURL: "https://avatars.githubusercontent.com/u/88154142?v=4",
    //   userUid: "user1",
    //   id: "user1post",
    //   name: "Gaurav",
    //   postPic:
    //     "https://img.freepik.com/free-psd/social-media-instagram-post-template_47618-73.jpg?w=2000",
    //   likes: 0,
    //   comments: [
    //     {
    //       id: 'afdad',
    //       name: "John Smith",
    //       comment: "Nice post",
    //       photoURL: "https://avatars.githubusercontent.com/u/88154142?v=4",
    //       timestamp: new Date(),
    //       type: 'comment'
    //     },{
    //       id: '2',
    //       name: "Gaurav",
    //       comment: "Nice post",
    //       photoURL: "https://avatars.githubusercontent.com/u/88154142?v=4",
    //       timestamp: new Date(),
    //       type: 'comment'
    //     },
    //      {
    //       id: 2,
    //       name: "John Smith",
    //       comment: "Nice post",
    //       photoURL: "https://avatars.githubusercontent.com/u/88154142?v=4",
    //       timestamp: new Date(),
    //       repliedMessage: {
    //         id: 'afdad',
    //         name: "John Smith",
    //         photoURL: "https://avatars.githubusercontent.com/u/88154142?v=4",
    //         timestamp: new Date(),
    //       },
    //       type: 'reply',
    //     },
    //   ],
    //   title: "hi see my this post",
    //   views: 120,
    // }
  ]);
  const MenuItems = [
    {
      name: "Home",
      icon: <HomeIcon className="sidebar-icon" />,
      activeIcon: <ActiveHomeIcon className="sidebar-icon text-black" />,
      onClick: () => {
        router.push('/')
      },
    },
    {
      name: "Search",
      icon: <MagnifyingGlassIcon className="sidebar-icon" />,
      activeIcon: (
        <ActiveMagnifyingGlassIcon className="sidebar-icon text-black" />
      ),
      onClick: () => {
        console.log("HI");
      },
    },
    {
      name: "Explore",
      icon: <ExploreIcon />,
      activeIcon: <ActiveExploreIcon />,
      onClick: () => {
        console.log("HI");
      },
    },
    {
      name: "Messages",
      icon: <PaperAirplaneIcon className="sidebar-icon" />,
      activeIcon: <ActiveAirplaneIcon className="sidebar-icon text-black" />,
      onClick: () => {
        console.log("HI");
      },
    },
    {
      name: "Notifications",
      icon: (
        <span className="relative">
          <span className="notification-dot"></span>
          <HeartIcon className="sidebar-icon" />
        </span>
      ),
      activeIcon: (
        <span className="relative">
          <span className="notification-dot"></span>
          <ActiveHeartIcon className="sidebar-icon text-black" />
        </span>
      ),
      onClick: () => {
        console.log("HI");
      },
    },
    {
      name: "Create",
      icon: <PlusCircleIcon className="sidebar-icon" />,
      activeIcon: <ActivePlusCircleIcon className="sidebar-icon text-black" />,
      onClick: () => {
        setIsModal(true);
      },
    },
    {
      name: "Profile",
      photoURL: user?.photoURL,
      onClick: () => {
        router.push('/profile')
      },
    },
    {
      name: "Logout",
      icon: <ArrowLeftOnRectangleIcon className='sidebar-icon'/>,
      activeIcon: <ActiveArrowLeftOnRectangleIcon className='sidebar-icon text-black'/>,
      onClick: () => {
        auth.signOut();
        router.push('/login');
      },
    },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "social_app"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setPosts(snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })));
        }
      ),
    [db]
  );
  return (
    <StateContext.Provider
      value={{
        darkMode,
        setDarkMode,
        isSidebarOpen,
        setIsSidebarOpen,
        activeTab,
        setActiveTab,
        themeColor,
        setThemeColor,
        user,
        setUser,
        activeSidebarMenu,
        setActiveSidebarMenu,
        activePost,
        setActivePost,
        MenuItems,
        posts,
        setPosts,
        isModal, setIsModal, replyMessage, setReplyMessage
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
