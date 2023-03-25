import { Fragment, useEffect } from "react";
import { Popover, Transition, Menu } from "@headlessui/react";
import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";
import { LinkButton, Logo } from "components";
import { classNames } from "lib/functions";
import { APP_ROUTES, userProfileRoute } from "lib/routes";
import Link from "next/link";
import { SITE_NAME } from "lib/constants";
import { useGetSessionUser } from "features/hooks";
import { deleteSession } from "features/Auth/services";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getSessionUser } from "features/Auth/slice";
import Router from "next/router";

export default function Header() {
  const { userData } = useGetSessionUser();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(getSessionUser);

  useEffect(() => {
    if (!data.user) {
      Router.push(APP_ROUTES.login);
    }
  }, [data]);

  return (
    <Popover className="relative bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href={APP_ROUTES.home}>
              <span className="sr-only">{SITE_NAME}</span>
              <Logo />
            </Link>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          {userData?.userId ? (
            <Link
              href={APP_ROUTES.jobs}
              className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Jobs
            </Link>
          ) : (
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <Link
                href={APP_ROUTES.login}
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Sign in
              </Link>

              <LinkButton className="ml-8" href={APP_ROUTES.signup}>
                Sign up
              </LinkButton>
            </div>
          )}

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full p-1 text-gray-400 hover:base-color focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
              {false && (
                <span className="top-0 left-4 absolute w-3.5 h-3.5 bg-red-400 border-2 border-white rounded-full"></span>
              )}
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="z-20 absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href={
                          (userData?.userId && userProfileRoute(userData)) ?? "#"
                        }
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Your Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href={APP_ROUTES.settings}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Settings
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                        role="button"
                        onClick={() => dispatch(deleteSession())}
                      >
                        Sign out
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </Popover>
  );
}
