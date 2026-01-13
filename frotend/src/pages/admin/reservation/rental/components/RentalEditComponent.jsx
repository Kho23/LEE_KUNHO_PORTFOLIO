import React from "react";
import { Link } from "react-router-dom";

const RentalEditComponent = ({ data, renderStatus, statusChangeHandler }) => {
  return (
    <div className="container mx-auto max-w-4xl p-8 min-h-screen text-gray-900">
      {/* 제목 */}
      <h1 className="text-3xl font-bold mb-10 border-b pb-4">대관 신청서</h1>
      {/* :압정: 기본 정보 박스 */}
      <div className="bg-white shadow-lg rounded-xl border p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-black">기본 정보</h2>
        <table className="w-full border rounded-lg  text-sm">
          <tbody className="divide-y">
            <tr>
              <td className="bg-gray-100 font-semibold px-4 py-3 w-36">
                신청자명
              </td>
              <td className="px-4 py-3">{data.name}</td>
            </tr>
            <tr>
              <td className="bg-gray-100 font-semibold px-4 py-3">
                신청자 전화번호
              </td>
              <td className="px-4 py-3">{data.phoneNumber}</td>
            </tr>
            <tr>
              <td className="bg-gray-100 font-semibold px-4 py-3">
                신청자 요청사항
              </td>
              <td className="px-4 py-3">{data.memo ? data.memo : "-"}</td>
            </tr>
            <tr>
              <td className="bg-gray-100 font-semibold px-4 py-3">대관 시설</td>
              <td className="px-4 py-3">{data.facilityName}</td>
            </tr>
            <tr>
              <td className="bg-gray-100 font-semibold px-4 py-3">대관 장소</td>
              <td className="px-4 py-3">{data.spaceName}</td>
            </tr>
            <tr>
              <td className="bg-gray-100 font-semibold px-4 py-3">대관 날짜</td>
              <td className="px-4 py-3">{data.startTime.slice(0, 10)}</td>
            </tr>
            <tr>
              <td className="bg-gray-100 font-semibold px-4 py-3">대관 시간</td>
              <td className="px-4 py-3">
                {data.startTime.slice(-8).slice(0, -3)} ~{" "}
                {data.endTime.slice(-8).slice(0, -3)}
              </td>
            </tr>
            <tr>
              <td className="bg-gray-100 font-semibold px-4 py-3">신청 상태</td>
              <td className="px-4 py-3">{renderStatus(data.status)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {data.status === "PENDING" ? (
        <div className="mt-10 flex justify-center gap-20">
          <button
            className="px-16 py-3 rounded-lg font-semibold
               border-2 border-green-500 text-green-600
               hover:bg-green-500 hover:text-white
               active:scale-95 transition-all duration-200"
            onClick={() => statusChangeHandler("ACCEPTED")}
          >
            승 인
          </button>

          <button
            className="px-16 py-3 rounded-lg font-semibold
               border-2 border-red-500 text-red-600
               hover:bg-red-500 hover:text-white
               active:scale-95 transition-all duration-200"
            onClick={() => statusChangeHandler("REJECTED")}
          >
            반 려
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className="flex justify-end mt-5 gap-x-4 border-t">
        <Link
          to={-1}
          className="bg-gray-700 text-white font-bold py-2 px-6 mt-5 rounded hover:bg-gray-800 transition-colors"
        >
          목록
        </Link>
      </div>
    </div>
  );
};

export default RentalEditComponent;
