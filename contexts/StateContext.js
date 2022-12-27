import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../firebase';
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

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [themeColor, setThemeColor] = useState('indigo')
  const [user, setUser] = useState(null);
  const [activeSidebarMenu, setActiveSidebarMenu] = useState('Home');
  const [activePost, setActivePost] = useState(null);
  const [initialState, setInitialState] = useState({
    HomePage: true,
    ProfilePage: false,
    PostPage: false,

  })

  const MenuItems = [
    {
      name: "Home",
      icon: <HomeIcon className='sidebar-icon'/>,
      activeIcon: <ActiveHomeIcon className='sidebar-icon text-black'/>,
      onClick: () => {
        console.log("HI");
      },
    },
    {
      name: "Search",
      icon: <MagnifyingGlassIcon className='sidebar-icon'/>,
      activeIcon: <ActiveMagnifyingGlassIcon className='sidebar-icon text-black'/>,
      onClick: () => {
        console.log("HI");
      },
    },
    {
      name: "Explore",
      icon: <ExploreIcon />,
      activeIcon: <ActiveExploreIcon/>,
      onClick: () => {
        console.log("HI");
      },
    },
    {
      name: "Messages",
      icon: <PaperAirplaneIcon className='sidebar-icon'/>,
      activeIcon: <ActiveAirplaneIcon className='sidebar-icon text-black'/>,
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
      icon: <PlusCircleIcon className='sidebar-icon'/>,
      activeIcon: <ActivePlusCircleIcon className='sidebar-icon text-black'/>,
      onClick: () => {
        console.log("HI");
      },
    },
    {
      name: "Profile",
      photoURL: user?.photoURL,
      onClick: () => {
        console.log("HI");
      },
    },
  ];


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    })
    return () => {
      unsubscribe();
    }
  }, [user])
  return (
    <StateContext.Provider
      value={{ darkMode, setDarkMode, isSidebarOpen, setIsSidebarOpen, activeTab, setActiveTab, themeColor, setThemeColor, user, setUser, activeSidebarMenu, setActiveSidebarMenu, activePost, setActivePost, initialState, setInitialState, MenuItems }}
    >
      {children}
    </StateContext.Provider>
  )
};

export const useStateContext = () => useContext(StateContext);