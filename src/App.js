import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Router/Router';
import { Toaster } from 'react-hot-toast';
import './App.css';
import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext(null);

function App() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
    else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <ThemeContext.Provider value={{ theme, handleThemeSwitch, isProfileOpen, setIsProfileOpen }}>
      <div className={`App max-w-[1440] mx-auto ${theme} dark:bg-gray-500`}>
        <RouterProvider router={router}></RouterProvider>
        <Toaster />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
