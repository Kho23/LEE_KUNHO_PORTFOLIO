import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PiBookOpenTextDuotone,
  PiBuildingDuotone,
  PiCalendarCheckDuotone,
} from "react-icons/pi";
import { useSelector } from "react-redux";
import useCustomMove from "../../../../hooks/useCustomMove";

const MyReservationComponent = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { moveToLogin } = useCustomMove();

  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인 후 이용 가능한 서비스입니다.");
      moveToLogin();
    }
  }, []);

  const menus = [
    {
      id: 1,
      title: "수강신청 목록",
      path: "/member/myReservation/lesson",
      icon: <PiBookOpenTextDuotone className="text-5xl text-blue-900" />,
      description: "신청하신 강좌 예약 현황을 확인하세요.",
    },
    {
      id: 2,
      title: "대관신청 목록",
      path: "/member/myReservation/rental",
      icon: <PiBuildingDuotone className="text-5xl text-blue-900" />,
      description: "시설 대관 신청 내역을 확인하세요.",
    },
    {
      id: 3,
      title: "일일이용 예약 목록",
      path: "/member/myReservation/dailyUse",
      icon: <PiCalendarCheckDuotone className="text-5xl text-blue-900" />,
      description: "일일 이용 예약 현황을 확인하세요.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-10 border-l-8 border-blue-900 pl-4">
        내 예약 조회
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {menus.map((i) => (
          <Link
            key={i.id}
            to={i.path}
            className="
              bg-white border border-gray-200 rounded-2xl shadow-sm p-6
              flex flex-col items-center text-center
              hover:shadow-xl hover:border-blue-300 hover:-translate-y-1
              transition-all duration-200 cursor-pointer
            "
          >
            <div className="mb-4">{i.icon}</div>

            <h2 className="text-xl font-bold text-gray-900 mb-2">{i.title}</h2>

            <p className="text-sm text-gray-600 leading-relaxed">
              {i.description}
            </p>
          </Link>
        ))}
      </div>
      <div className="max-w-5xl mx-auto mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-gray-700 leading-relaxed">
        <h3 className="font-bold text-blue-900 mb-3">※ 이용 안내</h3>

        <ul className="space-y-2 list-disc list-inside">
          <li>예약 내역은 신청일 기준 최신 순으로 표시됩니다.</li>
          <li>
            승인 대기 중인 예약은 처리 결과에 따라 상태가 변경될 수 있습니다.
          </li>
          <li>취소를 원하실 경우 해당 예약 상세 페이지에서 가능합니다.</li>
          <li>
            강좌 및 대관 일정은 운영 사정에 따라 변경될 수 있으며 사전 안내가
            제공됩니다.
          </li>
          <li>일일이용 예약은 당일 취소 시 환불이 제한될 수 있습니다.</li>
        </ul>
      </div>
    </div>
  );
};

export default MyReservationComponent;
