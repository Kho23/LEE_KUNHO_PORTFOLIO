import React, { useEffect, useState } from "react";
import { getAllListSupport } from "../../../../api/adminApi";
import useCustomMove from "../../../../hooks/useCustomMove";
import usePageMove from "../../../../hooks/usePageMove";
import SupportListComponent from "./components/SupportListComponent";

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

const SupportListPage = () => {
  // 전체 문의 리스트 상태
  const [data, setData] = useState(initState);
  // 검색 타입 상태 (이름, 제목 등)
  const [type, setType] = useState("name");
  // 검색 키워드 상태
  const [keyword, setKeyword] = useState("");
  const { moveToAdminSupportDetail } = useCustomMove();
  const { page, size, moveToList } = usePageMove();

  // 문의 리스트 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllListSupport({ page, size, keyword, type });
        setData(res);
      } catch (err) {
        console.error("문의내역 리스트 불러오기 실패:", err);
      }
    };
    fetchData();
  }, [page, size, keyword, type]);

  // 검색 제출 핸들러
  const searchSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await getAllListSupport({ page: 1, size: 10, keyword, type });
      setData(res);
      moveToList({ page: 1, size: 10, type, keyword });
    } catch (err) {
      console.error("문의내역 리스트 불러오기 실패:", err);
    }
  };

  // 문의 상태 표시 함수
  const renderStatus = (status) => {
    switch (status) {
      case "WAITING":
        return (
          <span className="px-2 py-1 rounded-lg text-black-800 bg-gray-200 font-semibold">
            답변 대기
          </span>
        );
      case "ANSWERED":
        return (
          <span className="px-2 py-1 rounded-lg text-green-800 bg-green-50 font-semibold">
            답변 완료
          </span>
        );
      default:
        return status;
    }
  };

  return (
    <SupportListComponent
      searchSubmitHandler={searchSubmitHandler}
      type={type}
      setType={setType}
      keyword={keyword}
      setKeyword={setKeyword}
      data={data}
      moveToAdminSupportDetail={moveToAdminSupportDetail}
      page={page}
      size={size}
      renderStatus={renderStatus}
      moveToList={moveToList}
    />
  );
};

export default SupportListPage;
