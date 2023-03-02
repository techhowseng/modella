import Link from "next/link";
import React from "react";
import { CLIENT_ACCOUNT_MENU_ITEMS } from "../constants";
import { CLIENT_ACCOUNT_MENU_ITEMS_TYPE } from "../types";

function DashMenuList() {
  return (
    <aside className="w-64 mt-6" aria-label="Sidebar">
      <div className="py-4 overflow-y-auto">
        <ul className="space-y-2">
          {CLIENT_ACCOUNT_MENU_ITEMS.map(
            (item: CLIENT_ACCOUNT_MENU_ITEMS_TYPE) => (
              <li key={item.link}>
                <Link
                  href={item.link}
                  className="flex items-center p-2 rounded-lg transition-all duration-200 ease-in-out text-black hover:text-white font-normal hover:base-bg-color"
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
