import { FaUserCheck, FaRegCalendarAlt } from "react-icons/fa";

const AttendanceComponent = ({
  data,
  category,
  attendance,
  selectDate,
  selectDateHandler,
  setAttendanceHandler,
  submitHandler,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-10 border-l-8 border-blue-900 pl-4">
        출석 관리
      </h1>

      <div className="mt-6 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
        <h3 className="text-xl font-bold text-blue-900 mb-5 pb-2 border-b">
          수업 정보
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10 text-gray-800 text-base">
          <div>
            <p className="text-sm text-gray-500 font-medium">제목</p>
            <p className="font-semibold">
              [{category}] {""}
              {data?.title}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 font-medium">수업 난이도</p>
            <p className="font-semibold">{data?.level}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 font-medium">기간</p>
            <p className="font-semibold">
              {data?.startDate} ~ {data?.endDate}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 font-medium">시간 및 요일</p>
            <p className="font-semibold">
              {data?.startTime?.slice(0, 5)} ~ {data?.endTime?.slice(0, 5)} /{" "}
              {data?.days?.map((i) => (
                <span className="mr-1">{i.slice(0, 1)}</span>
              ))}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 font-medium">장소</p>
            <p className="font-semibold">{data?.facilityRoomType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">총원</p>
            <p className="font-semibold">{data?.currentPeople}명</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-8 mb-6">
        <FaRegCalendarAlt className="text-xl text-gray-600" />
        날짜 선택:
        <input
          type="date"
          name="attendanceDate"
          min={data?.startDate}
          max={data?.endDate}
          onChange={(e) => selectDateHandler(e)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
        <p>
          선택한 날짜: <span className="text-blue-700">{selectDate}</span>
        </p>
      </div>

      <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="py-3 w-20">번호</th>
            <th className="py-3">이름</th>
            <th className="py-3">출석 상태</th>
            <th className="py-3">메모</th>
          </tr>
        </thead>

        {attendance?.map((i) => (
          <tbody key={i.studentNo}>
            <tr className="text-center border-b hover:bg-gray-50 transition">
              <td className="py-3">{i.attendanceId}</td>
              <td className="py-3 font-semibold">{i.name}</td>
              <td className="py-3">
                <select
                  name="status"
                  value={i.status || ""}
                  onChange={(e) => setAttendanceHandler(i.studentNo, e)}
                  className="border rounded-lg px-2 py-1 font-semibold bg-green-100 text-green-800 focus:ring focus:ring-blue-200"
                >
                  <option value="" disabled>
                    선택
                  </option>
                  <option value="ATTEND">출석</option>
                  <option value="LATE">지각</option>
                  <option value="LEAVE">조퇴</option>
                  <option value="ABSENT">결석</option>
                </select>
              </td>
              <td className="py-3">
                <input
                  type="text"
                  name="memo"
                  value={i.memo ?? ""}
                  onChange={(e) => setAttendanceHandler(i.studentNo, e)}
                  className="border px-3 py-1 rounded-lg w-11/12 focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder="메모"
                />
              </td>
            </tr>
          </tbody>
        ))}
      </table>

      <div className="text-right mt-6">
        <button
          onClick={submitHandler}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 shadow-md transition"
        >
          출석 저장
        </button>
      </div>
    </div>
  );
};

export default AttendanceComponent;
