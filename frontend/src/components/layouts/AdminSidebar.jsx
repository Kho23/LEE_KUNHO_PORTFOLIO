import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { adminAllMenuItems } from "../../util/adminData";

const AdminSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [openMenu, setOpenMenu] = useState("");

  const toggleMenu = (menuId) => {
    setOpenMenu(openMenu === menuId ? null : menuId);
  };

  return (
    <div className="w-64 min-h-screen bg-[#3A4149] text-gray-100">
      <nav className="flex flex-col">
        {adminAllMenuItems.map((menu) => (
          <div key={menu.id}>
            {/* 1차 메뉴 */}
            <button
              onClick={() => toggleMenu(menu.id)}
              className={`w-full flex justify-between items-center px-5 py-3 text-sm font-semibold tracking-wide
                ${
                  openMenu === menu.id
                    ? "bg-[#4B525A] text-white"
                    : "hover:bg-[#4B525A] text-gray-200"
                } transition-all`}
            >
              <span>{menu.title}</span>
              <span className="text-lg">
                {openMenu === menu.id ? "−" : "+"}
              </span>
            </button>

            {/* 2차 메뉴 */}
            {openMenu === menu.id && (
              <div className="bg-[#4B525A] text-gray-200">
                {menu.subMenus.map((sub) => {
                  const isActive = currentPath === sub.path;
                  return (
                    <Link
                      key={sub.id}
                      to={sub.path}
                      className={`block px-8 py-2 text-sm hover:bg-[#5B636C] transition
                        ${
                          isActive
                            ? "bg-[#5B636C] font-semibold text-white"
                            : "text-gray-300"
                        }`}
                    >
                      {sub.title}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
