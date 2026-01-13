import React, { useEffect, useState } from "react";
import { getNoticeList } from "../../../../api/noticeApi";
import useCustomMove from "../../../../hooks/useCustomMove";
import usePageMove from "../../../../hooks/usePageMove";
import NoticeListComponent from "./Components/NoticeListComponent";

// 공지 목록 및 페이징 정보를 담기 위한 초기 상태
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

const NoticeListPage = () => {
  // 공지 목록 및 페이징 데이터를 관리
  const [notices, setNotices] = useState(initState);
  // 검색 타입(카테고리)을 관리
  const [category, setCategory] = useState("t");
  // 검색 키워드를 관리
  const [keyword, setKeyword] = useState("");
  // 페이지 번호, 사이즈 및 목록 이동을 위한 커스텀 훅
  const { page, size, moveToList } = usePageMove();
  // 공지 상세 페이지 이동을 위한 커스텀 훅
  const { moveToAdminNoticeDetail } = useCustomMove();

  // 페이지 번호 또는 페이지 사이즈 변경 시 공지 목록 조회
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getNoticeList({
          page,
          size,
          keyword,
          type: category,
        });
        setNotices(data);
      } catch (error) {
        console.log("공지사항을 불러올 수 없습니다. 에러내용:", error);
      }
    };
    getData();
  }, [page, size]);

  // 검색 버튼 클릭 시 검색 조건에 맞는 공지 목록 조회
  const searchSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await getNoticeList({
        page: 1,
        size: 10,
        keyword,
        type: category,
      });
      setNotices(res);
    } catch (err) {
      console.error("문의내역 리스트 불러오기 실패:", err);
    }
  };

  return (
    <>
      <NoticeListComponent
        searchSubmitHandler={searchSubmitHandler}
        category={category}
        setCategory={setCategory}
        keyword={keyword}
        setKeyword={setKeyword}
        notices={notices}
        moveToAdminNoticeDetail={moveToAdminNoticeDetail}
        page={page}
        size={size}
        moveToList={moveToList}
      />
    </>
  );
};

export default NoticeListPage;
