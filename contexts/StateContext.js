import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  PaperAirplaneIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import {
  MagnifyingGlassIcon as ActiveMagnifyingGlassIcon,
  HomeIcon as ActiveHomeIcon,
  PaperAirplaneIcon as ActiveAirplaneIcon,
  HeartIcon as ActiveHeartIcon,
  PlusCircleIcon as ActivePlusCircleIcon,
} from "@heroicons/react/24/solid";
import { ExploreIcon, ActiveExploreIcon } from "../components/Icons/Icon";
import { useRouter } from "next/router";

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

  const [posts, setPosts] = useState([
    {
      photoURL: "https://avatars.githubusercontent.com/u/88154142?v=4",
      userUid: "user1",
      id: "user1post",
      name: "Gaurav",
      postPic:
        "https://img.freepik.com/free-psd/social-media-instagram-post-template_47618-73.jpg?w=2000",
      likes: 0,
      comments: [
        {
          id: 1,
          name: "John Smith",
          comment: "Nice post",
          photoURL: "https://avatars.githubusercontent.com/u/88154142?v=4",
          timestamp: new Date(),
        }, {
          id: 2,
          name: "John Smith",
          comment: "Nice post",
          photoURL: "https://avatars.githubusercontent.com/u/88154142?v=4",
          timestamp: new Date(),
        },
      ],
      title: "hi see my this post",
      views: 120,
    }, {
      photoURL: "https://avatars.githubusercontent.com/u/88154142?v=4",
      userUid: "user1",
      id: "user2post",
      name: "Gaurav",
      postPic:
        "https://img.freepik.com/free-psd/social-media-instagram-post-template_47618-73.jpg?w=2000",
      likes: 0,
      comments: [
        {
          id: 3,
          name: "Gaurav",
          comment: "Nice post !! WOWW",
          photoURL: "https://avatars.githubusercontent.com/u/88154142?v=4",
          timestamp: new Date(),
        }
      ],
      title: "hi see my this post",
      views: 120,
    },
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
        console.log("HI");
      },
    },
    {
      name: "Profile",
      photoURL: user?.photoURL,
      onClick: () => {
        router.push('/profile')
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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
