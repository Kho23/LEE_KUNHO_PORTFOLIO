import React from "react";
import { Link } from "react-router-dom";

const SupportDetailComponent = ({
  data,
  response,
  setResponse,
  addResponseHandler,
}) => {
  return (
    <div className="container mx-auto max-w-5xl p-4 md:p-8">
      <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-800">
        <h1 className="text-3xl font-bold">1:1 문의내역</h1>
      </div>

      <div className="border-t border-b border-gray-300 py-4 mb-6">
        <div className="flex items-center space-x-2 text-gray-700 mb-2">
          <span className="px-2 py-1 bg-gray-700 text-white text-xs font-semibold rounded-full">
            제목
          </span>
          <h2 className="text-xl font-bold text-gray-800">
            {data.supportTitle}
          </h2>
        </div>
        <div className="flex text-sm text-gray-500 space-x-4">
          <span>
            작성자 : {data.member?.memberName} ( {data.member?.memberLoginId} )
          </span>
          {data.createdDate && (
            <span>접수일자 : {data.createdDate.slice(0, 10)}</span>
          )}
        </div>
      </div>
      <div className="min-h-[400px] border border-gray-300 bg-white p-8 flex flex-col justify-center items-center text-center text-xl font-semibold text-gray-800 mb-6">
        <p className="whitespace-pre-wrap">{data.supportContent}</p>
      </div>
      <div className="border-t-2 border-black my-6"></div>

      <div className="mt-10 border border-gray-300 rounded-lg p-6 bg-gray-50">
        <h3 className="text-lg font-bold text-gray-800 mb-4">관리자 답변</h3>

        {/* 댓글 리스트 */}
        {data.response?.length > 0 ? (
          <div className="space-y-4">
            {data.response.map((i, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-300 rounded-lg p-4"
              >
                <p className="text-gray-800 whitespace-pre-wrap">{i.content}</p>
                <div className="text-right text-sm text-gray-500 mt-2">
                  작성일자 : {i.createdAt?.split("T")[0]}{" "}
                  {i.createdAt?.split("T")[1].slice(0, 8)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}

        <div className="mt-6">
          <textarea
            className="w-full h-32 border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 resize-none"
            placeholder="새 답변을 입력하세요..."
            value={response.content}
            onChange={(e) =>
              setResponse((prev) => ({ ...prev, content: e.target.value }))
            }
          ></textarea>
          <div className="flex justify-end mt-3">
            <button
              className="px-5 py-2 bg-gray-800 text-white rounded-md font-semibold hover:bg-gray-900 transition-colors"
              onClick={addResponseHandler}
            >
              등록
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-5 gap-x-4">
        <Link
          to={-1}
          className="bg-gray-700 text-white font-bold py-2 px-6 rounded hover:bg-gray-800 transition-colors"
        >
          목록
        </Link>
      </div>
    </div>
  );
};

export default SupportDetailComponent;
