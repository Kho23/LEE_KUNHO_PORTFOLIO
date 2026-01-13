import React from "react";
import SupportAnsweredComponent from "./SupportAnsweredComponent";

const SupportComponent = ({
  supportPageHandler,
  supportList,
  detailPageHandler,
}) => {
  return (
    <>
      <div className="container mx-auto max-w-5xl p-6 md:p-10">
        <h1 className="text-4xl font-extrabold mb-8 pb-3 border-b-4 border-blue-900 text-gray-900 inline-block">
          1:1 문의 내역
        </h1>

        {supportList.length === 0 ? (
          <div className="bg-white shadow-lg rounded-xl p-10 text-center text-gray-600">
            문의 내역이 없습니다.
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
            <table className="w-full text-center table-auto">
              <thead className="bg-blue-950 text-white border-b-2 border-blue-700">
                <tr>
                  <th className="p-4 w-1/12 font-bold text-base">번호</th>
                  <th className="p-4 text-center w-7/12 font-bold text-base">
                    제목
                  </th>
                  <th className="p-4 w-2/12 font-bold text-base">등록일</th>
                  <th className="p-4 w-2/12 font-bold text-base">답변 여부</th>
                </tr>
              </thead>

              <tbody>
                {supportList.map((i, idx) => {
                  return (
                    <tr
                      key={i.supportNo}
                      onClick={() => detailPageHandler(i.supportNo)}
                      className="border-b border-gray-200 hover:bg-blue-50 transition duration-150 cursor-pointer"
                    >
                      <td className="p-4 text-sm font-medium text-gray-700">
                        {idx + 1}
                      </td>
                      <td className="p-4 text-center text-base font-semibold text-gray-700">
                        {i.supportTitle}
                      </td>
                      <td className="p-4 text-sm text-gray-500">
                        {i.createdDate?.slice(0, 10)}
                      </td>
                      <td className="p-4 text-sm text-gray-500">
                        {i.status === "WAITING" ? "대기" : "완료"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-end mt-8">
          <button
            onClick={supportPageHandler}
            className="
            bg-blue-600 text-white 
            font-bold text-lg 
            rounded-xl px-6 py-3 
            hover:bg-blue-800 
            shadow-lg hover:shadow-xl
            transition duration-150
          "
          >
            문의하기
          </button>
        </div>
      </div>
    </>
  );
};

export default SupportComponent;
