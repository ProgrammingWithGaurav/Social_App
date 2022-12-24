import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../firebase';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [themeColor, setThemeColor] = useState('indigo')
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      console.log(currentUser)
    })
    return () => {
      unsubscribe();
    }
  }, [user])
  return (
    <StateContext.Provider
      value={{ darkMode, setDarkMode, isSidebarOpen, setIsSidebarOpen, activeTab, setActiveTab, themeColor, setThemeColor, user, setUser}}
    >
      {children}
    </StateContext.Provider>
  )
};

export const useStateContext = () => useContext(StateContext);