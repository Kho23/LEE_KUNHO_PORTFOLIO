import React from "react";
import PageComponent from "../../../../../components/common/PageComponent";

const LessonApprovalComponent = ({
  handleSearchSubmit,
  category,
  setCategory,
  keyword,
  setKeyword,
  statusFilter,
  handleFilterChange,
  data,
  moveToAdminLessonDetail,
  page,
  size,
  renderStatus,
  moveToList,
}) => {
  return (
    <div className="container mx-auto max-w-full p-2 md:p-4">
      {/* 🔹 제목 */}
      <h1 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-gray-800">
        강좌개설 신청내역
      </h1>
      <form
        onSubmit={handleSearchSubmit}
        className="flex justify-end items-center space-x-2 my-4 p-4 bg-gray-100 rounded-md"
      >
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="name">강사명</option>
          <option value="lessonName">수업명</option>
        </select>

        <input
          type="text"
          name="keyword"
          value={keyword}
          placeholder="검색어를 입력하세요"
          onChange={(e) => setKeyword(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 flex-grow max-w-xs"
        />

        <div className="flex items-center gap-2">
          {[
            { label: "미승인", value: "PENDING" },
            { label: "승인", value: "ACCEPTED" },
            { label: "반려", value: "REJECTED" },
          ].map((item) => (
            <label
              key={item.value}
              className={`px-2 py-1 rounded-md border cursor-pointer text-sm flex items-center justify-center
        ${
          statusFilter === item.value
            ? "bg-gray-800 text-white border-gray-800"
            : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
        }
      `}
            >
              <input
                type="checkbox"
                className="hidden"
                value={item.value}
                checked={statusFilter === item.value}
                onChange={handleFilterChange}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="bg-gray-700 text-white font-bold rounded px-4 py-2 hover:bg-gray-800"
        >
          검색
        </button>
      </form>

      {/* 🔹 총 개수 */}
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-700">
          총 {data.totalCnt}건
        </div>
      </div>

      {/* 🔹 테이블 */}
      <table className="w-full text-center border-t-2 border-gray-700">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-3 w-20">번호</th>
            <th className="p-3">강사 이름</th>
            <th className="p-3">강의명</th>
            <th className="p-3">강의 기간</th>
            <th className="p-3">강의 시간</th>
            <th className="p-3">상태</th>
          </tr>
        </thead>

        <tbody>
          {data.dtoList.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-8 text-center text-gray-500">
                등록된 강좌개설 신청이 없습니다.
              </td>
            </tr>
          ) : (
            data.dtoList.map((i, idx) => (
              <tr
                key={i.lessonId}
                onClick={() => moveToAdminLessonDetail(i.lessonId)}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="p-3 text-sm text-gray-600">
                  {" "}
                  {(page - 1) * size + (idx + 1)}
                </td>
                <td className="p-3 text-sm text-gray-600">{i.partnerName}</td>
                <td className="p-3 text-sm text-gray-700">{i.title}</td>
                <td className="p-3 text-sm text-gray-600">
                  {i.startDate} ~ {i.endDate}
                </td>
                <td className="p-3 text-sm text-gray-600">
                  {i.startTime.slice(0, -3)} ~ {i.endTime.slice(0, -3)}
                </td>
                <td className="p-3 text-gray-600">{renderStatus(i.status)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <PageComponent serverData={data} movePage={moveToList} />
    </div>
  );
};

export default LessonApprovalComponent;
