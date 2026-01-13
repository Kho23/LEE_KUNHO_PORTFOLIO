import React from "react";
import { formatter } from "../../../../api/noticeApi";

const MyLessonComponent = ({ registration, handleClickDelete }) => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white pt-10 md:pt-20">
      <div className="w-full max-w-4xl px-4 mb-8">
        <div className="flex justify-between items-end border-b-2 border-gray-300 pb-4 mb-6">
          <h1 className="text-4xl font-bold text-gray-900">수강신청 내역</h1>
        </div>

        <div className="text-sm text-gray-600 mb-10 leading-relaxed">
          회원님의{" "}
          <span className="text-[#263c79] font-bold">수강신청 목록</span>입니다.
          <br />
          신청 상태 및 상세 내역을 확인하실 수 있습니다.
        </div>
      </div>

      {/* 리스트 영역 */}
      <div className="w-full max-w-4xl px-4 pb-20">
        {registration &&
        registration.length > 0 &&
        registration[0].registrationId !== 0 ? (
          registration.map((i, index) => (
            <div
              key={index}
              className="w-full border border-gray-300 bg-white p-6 mb-4 shadow-sm hover:shadow-md transition-shadow rounded-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              {/* 강의 정보 */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-gray-100 text-xs text-gray-500 rounded border border-gray-200">
                    No. {i.registrationId || "-"}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800">
                    {i.lessonTitle || "강의명 없음"}
                  </h3>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 gap-2 sm:gap-4">
                  <div className="flex items-center">
                    <span className="font-medium mr-2 text-gray-400">강사명</span>
                    <span>{i.teacherName}</span>
                  </div>
                  <span className="hidden sm:inline text-gray-300">|</span>
                  <div className="flex items-center">
                    <span className="font-medium mr-2 text-gray-400">신청시간</span>
                    <span className="font-mono text-gray-500">
                      {formatter(i)}
                    </span>
                  </div>
                </div>
              </div>

              {/* 상태 및 액션 버튼 영역 */}
              <div className="flex items-center gap-3">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-bold border ${
                    i.status === "CANCELED"
                      ? "bg-red-50 text-red-600 border-red-200"
                      : i.status === "APPLIED"
                      ? "bg-blue-50 text-[#263c79] border-blue-200"
                      : "bg-gray-50 text-gray-600 border-gray-200"
                  }`}
                >
                  {i.status === "CANCELED"
                    ? "취소됨"
                    : i.status === "APPLIED"
                    ? "신청 완료"
                    : "상태 미정"}
                </span>

                {i.status !== "CANCELED" && (
                  <button
                    onClick={() => handleClickDelete(i.registrationId)}
                    className="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors duration-200"
                  >
                    취소하기
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="w-full border border-gray-300 bg-gray-50 p-12 text-center text-gray-500 rounded-sm">
            수강신청 목록이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLessonComponent;