import { Disclosure } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useStateContext } from "../contexts/StateContext";
import Link from 'next/link';
import { useRouter } from "next/router";

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "Team", href: "/"},
  { name: "Projects", href: "/" },
  { name: "Calendar", href: "/" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const router = useRouter();
  const { setIsSidebarOpen,user, activeTab, setActiveTab } = useStateContext();
  return (
    <Disclosure as="nav" className={`dark:bg-gray-800 sticky top-0 bg-gray-50 shadow-sm z-[1000]`}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-[10vh] items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    onClick={() => router.push('/')}
                    className="block h-8 w-auto lg:hidden cursor-pointer"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                  <img
                    onClick={() => router.push('/')}
                    className="hidden h-8 w-auto lg:block cursor-pointer"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        onClick={() => setActiveTab(item.name)}
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.name === activeTab
                            ? "bg-gray-200 dark:bg-gray-900 dark:text-white text-gray-900"
                            : "text-gray-800 dark:text-white dark:hover:bg-gray-900 hover:bg-gray-200 dark:hover:text-white hover:text-black",
                          "px-3 py-2 rounded-md text-sm font-medium transition"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="mr-2 rounded-full dark:bg-gray-800 p-1 dark:text-gray-400 dark:hover:text-white focus:outline-none focus:ring-2 dark:focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <div>
                  <button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open user menu</span>
                    <img
                      onClick={() =>
                        setIsSidebarOpen(
                          (previousIsSidebarOpen) => !previousIsSidebarOpen
                        )
                      }
                      className="h-8 w-8 rounded-full"
                      src={`${user?.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}`}
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Link
                  onClick={() => setActiveTab(item.name)}
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.name === activeTab
                      ? "bg-gray-200 dark:bg-gray-900 dark:text-white text-gray-900"
                      : "dark:hover:text-black dark:text-gray-300 hover:bg-gray-200 hover:text-black",
                    "block px-3 py-2 rounded-md text-base font-medium transition"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
