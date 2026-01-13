import React from "react";
import PageComponent from "../../../../../components/common/PageComponent";

const SupportListComponent = ({
  searchSubmitHandler,
  type,
  setType,
  keyword,
  setKeyword,
  data,
  moveToAdminSupportDetail,
  page,
  size,
  renderStatus,
  moveToList,
}) => {
  return (
    <div className="container mx-auto max-w-full p-2 md:p-4">
      <h1 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-gray-800">
        1:1 문의내역
      </h1>

      <form
        onSubmit={searchSubmitHandler}
        className="flex justify-end items-center space-x-2 my-4 p-4 bg-gray-100 rounded-md"
      >
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="name">이름</option>
          <option value="title">제목</option>
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

      <div className="text-sm mb-2">총 {data.totalCnt}건</div>
      <table className="w-full text-center border-t-2 border-gray-700">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-3 w-20">번호</th>
            <th className="p-3">작성자</th>
            <th className="p-3">제목</th>
            <th className="p-3">접수일</th>
            <th className="p-3">상태</th>
          </tr>
        </thead>

        <tbody>
          {data.dtoList.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-8 text-center text-gray-500">
                1:1 문의 내역이 없습니다.
              </td>
            </tr>
          ) : (
            data.dtoList.map((i, idx) => (
              <tr
                key={i.supportNo}
                onClick={() => moveToAdminSupportDetail(i.supportNo)}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="p-3 text-sm text-gray-600">
                  {" "}
                  {(page - 1) * size + (idx + 1)}
                </td>
                <td className="p-3 text-sm text-gray-600">
                  {i.member?.memberName} ( {i.member?.memberLoginId} )
                </td>
                <td className="p-3 text-sm text-gray-700">{i.supportTitle}</td>
                <td className="p-3 text-sm text-gray-600">
                  {new Date(i.createdDate).toLocaleDateString().slice(0, -1)}
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

export default SupportListComponent;
