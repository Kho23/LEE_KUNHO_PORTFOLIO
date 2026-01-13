import { Link } from "react-router-dom";
import { PiNoteDuotone } from "react-icons/pi";

const RentalComponent = ({ data, cancelHandler }) => {
  return (
    <>
      {data == "" ? (
        <div className="text-center mt-20 text-3xl font-extrabold text-blue-700 p-10 bg-white rounded-2xl max-w-3xl mx-auto shadow-2xl border border-blue-100">
          <PiNoteDuotone className="mx-auto text-6xl text-blue-950 mb-4" />
          <span className="text-3xl font-extrabold text-gray-900 block">
            대관 신청 내역이 없습니다.
          </span>

          <p className="text-lg font-medium text-gray-600 mt-4 leading-relaxed">
            대관 신청을 원하실 경우, 대관 신청 페이지를 이용해 주세요.
            <br />
            <Link
              to="/reservation/rental"
              className="
                inline-block mt-8 px-8 py-3 
                bg-blue-900 text-white font-semibold 
                rounded-xl shadow-md 
                hover:bg-blue-800 hover:shadow-lg 
                transition-all duration-200
              "
            >
              대관 신청 바로가기
            </Link>
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center min-h-screen bg-white pt-10 md:pt-20">
          <div className="w-full max-w-4xl px-4 mb-8">
            <div className="flex justify-between items-end border-b-2 border-gray-300 pb-4 mb-6">
              <h1 className="text-4xl font-bold text-gray-900">
                대관 신청 목록
              </h1>
            </div>

            <div className="text-sm text-gray-600 mb-10 leading-relaxed">
              회원님의
              <span className="text-[#263c79] font-bold">대관신청 목록</span>
              입니다.
              <br />
              신청 상태 및 상세 내역을 확인하실 수 있습니다.
            </div>
          </div>

          {data?.map((i) => (
            <div className="w-full max-w-4xl px-4 pb-8">
              <div className="w-full border border-gray-300 bg-white p-6 mb-4 shadow-sm transition-shadow rounded-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1 min-w-0 pr-4 md:border-r md:border-gray-200">
                  <h2 className="text-xl font-extrabold text-[#263C79] flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-6 bg-[#263C79] rounded-sm"></span>
                    예약 정보
                  </h2>
                  <div className="text-gray-700 text-base leading-relaxed space-y-3">
                    <div className="flex items-center">
                      <span className="font-medium mr-2 text-gray-400">
                        예약일
                      </span>
                      <span>{i.startTime?.slice(0, 10)}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2 text-gray-400">
                        시간
                      </span>
                      <span>
                        {i.startTime?.slice(11, 16)} ~ {i.endTime.slice(11, 16)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2 text-gray-400">
                        시설·장소
                      </span>
                      <span>
                        {data?.find((j) => j.spaceId == i.spaceId)?.spaceName}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2 text-gray-400">
                        이용 금액
                      </span>
                      <span>{i.price} 원</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-w-0md:pl-4">
                  <h2 className="text-xl font-extrabold text-[#263C79] flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-6 bg-[#263C79] rounded-sm"></span>
                    신청자 정보
                  </h2>
                  <div className="text-gray-700 text-base leading-relaxed space-y-3">
                    <div className="flex items-center">
                      <span className="font-medium mr-2 text-gray-400">
                        이름
                      </span>
                      <span>{i.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2 text-gray-400">
                        전화번호
                      </span>
                      <span>{i.phoneNumber}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2 text-gray-400">
                        요청사항
                      </span>
                      <span>{i.memo}</span>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    {new Date(i.startTime) > new Date() && (
                      <button
                        onClick={() => cancelHandler(i)}
                        className="px-3 py-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded hover:bg-red-500 hover:text-white hover:border-red-200 transition-colors duration-200"
                      >
                        취소하기
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default RentalComponent;
