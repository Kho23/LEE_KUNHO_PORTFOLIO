import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { useSelector } from "react-redux";
import useCustomMove from "../../hooks/useCustomMove";
import { useEffect } from "react";

const AdminLayout = () => {
  const { moveToLogin, moveToMain } = useCustomMove();
  const { isLoggedIn, memberRole, isLoading } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    console.log("현재 상태:", isLoggedIn, memberRole);
    if (isLoading) return;
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      setTimeout(() => {
        moveToMain();
      }, 0);
    } else if (memberRole != "ROLE_ADMIN") {
      alert("접근 권한이 없습니다.");
      setTimeout(() => {
        moveToMain();
      }, 0);
    }
  }, [isLoggedIn, memberRole, isLoading, moveToLogin]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isLoggedIn || memberRole !== "ROLE_ADMIN") return null;
  return (
    <div className="flex flex-col min-h-screen bg-[#2e3441] text-gray-100">
      <AdminHeader />
      <div className={`flex flex-1 flex-col}`}>
        <AdminSidebar />
        <main className="flex-1 bg-white text-gray-800">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
