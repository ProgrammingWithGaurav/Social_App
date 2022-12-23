import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  return (
    <StateContext.Provider
      value={{ darkMode, setDarkMode, isSidebarOpen, setIsSidebarOpen, activeTab, setActiveTab}}
    >
      {children}
    </StateContext.Provider>
  )
};

export const useStateContext = () => useContext(StateContext);