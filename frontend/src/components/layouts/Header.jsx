import useCustomMove from "../../hooks/useCustomMove";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { allMenuItems } from "../../util/navData";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth/authSlice";
const Header = () => {
  const { moveToMain, moveToAdmin } = useCustomMove();
  const location = useLocation();
  const { isLoggedIn, memberRole } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredMenuId, setHoveredMenuId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMainPage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    alert("로그아웃 되었습니다.");
    moveToMain();
  };

  const handleMouseEnter = (id) => {
    setHoveredMenuId(id);
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setHoveredMenuId(null);
    setIsMenuOpen(false);
  };

  const isSolidHeader = isScrolled || isMenuOpen;
  const headerContainerClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
    isMainPage && !isSolidHeader
      ? "bg-black/20 backdrop-blur-[3px] border-white/10"
      : "bg-white border-gray-200 shadow-sm"
  }`;
  const logoColor =
    isMainPage && !isSolidHeader ? "text-white drop-shadow-md" : "text-black";
  const menuTextColor =
    isMainPage && !isSolidHeader ? "text-white/90" : "text-slate-700";
  const menuHoverColor =
    isMainPage && !isSolidHeader
      ? "hover:text-blue-200"
      : "hover:text-blue-800";
  const topBarClass = `flex space-x-6 h-[50px] justify-end px-8 py-2 text-[14px] font-medium transition-colors duration-300 ${
    isMainPage && !isSolidHeader
      ? "bg-transparent border-b border-white/10 text-white/80"
      : "bg-white border-b border-slate-50 text-slate-500"
  }`;
  return (
    <header className={headerContainerClass} onMouseLeave={handleMouseLeave}>
      {/* 최상단 유틸리티 바 */}
      <div className={topBarClass}>
        <div className="flex items-center tracking-wide mr-5">
          {isLoggedIn ? (
            <>
              {memberRole === "ROLE_ADMIN" && (
                <button
                  onClick={moveToAdmin}
                  className="mr-5 text-amber-500 hover:text-amber-600 transition-colors font-bold"
                >
                  관리자 페이지
                </button>
              )}
              {memberRole === "ROLE_USER" && (
                <Link
                  to={`/member`}
                  className={`mr-5 transition-colors duration-200
                ${
                  isMainPage && !isSolidHeader
                    ? "text-white hover:text-yellow-300"
                    : "text-black hover:text-yellow-500"
                }`}
                >
                  마이페이지
                </Link>
              )}
              {memberRole === "ROLE_PARTNER" && (
                <Link
                  to={`/partner`}
                  className={`mr-5 transition-colors duration-200
                ${
                  isMainPage && !isSolidHeader
                    ? "text-white hover:text-yellow-300"
                    : "text-black hover:text-yellow-500"
                }`}
                >
                  파트너 페이지
                </Link>
              )}
              <button
                onClick={handleLogout}
                className={`transition-colors duration-200
                ${
                  isMainPage && !isSolidHeader
                    ? "text-white hover:text-yellow-300"
                    : "text-black hover:text-yellow-500"
                }`}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className={`mr-5 transition-colors duration-200
                ${
                  isMainPage && !isSolidHeader
                    ? "text-white hover:text-yellow-300"
                    : "text-black hover:text-yellow-500"
                }`}
              >
                로그인
              </Link>
              <Link
                to="/auth/register"
                className={`transition-colors duration-200
                ${
                  isMainPage && !isSolidHeader
                    ? "text-white hover:text-yellow-300"
                    : "text-black hover:text-yellow-500"
                }`}
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
      {/* 메인 네비게이션바 */}
      <nav className="relative flex items-center max-w-[1400px] mx-auto px-6 h-20">
        <div className="flex-none w-[200px]">
          <Link
            to="/"
            className={`text-3xl font-extrabold tracking-tighter transition-colors duration-300 ${logoColor}`}
          >
            JE:O CENTER
          </Link>
        </div>
        {/* [대메뉴 리스트] */}
        <ul className="flex-1 flex h-full px-4">
          {allMenuItems.map((menu) => {
            if (menu.hideInHeader) return null;
            const isActive = location.pathname.startsWith(menu.path);
            return (
              <li
                key={menu.id}
                className="flex-1 group h-full flex items-center justify-center relative"
                onMouseEnter={() => handleMouseEnter(menu.id)}
              >
                <Link
                  to={menu.subMenus[0].path}
                  className={`text-[19px] font-bold tracking-tight transition-all duration-300 relative py-2 block text-center w-full
                    ${
                      isActive
                        ? isMainPage && !isSolidHeader
                          ? "text-blue-300"
                          : "text-blue-800"
                        : menuTextColor
                    }
                    ${menuHoverColor}
                  `}
                >
                  {menu.title}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px]
                    ${
                      isMainPage && !isSolidHeader
                        ? "bg-blue-400"
                        : "bg-blue-800"
                    }
                    transition-all duration-300 group-hover:w-full
                    ${isActive ? "w-full" : ""}
                  `}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex-none w-[200px] hidden xl:block"></div>
      </nav>
      {/* 메가 메뉴 패널 */}
      <div
        className={`absolute top-full left-0 w-full bg-white/90 z-40 border-t border-gray-200 overflow-hidden transition-all duration-300 ease-in-out shadow-2xl
    ${
      isMenuOpen
        ? "max-h-[500px] opacity-100 visible"
        : "max-h-0 opacity-0 invisible"
    }
  `}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-full flex relative min-h-[320px]">
          <div className="absolute top-0 left-6 w-[200px] h-full py-10 border-gray-100 flex flex-col z-10 bg-none">
            <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tighter leading-tight break-keep">
              {hoveredMenuId
                ? allMenuItems.find((m) => m.id === hoveredMenuId)?.title
                : ""}
            </h2>
            <p className="text-slate-400 text-xs leading-relaxed">
              Healthy Life,
              <br />
              Happy Together
            </p>
          </div>

          <div className="absolute top-0 right-6 w-[200px] h-full border-l border-gray-100 hidden xl:block z-10 bg-none"></div>

          <div className="flex-1 flex ml-[200px] xl:mr-[200px]">
            {allMenuItems.map((menu) => {
              if (menu.hideInHeader) return null;
              const isHoveredColumn = hoveredMenuId === menu.id;
              return (
                <div
                  key={menu.id}
                  onMouseEnter={() => handleMouseEnter(menu.id)}
                  className={`flex-1 pt-8 pb-10 px-2 transition-colors duration-200  border-gray-100
              ${isHoveredColumn ? "bg-blue-900" : "bg-none"}
            `}
                >
                  <ul className="space-y-3 flex flex-col items-center w-full">
                    {menu.subMenus &&
                      menu.subMenus.map((subMenu) => (
                        <li key={subMenu.id} className="w-full text-center">
                          <Link
                            to={subMenu.path}
                            onClick={() => setIsMenuOpen(false)}
                            className={`block text-[16px] py-2 transition-all duration-200 rounded-md
                        ${
                          isHoveredColumn
                            ? "text-white font-bold hover:bg-blue-800 hover:scale-105"
                            : "text-slate-700 font-semibold hover:text-blue-800 hover:bg-slate-50/70"
                        }
                      `}
                          >
                            {subMenu.title}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
