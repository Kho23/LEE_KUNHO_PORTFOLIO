import React from "react";
import MyLessonDetailComponent from "./MyLessonDetailComponent";
import { PiNoteDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";

const MyLessonsComponent = ({ data, openModal, modalOpen }) => {
  return (
    <>
      {data == "" ? (
        <div className="text-center mt-20 text-3xl font-extrabold text-blue-700 p-10 bg-white rounded-2xl max-w-3xl mx-auto shadow-2xl border border-blue-100">
          <PiNoteDuotone className="mx-auto text-6xl text-blue-950 mb-4" />
          <span className="text-3xl font-extrabold text-gray-900 block">
            강의 내역이 없습니다.
          </span>

          <p className="text-lg font-medium text-gray-600 mt-4 leading-relaxed">
            신규 개설을 원하실 경우, 강좌 신청 페이지를 이용해 주세요.
            <br />
            <Link
              to="/partner/lessonRequest"
              className="
                inline-block mt-8 px-8 py-3 
                bg-blue-900 text-white font-semibold 
                rounded-xl shadow-md 
                hover:bg-blue-800 hover:shadow-lg 
                transition-all duration-200
              "
            >
              강좌 신청 바로가기
            </Link>
          </p>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto p-5 space-y-6">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4 flex items-center gap-3">
            <span className="block w-2 h-8 bg-blue-950 rounded-sm"></span>
            <span className="tracking-tight">내 강의 목록</span>
          </h1>

          {data.map((i) => (
            <div className="bg-white shadow-sm hover:shadow-lg transition border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
                    <span className="block w-1.5 h-5 bg-teal-600 rounded"></span>
                    {i.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`
                  px-3 py-1 
                  rounded-full 
                  text-xs font-semibold 
                  shadow-sm
                  ${
                    i.lessonStatus === "PENDING"
                      ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                      : i.lessonStatus === "ACCEPTED" &&
                        i.endDate < new Date().toISOString()
                      ? "bg-gray-200 text-gray-600 border border-gray-300"
                      : i.lessonStatus === "ACCEPTED" &&
                        i.endDate >= new Date().toISOString()
                      ? "bg-green-100 text-green-700 border border-green-300"
                      : "bg-red-100 text-red-700 border border-red-300"
                  }
                `}
                  >
                    {i.lessonStatus === "PENDING"
                      ? "개설 검토 중"
                      : i.lessonStatus === "ACCEPTED" &&
                        i.endDate < new Date().toISOString()
                      ? "수업 종료"
                      : i.lessonStatus === "ACCEPTED" &&
                        i.endDate >= new Date().toISOString()
                      ? "수업 중"
                      : "반려"}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 my-4"></div>

              <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm leading-relaxed">
                <div>
                  <span className="font-semibold text-gray-900">분야</span>
                  <div className="mt-0.5 flex items-center gap-1 text-gray-800">
                    {i.facilityType === "HEALTH"
                      ? "헬스"
                      : i.facilityType === "POOL"
                      ? "수영"
                      : i.facilityType === "GOLF"
                      ? "골프"
                      : i.facilityType === "FUTSAL"
                      ? "풋살"
                      : "무용"}
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-gray-900">기간</span>
                  <div className="mt-0.5 text-gray-800">
                    {i.startDate} ~ {i.endDate}
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-gray-900">수업 시간</span>
                  <div className="mt-0.5 text-gray-800">
                    {i.days.map((j) => (
                      <span>{j?.slice(0, 1)}</span>
                    ))}
                    {""} / <span>{i.startTime?.slice(0, 5)}</span> ~{" "}
                    <span>{i.endTime?.slice(0, 5)}</span>
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-gray-900">난이도</span>
                  <div className="mt-0.5 text-gray-800">{i.level}</div>
                </div>

                <div>
                  <span className="font-semibold text-gray-900">정원</span>
                  <div className="mt-0.5 text-gray-800">
                    {" "}
                    <span>{i.minPeople}명</span> ~ <span>{i.maxPeople}명</span>
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-gray-900">시설</span>
                  <div className="mt-0.5 text-gray-800 flex justify-between items-start">
                    <span>{i.facilityRoomType}</span>

                    <button
                      onClick={() => openModal(i)}
                      className="px-3 py-1.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-md shadow-sm"
                    >
                      상세보기
                    </button>
                  </div>
                </div>
                {modalOpen && <MyLessonDetailComponent />}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MyLessonsComponent;
