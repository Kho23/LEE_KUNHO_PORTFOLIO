import { FaClipboardList, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const AttendanceListComponent = ({
  data,
  setSearchTitle,
  searchHandler,
  resetHandler,
}) => {
  return (
    <div>
      <div className="max-w-5xl">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-10 border-l-8 border-blue-900 pl-4">
          출석 관리
        </h1>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={resetHandler}
          className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          전체 보기
        </button>
        <input
          type="text"
          name="title"
          onChange={(e) => setSearchTitle(e)}
          className="border rounded-lg px-4 py-2 w-60"
          placeholder="강좌명 검색"
        />
        <button
          onClick={searchHandler}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <FaSearch /> 검색
        </button>
      </div>

      <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="py-3 w-[130px]">시작날짜</th>
            <th className="py-3 w-[130px]">종료날짜</th>
            <th className="py-3">요일</th>
            <th className="py-3 min-w-[200px]">강좌명</th>
            <th className="py-3">총원</th>
            <th className="py-3">보기</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((i) => (
              <tr className="text-center border-b">
                <td className="py-3 w-[130px]">{i.startDate}</td>
                <td className="py-3 w-[130px]">{i.endDate}</td>
                <td className="py-3">
                  {i.days.map((j) => (
                    <span>
                      {j.slice(0, 1)}
                      {""}
                    </span>
                  ))}
                </td>
                <td className="py-3 font-semibold min-w-[200px]">{i.title}</td>
                <td className="py-3">
                  {i.currentPeople}
                  {""} 명
                </td>
                <td className="py-3">
                  <Link
                    to={`${i.lessonNo}`}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 block w-fit mx-auto"
                  >
                    상세
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr className="text-center">
              <td colSpan="9" className="py-6 text-gray-500">
                출석 데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceListComponent;
