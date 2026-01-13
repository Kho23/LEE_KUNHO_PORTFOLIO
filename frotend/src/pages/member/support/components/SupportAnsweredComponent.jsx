import React from "react";

const SupportAnsweredComponent = ({ supportList }) => {
  return (
    <div className="mt-10">
      <h3 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-blue-900 pl-3">
        답변 내용
      </h3>
      {supportList?.response && supportList.response.length > 0 ? (
        supportList.response.map((res, idx) => (
          <div
            key={idx}
            className="bg-blue-50 border-l-4 border-blue-900 p-4 rounded-r-lg shadow-md mb-4"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-blue-800">관리자</span>
              <span className="text-sm text-gray-500">
                {res.createdAt.split("T")[0]}{" "}
                {res.createdAt.split("T")[1].slice(0, 8)}
              </span>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{res.content}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 italic">등록된 답변이 없습니다.</p>
      )}
    </div>
  );
};

export default SupportAnsweredComponent;
