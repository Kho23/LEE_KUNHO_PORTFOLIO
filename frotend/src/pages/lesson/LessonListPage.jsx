import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getLessonList } from "../../api/classApi";
import LessonListPageComponent from "./LessonListPageComponent";

const LessonListPage = () => {
  const [classes, setClasses] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  const [pageData, setPageData] = useState({});
  const [searchTerm, setSearchTerm] = useState(
    () => searchParam.get("keyword") || ""
  );
  const [searchType, setSearchType] = useState(
    () => searchParam.get("type") || "c"
  );
  const [sortType, setSortType] = useState(
    () => searchParam.get("sort") || "LATEST"
  );
  const [category, setCategory] = useState(
    () => searchParam.get("category") || ""
  );
  const [startTime, setStartTime] = useState(
    () => searchParam.get("startTime") || ""
  );
  const [endTime, setEndTime] = useState(
    () => searchParam.get("endTime") || ""
  );
  const [days, setDays] = useState(() => searchParam.getAll("days") || []);
  const [available, setAvailable] = useState(
    () => searchParam.get("available") == "true" || false
  );

  useEffect(() => {
    try {
      const get = async () => {
        const currentPage = searchParam.get("page") || 1;
        const paramObj = {
          page: currentPage,
          size: searchParam.get("size") || 10,
          type: searchParam.get("type") || "t",
          keyword: searchParam.get("keyword") || "",
          sort: searchParam.get("sort") || "LATEST",
          category: searchParam.get("category") || "",
          startTime: searchParam.get("startTime"),
          endTime: searchParam.get("endTime"),
          days: searchParam.getAll("days"),
          available: searchParam.get("available") === "true",
        };
        const data = await getLessonList(paramObj);
        console.log("백엔드에서 온 데이터", data);
        setClasses(data.dtoList);
        setPageData({
          pageNumList: data.pageNumList,
          prev: data.prev,
          next: data.next,
          current: data.current,
          totalCnt: data.totalCnt,
          prevPage: data.prevPage,
          nextPage: data.nextPage,
          totalPage: data.totalPage,
        });
      };
      get();
    } catch (error) {
      console.log(error);
    }
  }, [searchParam]);

  const handleSelectDay = (dayVal) => {
    if (days.includes(dayVal)) {
      setDays(days.filter((day) => day != dayVal));
    } else {
      setDays([...days, dayVal]);
    }
  };

  const handleSearchSubmit = () => {
    setSearchParam({
      page: 1,
      size: 10,
      type: searchType,
      keyword: searchTerm,
      sort: sortType,
      category: category,
      startTime: startTime,
      endTime: endTime,
      days: days,
      available: available,
    });
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSortType(newSort);
    setSearchParam({
      page: 1,
      size: 10,
      type: searchType,
      keyword: searchTerm,
      sort: newSort, // e.target.value 반영
      category: category,
      startTime: startTime,
      endTime: endTime,
      days: days,
      available: available,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <LessonListPageComponent 
      classes={classes}
      pageData={pageData}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      searchType={searchType}
      setSearchType={setSearchType}
      sortType={sortType}
      category={category}
      setCategory={setCategory}
      startTime={startTime}
      setStartTime={setStartTime}
      endTime={endTime}
      setEndTime={setEndTime}
      days={days}
      available={available}
      setAvailable={setAvailable}
      handleSelectDay={handleSelectDay}
      handleSearchSubmit={handleSearchSubmit}
      handleSortChange={handleSortChange}
      handleKeyDown={handleKeyDown}
    />
  );
};

export default LessonListPage;