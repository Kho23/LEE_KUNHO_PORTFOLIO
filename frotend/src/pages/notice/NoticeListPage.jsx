import React, { useEffect, useState } from "react";
import { formatter, getNoticeList, increaseViewCount } from "../../api/noticeApi";
import { useSearchParams } from "react-router-dom";
import useCustomMove from "../../hooks/useCustomMove";
import PageComponent from "../../components/common/page/PageComponent";
import NoticeListPageComponent from './NoticeListPageComponent'

const NoticeListPage = () => {
  const [notices, setNotices] = useState([]);

  const [pageData, setPageData] = useState({
    pageNumList: [],
    prev: false,
    next: false,
    current: 1,
    totalCnt: 0,
    prevPage: 0,
    nextPage: 0
  });

  const [searchParam, setSearchParam] = useSearchParams();
  const [searchingTitle, setSearchingTitle] = useState(() => searchParam.get("keyword") || "");
  const [category, setCategory] = useState(() => searchParam.get("type") || "t");

  const { moveToNoticeDetail } = useCustomMove();

  // [수정 포인트 1] 의존성 배열에 .toString() 추가 (확실하게 감지함)
  useEffect(() => {
    const getData = async () => {
      try {
        const page = searchParam.get("page")
        console.log("useEffect가 보고 있는 페이지 번호:", page);
        const paramObj = {
          page: searchParam.get("page") || 1,
          size: searchParam.get("size") || 10,
          type: searchParam.get("type") || "t",
          keyword: searchParam.get("keyword") || ""
        };
        console.log("📡 백엔드로 보낼 데이터:", paramObj);
        const data = await getNoticeList(paramObj);
        console.log("✅ 백엔드에서 받은 데이터:", data);
        setNotices(data.dtoList);
        setPageData({
          pageNumList: data.pageNumList,
          prev: data.prev,
          next: data.next,
          current: data.current,
          prevPage: data.prevPage,
          nextPage: data.nextPage,
          totalCnt: data.totalCnt
        });
      } catch (error) {
        console.error("❌ 에러 발생 (백엔드 주소 확인필요):", error);
      }
    };
    getData();
  }, [searchParam.toString()]);



  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParam({ page: 1, size: 10, type: category, keyword: searchingTitle });
  };

  const addViewCount = async (id) => {
    setNotices((prev) => prev.map((n) => n.noticeId === id ? { ...n, viewCount: n.viewCount + 1 } : n));
    try { await increaseViewCount(id); moveToNoticeDetail(id); } catch (e) { console.error(e); }
  };

  const handleSearchChange = (e) => setSearchingTitle(e.target.value);
  const handleCategory = (e) => setCategory(e.target.value);
  return (
    <div>
      <NoticeListPageComponent
        notices={notices}
        setNotices={setNotices}
        pageData={pageData}
        setPageData={setPageData}
        searchParam={searchParam}
        setSearchParam={setSearchParam}
        searchingTitle={searchingTitle}
        setSearchingTitle={setSearchingTitle}
        category={category}
        setCategory={setCategory}
        handleSearchSubmit={handleSearchSubmit}
        addViewCount={addViewCount}
        handleSearchChange={handleSearchChange}
        handleCategory={handleCategory}
      />
    </div>
  )
}

export default NoticeListPage
