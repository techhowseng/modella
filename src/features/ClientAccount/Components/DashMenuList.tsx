import Link from "next/link";
import React from "react";
import { CLIENT_ACCOUNT_MENU_ITEMS } from "../constants";
import { CLIENT_ACCOUNT_MENU_ITEMS_TYPE } from "../types";

function DashMenuList({ active }) {
  return (
    <aside className="w-full mt-6" aria-label="Sidebar">
      <div className="py-4 overflow-y-auto">
        <ul className="space-y-2">
          {CLIENT_ACCOUNT_MENU_ITEMS.map(
            (item: CLIENT_ACCOUNT_MENU_ITEMS_TYPE) => (
              <li key={item.link}>
                <Link
                  href={item.link}
                  className={`flex items-center py-2 px-6 rounded-lg transition-all duration-200 ease-in-out hover:text-white font-normal hover:bg-blue-500 ${
                    active === item.id
                      ? "base-light-bg-color base-color"
                      : " text-black"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </aside>
  );
}

export default DashMenuList;
