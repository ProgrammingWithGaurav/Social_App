import { Switch } from "@headlessui/react";
import { useStateContext } from "../contexts/StateContext";
import {
  MoonIcon,
  SunIcon,
  SwatchIcon,
} from "@heroicons/react/24/outline";


export default function Sidebar() {
  const {
    darkMode,
    setDarkMode,
    setThemeColor,
    themeColor,
    activeSidebarMenu,
    setActiveSidebarMenu,
    MenuItems
  } = useStateContext();

  return (
    <aside className="w-64 absolute right-0 z-[100]" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded-2xl shadow-xl dark:bg-gray-800">
        <ul className="space-y-2">
          <li>
            {MenuItems?.map((item, index) => (
              <a
                onClick={() => {
                  item.onClick();
                  setActiveSidebarMenu(item.name);
                }}
                href="#"
                key={index}
                className={`flex items-center p-2 transition text-base font-normal text-gray-900  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 ${
                  item.name === activeSidebarMenu &&
                  "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                {item.photoURL ? (
                  <img
                  alt="photo"
                    src={item.photoURL}
                    className={`w-6 h-6 hover:opacity-90 rounded-full transition duration-75 ${
                      item.name === activeSidebarMenu && "ring-2 ring-gray-500"
                    }`}
                  />
                ) : (
                  <>
                    {activeSidebarMenu === item.name
                      ? item.activeIcon
                      : item.icon}
                  </>
                )}
                <span className="ml-3">{item.name}</span>
              </a>
            ))}

            <a
              href="#"
              onClick={() => {
                setDarkMode((previousMode) => !previousMode);
              }}
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? (
                <SunIcon className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              ) : (
                <MoonIcon className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              )}
              <span className="flex-1 ml-3 whitespace-nowrap">
                <Switch
                  checked={darkMode}
                  className={`${
                    darkMode ? `bg-${themeColor}-600` : `bg-gray-200`
                  }
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    className={`${darkMode ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <SwatchIcon className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 flex ml-3 space-x-2">
                <span
                  onClick={() => setThemeColor("indigo")}
                  className={`theme-color bg-indigo-600`}
                />
                <span
                  onClick={() => setThemeColor("amber")}
                  className={`theme-color bg-amber-600`}
                />
                <span
                  onClick={() => setThemeColor("pink")}
                  className={`theme-color bg-pink-600`}
                />
                <span
                  onClick={() => setThemeColor("fuchsia")}
                  className={`theme-color bg-fuchsia-600`}
                />
                <span
                  onClick={() => setThemeColor("lime")}
                  className={`theme-color bg-lime-600`}
                />
              </span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
