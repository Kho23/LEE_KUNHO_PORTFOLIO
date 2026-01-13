import React from "react";
import { Link, useLocation } from "react-router-dom";
import { allMenuItems } from "../../util/navData";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const activeGroup = allMenuItems.find((menu) =>
    currentPath.startsWith(menu.path)
  );

  if (!activeGroup || !activeGroup.subMenus) {
    return null;
  }

  const subMenus = activeGroup.subMenus;

  return (
    <div className="w-60 min-h-full bg-white px-4 py-6">
      <div
        className="
          h-24 flex items-center justify-center text-white text-xl font-bold rounded-lg mb-4
          bg-gradient-to-r from-blue-700 to-blue-900 shadow-md
        "
      >
        {activeGroup.title}
      </div>
      <nav className="flex flex-col space-y-2">
        {subMenus.map((item) => {
          const isActive = currentPath === item.path;

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`
                block w-full py-4 pl-4 pr-2 text-base rounded-lg border bg-white
                transition duration-150 ease-in-out text-gray-700
                hover:bg-gray-50 hover:border-gray-300
                ${
                  isActive
                    ? "font-bold text-gray-900 border-blue-900 shadow-sm"
                    : ""
                }
              `}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
