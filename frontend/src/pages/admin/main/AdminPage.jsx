import React, { useState, useEffect } from "react";
import { Users, ClipboardCheck, MessageCircle, Calendar } from "lucide-react";
import {
  adminApprovals,
  adminCounts,
  adminMainSearch,
  adminScheduleList,
} from "../../../api/adminApi";
import usePageMove from "../../../hooks/usePageMove";
import useCustomMove from "../../../hooks/useCustomMove";
import AdminPageComponent from "./AdminPageComponent";

const AdminPage = () => {
  // 상단 회원 검색 입력값
  const [search, setSearch] = useState("");
  // 회원 검색 결과 목록
  const [searchResult, setSearchResult] = useState([]);
  // 승인 대기 중인 회원 목록
  const [pendingApprovals, setPendingApprovals] = useState([]);
  // 대시보드 통계 수치 데이터
  const [counts, setCounts] = useState({});
  // 오늘 및 예정된 일정 목록
  const [schedule, setSchedule] = useState([]);
  // 검색 로딩 상태
  const [loading, setLoading] = useState(false);
  const { moveToList } = usePageMove();
  const { moveToAdminApprovals } = useCustomMove();

  // 검색어 변경 시 관리자 메인 회원 검색 처리
  useEffect(() => {
    const keyword = search.trim();
    // 검색어가 2자리 미만이면 검색하지 않음
    if (keyword.length < 2) {
      setSearchResult([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      adminMainSearch(keyword).then((res) => setSearchResult(res));
    } catch (error) {
      console.error("회원 검색 실패:", error);
      setSearchResult([]);
    } finally {
      setLoading(false);
    }
  }, [search]);

  // 관리자 메인 페이지 최초 진입 시 필요한 데이터 조회
  useEffect(() => {
    const f = async () => {
      try {
        const res = await adminApprovals();
        const sch = await adminScheduleList();
        const cnt = await adminCounts();
        // 일정, 승인 대기, 통계 데이터 세팅
        setSchedule(sch);
        setPendingApprovals(res);
        setCounts(cnt);
      } catch (err) {
        console.error("가져오기 실패", err);
      }
    };
    f();
  }, []);

  // 검색 결과에서 회원 클릭 시 해당 회원 상세 정보 페이지로 이동
  const handleMemberClick = (member) => {
    moveToList(
      {
        page: 1,
        size: 10,
        type: "id",
        keyword: member.memberLoginId,
        openModal: "true",
        memberIdToOpen: member.memberId,
      },
      "/admin/member/memberInfo"
    );
    // 검색 상태 초기화
    setSearch("");
    setSearchResult([]);
  };

  // 대시보드 상단 통계 카드 데이터
  const stats = [
    {
      title: "신규 회원 (오늘)",
      value: `${counts.memberCnt}명`,
      iconColor: "bg-blue-50 text-blue-500",
      icon: <Users size={20} />,
    },
    {
      title: "승인 대기",
      value: `${pendingApprovals.length}건`,
      iconColor: "bg-red-50 text-red-500",
      icon: <ClipboardCheck size={20} />,
    },
    {
      title: "미답변 문의",
      value: `${counts.supportCnt}건`,
      iconColor: "bg-orange-50 text-orange-500",
      icon: <MessageCircle size={20} />,
    },
    {
      title: "오늘의 예약",
      value: `${counts.reservationCnt}건`,
      iconColor: "bg-green-50 text-green-500",
      icon: <Calendar size={20} />,
    },
  ];

  return (
    <AdminPageComponent
      search={search}
      setSearch={setSearch}
      loading={loading}
      searchResult={searchResult}
      handleMemberClick={handleMemberClick}
      stats={stats}
      pendingApprovals={pendingApprovals}
      moveToAdminApprovals={moveToAdminApprovals}
      schedule={schedule}
    />
  );
};

export default AdminPage;
