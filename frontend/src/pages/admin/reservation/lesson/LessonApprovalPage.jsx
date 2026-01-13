import React, { useEffect, useState } from "react";
import { getLessonList } from "../../../../api/adminApi";
import useCustomMove from "../../../../hooks/useCustomMove";
import usePageMove from "../../../../hooks/usePageMove";
import LessonApprovalComponent from "./components/LessonApprovalComponent";

// 페이징 처리된 리스트 기본 구조
const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCnt: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const LessonApprovalPage = () => {
  // 강의 개설 신청 리스트 상태
  const [data, setData] = useState(initState);
  // 검색 카테고리
  const [category, setCategory] = useState("name");
  // 검색어
  const [keyword, setKeyword] = useState("");
  // 승인 상태 필터
  const [statusFilter, setStatusFilter] = useState(null);
  const { moveToAdminLessonDetail } = useCustomMove();
  const { page, size, moveToList } = usePageMove();

  // 페이지 번호 또는 페이지 사이즈 변경 시 리스트 다시 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getLessonList({
          page,
          size,
          keyword,
          type: category,
          role: statusFilter,
        });
        setData(res); // 조회 결과 상태에 저장
      } catch (err) {
        console.error("강의개설 리스트 불러오기 실패:", err);
      }
    };
    fetchData();
  }, [page, size]);

  // 승인 상태 필터 변경 처리
  const handleFilterChange = async (e) => {
    const value = e.target.value;
    // 동일한 필터를 다시 누르면 해제
    const newValue = statusFilter === value ? null : value;
    setStatusFilter(newValue);
  };

  // 검색 버튼 클릭 시 리스트 조회
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await getLessonList({
        page,
        size,
        keyword,
        type: category,
        role: statusFilter,
      });
      setData(res); // 검색 결과 반영
    } catch (err) {
      console.error("파트너 리스트 불러오기 실패:", err);
    }
  };

  // 승인 상태 값에 따라 화면에 보여줄 텍스트 및 스타일 처리
  const renderStatus = (status) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="px-2 py-1 rounded-lg text-black-800 bg-gray-200 font-semibold">
            심사 중
          </span>
        );
      case "ACCEPTED":
        return (
          <span className="px-2 py-1 rounded-lg text-green-800 bg-green-50 font-semibold">
            승인
          </span>
        );
      case "REJECTED":
        return (
          <span className="px-2 py-1 rounded-lg text-red-800 bg-red-50 font-semibold">
            반려
          </span>
        );
      default:
        return status;
    }
  };

  return (
    <>
      <LessonApprovalComponent
        handleSearchSubmit={handleSearchSubmit}
        category={category}
        setCategory={setCategory}
        keyword={keyword}
        setKeyword={setKeyword}
        statusFilter={statusFilter}
        handleFilterChange={handleFilterChange}
        data={data}
        moveToAdminLessonDetail={moveToAdminLessonDetail}
        page={page}
        size={size}
        renderStatus={renderStatus}
        moveToList={moveToList}
      />
    </>
  );
};

export default LessonApprovalPage;
