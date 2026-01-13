import React from "react";
import {
  Info,
  Layout,
  CalendarCheck,
  History,
  HelpCircle,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import NoticePreview from "./NoticePreview";
import { useNavigate } from "react-router-dom";
import img from "../../images/메인페이지배경.png";
import LessonPreview from "./LessonPreview";
import { useSelector } from "react-redux";

const MainPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector(state => state.auth)
  const menuItems = [
    { title: "이용안내", icon: Info, link: "/guide/time" },
    { title: "프로그램 안내", icon: BookOpen, link: "/program/1" },
    {
      title: "수강 신청",
      icon: Layout,
      link: "/reservation/registration",
    },
    {
      title: "대관 신청",
      icon: CalendarCheck,
      link: "/reservation/rental",
    },
    {
      title: "예약 내역 조회",
      icon: History,
      link: "/member/myReservation",
      requireLogin: true,
    },
    { title: "FAQ", icon: HelpCircle, link: "/community/faq" },
  ];
  const handleClick = (menu) => {
    if (menu.requireLogin && !isLoggedIn) {
      alert("로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.")
      return;
    }
    navigate(menu.link)

  }

  return (
    <div className="relative w-full min-h-screen">
      <div
        className="absolute inset-0 z-[-10]"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 flex flex-col items-center w-full pb-20">
        <section className="relative w-full h-[350px] flex flex-col justify-center items-center text-center px-4 mt-28">
          <p className="text-white text-xl md:text-2xl font-semibold mb-2 tracking-tight [text-shadow:_1px_1px_2px_rgba(0,0,0,0.5)]">
            Join. Every. One. – JE:O
          </p>
          <h1
            className="text-white text-5xl md:text-[64px] font-extrabold
            [text-shadow:_2px_2px_4px_rgba(0,0,0,0.7)]"
          >
            재오복합체육센터
          </h1>
        </section>
        <main className="w-full max-w-[1200px] px-4">
          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleClick(item)}
                className="group flex flex-col items-center justify-center p-6 h-[160px]
                  bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/40
                  hover:bg-blue-900 hover:border-blue-800 hover:scale-105
                  transition-all duration-300 ease-in-out"
              >
                <div className="mb-4 p-3 rounded-full bg-blue-50 group-hover:bg-white/10 transition-colors">
                  <item.icon
                    size={32}
                    className="text-blue-800 group-hover:text-white transition-colors"
                    strokeWidth={1.5}
                  />
                </div>
                <span className="text-slate-800 font-bold text-base leading-snug whitespace-pre-line group-hover:text-white transition-colors">
                  {item.title}
                </span>
              </button>
            ))}
          </section>

          {/* 메인 컨텐츠 영역 */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* 왼쪽: 마감임박 강의목록 */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/40">
              <div className="px-6 py-5 border-b border-slate-200/60 flex justify-between items-center">
                <h2 className="text-slate-800 text-lg font-bold flex items-center gap-2">
                  마감임박 강의목록
                </h2>
                <button
                  onClick={() => navigate("/reservation/registration")}
                  className="text-black text-sm hover:text-blue-600 flex items-center gap-1 transition-colors"
                >
                  더보기 <ChevronRight size={16} />
                </button>
              </div>

              {/* 수정된 부분: 오른쪽 공지사항과 동일한 구조로 변경 */}
              <div className="h-[300px] overflow-hidden bg-white/50">
                <div className="h-full overflow-y-auto custom-scrollbar p-2">
                  {/* 기존의 flex center, icon, p 태그 등을 모두 제거하고 컴포넌트만 배치 */}
                  <LessonPreview />
                </div>
              </div>
            </div>

            {/* 오른쪽: 공지사항 */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/40">
              <div className="px-6 py-5 border-b border-slate-200/60 flex justify-between items-center">
                <h2 className="text-slate-800 text-lg font-bold flex items-center gap-2">
                  공지사항
                </h2>
                <button
                  onClick={() => navigate("/community/notice")}
                  className="text-black text-sm hover:text-blue-600 flex items-center gap-1 transition-colors"
                >
                  더보기 <ChevronRight size={16} />
                </button>
              </div>
              <div className="h-[300px] overflow-hidden bg-white/50">
                <div className="h-full overflow-y-auto custom-scrollbar p-2">
                  <NoticePreview />
                </div>
              </div>
            </div>

          </section>
        </main>
      </div>
    </div>
  );
};

export default MainPage;