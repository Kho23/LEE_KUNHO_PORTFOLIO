import React from "react";
import { formatter } from "../../../../../api/noticeApi";
import { Link } from "react-router-dom";
import PageComponent from "../../../../../components/common/PageComponent";

const NoticeListComponent = ({
  searchSubmitHandler,
  category,
  setCategory,
  keyword,
  setKeyword,
  notices,
  moveToAdminNoticeDetail,
  page,
  size,
  moveToList,
}) => {
  return (
    <div className="container mx-auto max-w-full p-2 md:p-4">
      {/* 1. 페이지 제목 */}
      <h1 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-gray-800">
        공지사항
      </h1>

      {/* 2. 검색 폼 */}
      <form
        onSubmit={searchSubmitHandler}
        className="flex justify-end items-center space-x-2 my-4 p-4 bg-gray-100 rounded-md"
      >
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="t">제목</option>
          <option value="c">내용</option>
          <option value="tc">제목+내용</option>
        </select>

        <input
          type="text"
          name="keyword"
          value={keyword}
          placeholder="검색어를 입력하세요"
          onChange={(e) => setKeyword(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 flex-grow max-w-xs"
        />

        <button
          type="submit"
          className="bg-gray-700 text-white font-bold rounded px-4 py-2 hover:bg-gray-800"
        >
          검색
        </button>
      </form>

      {/* 3. 총 게시물 수 */}
      <div className="text-sm mb-2">총 {notices.totalCnt}건</div>

      {/* 4. 공지사항 테이블 */}
      <table className="w-full text-center border-t-2 border-gray-700">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-3">번호</th>
            <th className="p-3">제목</th>
            <th className="p-3">등록일</th>
            <th className="p-3">조회수</th>
          </tr>
        </thead>
        <tbody>
          {notices.dtoList.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-8 text-center text-gray-500">
                검색된 공지사항이 없습니다.
              </td>
            </tr>
          ) : (
            notices.dtoList.map((i, idx) => (
              <tr
                key={i.noticeId}
                onClick={() => moveToAdminNoticeDetail(i.noticeId)}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="p-3 text-sm text-gray-600">
                  {" "}
                  {(page - 1) * size + (idx + 1)}
                </td>
                <td className="p-3 text-sm text-gray-600">{i.title}</td>
                <td className="p-3 text-sm text-gray-600">{formatter(i)}</td>
                <td className="p-3 text-sm text-gray-600">{i.viewCount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <PageComponent serverData={notices} movePage={moveToList} />
      <div className="flex justify-end mr-4">
        <Link
          type="button"
          className="bg-gray-700 text-white font-bold rounded px-4 py-2 mt-4 hover:bg-gray-800 "
          to={`add`}
        >
          공지사항 추가
        </Link>
      </div>
    </div>
  );
};

export default NoticeListComponent;
