import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import ChatWidget from "../chatModal/ChatWidget";
import MapWidget from "../mapModal/MapWidget";
const Layout = () => {
  const location = useLocation();
  const isMainPage = location.pathname === "/";
  const shouldShowSidebar = !isMainPage;
  const contentWrapperClasses = `flex-1 w-full max-w-screen-2xl mx-auto pt-[140px] pb-20 ${
    shouldShowSidebar ? "flex" : ""
  }`;
  if (isMainPage) {
    return (
      <div className="flex flex-col min-h-screen relative">
        <Header />
        <main className="flex-1 w-full relative z-0">
          <Outlet />
        </main>
        <Footer />
        <MapWidget />
        <ChatWidget />
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <div className={contentWrapperClasses}>
        <Sidebar />
        <main className="flex-1 bg-white p-6 lg:pl-8 min-h-[600px]">
          <Outlet />
        </main>
      </div>
      <Footer />
      <MapWidget />
      <ChatWidget />
    </div>
  );
};
export default Layout;
