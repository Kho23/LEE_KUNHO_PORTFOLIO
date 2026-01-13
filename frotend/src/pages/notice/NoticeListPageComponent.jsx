import React, { useEffect, useState } from "react";
import {
  formatter,
  getNoticeList,
  increaseViewCount,
} from "../../api/noticeApi";
import { useSearchParams } from "react-router-dom";
import useCustomMove from "../../hooks/useCustomMove";
import PageComponent from "../../components/common/page/PageComponent";

const NoticeListPageComponent = (props) => {
  const {
    notices,
    setNotices,
    pageData,
    setPageData,
    searchParam,
    setSearchParam,
    searchingTitle,
    setSearchingTitle,
    category,
    setCategory,
    handleSearchSubmit,
    addViewCount,
    handleSearchChange,
    handleCategory,
  } = props;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <nav className="text-sm text-gray-500 mb-6">
        홈 &gt; 커뮤니티 &gt; 공지사항
      </nav>
      <div className="flex items-end justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-900">공지사항</h1>
      </div>
      <div className="border-b-2 border-gray-400 mb-6" />

      <form
        onSubmit={handleSearchSubmit}
        className="flex justify-end items-center space-x-2 my-4 p-4 bg-gray-100 rounded-md"
      >
        <select
          value={category}
          onChange={handleCategory}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="t">제목</option>
          <option value="c">내용</option>
          <option value="tc">제목+내용</option>
        </select>
        <input
          type="text"
          value={searchingTitle}
          onChange={handleSearchChange}
          placeholder="검색어 입력"
          className="border border-gray-300 rounded px-3 py-2 flex-grow max-w-xs"
        />
        <button
          type="submit"
          className="bg-gray-700 text-white font-bold rounded px-4 py-2 hover:bg-gray-800"
        >
          검색
        </button>
      </form>

      <div className="text-sm mb-2">총 {pageData.totalCnt}건</div>

      <table className="w-full text-center border-t-2 border-gray-700">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-3">번호</th>
            <th className="p-3 text-left w-3/5">제목</th>
            <th className="p-3">등록일</th>
            <th className="p-3">조회수</th>
          </tr>
        </thead>
        <tbody>
          {notices.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-8 text-center text-gray-500">
                데이터가 없습니다.
              </td>
            </tr>
          ) : (
            notices.map((i, idx) => (
              <tr
                key={i.noticeId}
                onClick={() => addViewCount(i.noticeId)}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="p-3 text-sm text-gray-600">
                  {" "}
                  {(pageData.current - 1) * 10 + (idx + 1)}
                </td>
                <td className="p-3 text-left">{i.title}</td>
                <td className="p-3 text-sm text-gray-600">{formatter(i)}</td>
                <td className="p-3 text-sm text-gray-600">{i.viewCount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <PageComponent pageData={pageData} />
    </div>
  );
};

export default NoticeListPageComponent;
