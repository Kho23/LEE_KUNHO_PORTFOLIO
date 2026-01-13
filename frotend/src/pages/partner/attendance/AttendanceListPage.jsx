import React, { useEffect, useState } from "react";
import AttendanceListComponent from "./components/AttendanceListComponent";
import { getMyLessons, getMySearchLesson } from "../../../api/partnerApi";

const AttendanceListPage = () => {
  const [data, setData] = useState([]);
  const [titleForSearch, setTitleForSearch] = useState("");

  const fetchLessons = async (fn, message) => {
    try {
      const res = await fn();
      setData(res);
    } catch (err) {
      console.error(message, err);
      alert("오류가 발생했습니다");
    }
  };

  useEffect(() => {
    fetchLessons(getMyLessons, "전체 목록 조회 실패");
  }, []);

  const setSearchTitle = (e) => {
    setTitleForSearch(e.target.value);
  };

  const searchHandler = async () => {
    if (!titleForSearch.trim()) {
      fetchLessons(getMyLessons, "전체 목록 조회 실패");
      return;
    }

    fetchLessons(
      () => getMySearchLesson(titleForSearch),
      "검색 목록 조회 실패"
    );
  };

  const resetHandler = async () => {
    fetchLessons(getMyLessons, "전체 목록 조회 실패");
  };

  return (
    <div>
      <AttendanceListComponent
        data={data}
        setSearchTitle={setSearchTitle}
        searchHandler={searchHandler}
        resetHandler={resetHandler}
      />
    </div>
  );
};

export default AttendanceListPage;
