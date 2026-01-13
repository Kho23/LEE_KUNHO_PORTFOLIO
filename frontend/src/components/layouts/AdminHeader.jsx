import { Link } from "react-router-dom";
import { MdOutlineManageAccounts } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth/authSlice";

const AdminHeader = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    alert("로그아웃 되었습니다.");
  };

  return (
    <header className="bg-[#2d3236] text-white shadow-md">
      <div className="flex justify-between items-center px-8 py-5">
        {/* 왼쪽 영역 */}
        <div className="flex items-center gap-3">
          <MdOutlineManageAccounts className="w-10 h-10 fill-white" />
          <Link
            to={"/admin"}
            className="text-2xl font-bold text-white tracking-wide"
          >
            JE:O CENTER [관리자페이지]
          </Link>
        </div>

        {/* 오른쪽 영역 */}
        <div className="flex items-center gap-6">
          <Link to={"/"} className="hover:underline">
            메인페이지
          </Link>
          <button onClick={handleLogout} className="hover:underline">
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
