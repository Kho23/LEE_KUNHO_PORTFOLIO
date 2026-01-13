import React from "react";
import { Link } from "react-router-dom";
import { PiNoteDuotone } from "react-icons/pi";

const DailyUseComponent = ({
  dailyUse,
  gymDailyUse,
  cancelGymHandler,
  cancelDailyUseHandler,
}) => {
  const hasData =
    (dailyUse && dailyUse.length > 0) ||
    (gymDailyUse && gymDailyUse.length > 0);

  return (
    <div className="flex flex-col items-center min-h-screen bg-white pt-10 md:pt-20">
      {hasData ? (
        <>
          <div className="w-full max-w-4xl px-4 mb-8">
            <div className="flex justify-between items-end border-b-2 border-gray-300 pb-4 mb-6">
              <h1 className="text-4xl font-bold text-gray-900">
                일일이용예약 내역
              </h1>
            </div>

            <div className="text-sm text-gray-600 mb-10 leading-relaxed">
              회원님의{" "}
              <span className="text-[#263c79] font-bold">
                일일이용예약 목록
              </span>
              입니다.
              <br />
              예약 일시 및 장소를 확인하실 수 있습니다.
            </div>
          </div>

          <div className="w-full max-w-4xl px-4 pb-20">
            <div className="grid gap-6">
              {dailyUse &&
                dailyUse.map((i) => (
                  <div
                    key={i.id}
                    className="w-full bg-white border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2 mb-2 border-gray-100 pb-2">
                      <span className="w-1.5 h-6 bg-[#263c79] rounded-sm"></span>
                      <h3 className="text-xl font-bold text-[#263c79]">
                        예약 정보
                      </h3>
                    </div>
                    <div className="space-y-4 text-sm md:text-base">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 font-medium">
                          예약일
                        </span>
                        <span className="text-gray-800 font-medium">
                          {i.startTime?.slice(0, 10)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 font-medium">시간</span>
                        <span className="text-gray-800">
                          {i.startTime?.slice(11, 16)} ~{" "}
                          {i.endTime?.slice(11, 16)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 font-medium">
                          시설·장소
                        </span>
                        <span className="text-gray-800">
                          {i.facilityName} · {i.spaceName}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 font-medium">
                          이용 금액
                        </span>
                        <span className="text-gray-900 font-bold">
                          {i.price ? i.price.toLocaleString() : 0} 원
                        </span>
                      </div>
                    </div>
                    {new Date(i.startTime?.slice(0, 10)) > new Date() && (
                      <div className="flex justify-end border-gray-100 pt-4">
                        <button
                          onClick={() => cancelDailyUseHandler(i.id)}
                          className="px-3 py-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded 
                        hover:bg-red-500 hover:text-white hover:border-red-200 transition-colors duration-200"
                        >
                          취소하기
                        </button>
                      </div>
                    )}
                  </div>
                ))}

              {gymDailyUse &&
                gymDailyUse.map((i) => (
                  <div
                    key={i.id}
                    className="w-full bg-white border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2 mb-2 border-gray-100 pb-2">
                      <span className="w-1.5 h-6 bg-[#263c79] rounded-sm"></span>
                      <h3 className="text-xl font-bold text-[#263c79]">
                        예약 정보
                      </h3>
                    </div>

                    <div className="space-y-4 text-sm md:text-base">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 font-medium">
                          예약일
                        </span>
                        <span className="text-gray-800 font-medium">
                          {i.date}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 font-medium">
                          시설·장소
                        </span>
                        <span className="text-gray-800">헬스장</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 font-medium">
                          이용 금액
                        </span>
                        <span className="text-gray-900 font-bold">
                          {i.price ? i.price.toLocaleString() : 0} 원
                        </span>
                      </div>
                    </div>

                    {new Date(i.date) > new Date() && (
                      <div className="flex justify-end border-gray-100 pt-4">
                        <button
                          onClick={() => cancelGymHandler(i.id)}
                          className="px-3 py-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded 
                        hover:bg-red-500 hover:text-white hover:border-red-200 transition-colors duration-200"
                        >
                          취소하기
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center mt-20 text-3xl font-extrabold text-blue-700 p-10 bg-white rounded-2xl max-w-3xl mx-auto shadow-2xl border border-blue-100">
          <PiNoteDuotone className="mx-auto text-6xl text-blue-950 mb-4" />
          <span className="text-3xl font-extrabold text-gray-900 block">
            일일이용예약 신청 내역이 없습니다.
          </span>

          <p className="text-lg font-medium text-gray-600 mt-4 leading-relaxed">
            일일이용 예약을 원하실 경우, 일일이용예약 페이지를 이용해 주세요.
            <br />
            <Link
              to="/reservation/dailyUse"
              className="inline-block mt-8 px-8 py-3 bg-blue-900 text-white font-semibold rounded-xl shadow-md 
                hover:bg-blue-800 hover:shadow-lg transition-all duration-200"
            >
              일일이용예약 바로가기
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default DailyUseComponent;
