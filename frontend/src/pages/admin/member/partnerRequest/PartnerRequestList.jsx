import React, { useEffect, useState } from "react";
import { getListPartnerRequest } from "../../../../api/adminApi";
import useCustomMove from "../../../../hooks/useCustomMove";
import usePageMove from "../../../../hooks/usePageMove";
import PartnerRequestListComponent from "./components/PartnerRequestListComponent";

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

const PartnerRequestList = () => {
  // 파트너 신청 목록 데이터 상태
  const [data, setData] = useState(initState);

  // 신청 상태 필터 (PENDING, ACCEPTED, REJECTED)
  const [statusFilter, setStatusFilter] = useState(null);

  // 파트너 신청 상세 페이지 이동용 커스텀 훅
  const { moveToAdminPartnerRequestDetail } = useCustomMove();

  // 페이징 및 목록 이동 처리용 커스텀 훅
  const { page, size, moveToList } = usePageMove();

  useEffect(() => {
    // 페이지 또는 사이즈 변경 시 파트너 신청 목록 조회
    const fetchData = async () => {
      try {
        const res = await getListPartnerRequest({ page, size });
        setData(res);
      } catch (err) {
        console.error("파트너 리스트 불러오기 실패:", err);
      }
    };
    fetchData();
  }, [page, size]);

  // 상태 필터 변경 시 처리
  const handleFilterChange = async (e) => {
    const value = e.target.value;

    // 동일한 필터를 다시 선택하면 필터 해제
    const newValue = statusFilter === value ? null : value;
    setStatusFilter(newValue);

    try {
      // 상태 조건을 포함해 파트너 신청 목록 재조회
      const res = await getListPartnerRequest({
        page,
        size,
        role: newValue,
      });
      setData(res);
    } catch (err) {
      console.error("파트너 리스트 불러오기 실패:", err);
    }
  };

  // 신청 상태 값에 따라 화면에 표시할 텍스트와 스타일 반환
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
      <PartnerRequestListComponent
        data={data}
        statusFilter={statusFilter}
        handleFilterChange={handleFilterChange}
        moveToAdminPartnerRequestDetail={moveToAdminPartnerRequestDetail}
        page={page}
        size={size}
        renderStatus={renderStatus}
        moveToList={moveToList}
      />
    </>
  );
};

export default PartnerRequestList;
