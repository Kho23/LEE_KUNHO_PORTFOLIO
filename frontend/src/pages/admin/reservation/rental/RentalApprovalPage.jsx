import React, { useEffect, useState } from "react";
import { getRentalList } from "../../../../api/adminApi";
import useCustomMove from "../../../../hooks/useCustomMove";
import usePageMove from "../../../../hooks/usePageMove";

import RentalApprovalComponent from "./components/RentalApprovalComponent";

// 페이징 및 리스트 초기 상태값
const initState = {
  dtoList: [], // 대관 신청 목록 데이터
  pageNumList: [], // 페이지 번호 목록
  pageRequestDTO: null, // 페이지 요청 정보
  prev: false, // 이전 페이지 존재 여부
  next: false, // 다음 페이지 존재 여부
  totalCnt: 0, // 전체 데이터 개수
  prevPage: 0, // 이전 페이지 번호
  nextPage: 0, // 다음 페이지 번호
  totalPage: 0, // 전체 페이지 수
  current: 0, // 현재 페이지
};

const RentalApprovalPage = () => {
  // 대관 신청 리스트 및 페이징 데이터
  const [data, setData] = useState(initState);
  // 검색 키워드
  const [keyword, setKeyword] = useState("");
  // 승인 상태 필터
  const [statusFilter, setStatusFilter] = useState(null);
  // 검색 시작 날짜
  const [startDate, setStartDate] = useState("");
  // 검색 종료 날짜
  const [endDate, setEndDate] = useState("");
  const { moveToAdminRentalDetail } = useCustomMove();
  const { page, size, moveToList } = usePageMove();

  // 페이지 이동 또는 사이즈 변경 시 대관 신청 목록 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRentalList({
          page,
          size,
          keyword,
          status: statusFilter,
          startDate: startDate || null,
          endDate: endDate || null,
        });
        setData(res); // 조회 결과 상태에 저장
      } catch (err) {
        console.error("대관 리스트 불러오기 실패:", err);
      }
    };
    fetchData();
  }, [page, size]);

  // 승인 상태 필터 클릭 시 토글 처리
  const handleFilterChange = (e) => {
    const value = e.target.value;
    const newValue = statusFilter === value ? null : value;
    setStatusFilter(newValue);
  };

  // 검색 버튼 클릭 시 조건에 맞는 리스트 재조회
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await getRentalList({
        page,
        size,
        keyword,
        status: statusFilter,
        startDate: startDate || null,
        endDate: endDate || null,
      });
      setData(res);
    } catch (err) {
      console.error("대관 리스트 불러오기 실패:", err);
    }
  };

  // 승인 상태 값에 따른 화면 표시용 텍스트 처리
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
      <RentalApprovalComponent
        handleSearchSubmit={handleSearchSubmit}
        keyword={keyword}
        setKeyword={setKeyword}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        statusFilter={statusFilter}
        handleFilterChange={handleFilterChange}
        data={data}
        moveToAdminRentalDetail={moveToAdminRentalDetail}
        page={page}
        size={size}
        renderStatus={renderStatus}
        moveToList={moveToList}
      />
    </>
  );
};

export default RentalApprovalPage;
