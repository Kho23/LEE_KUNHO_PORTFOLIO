import "../../../styles/calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import PaymentButton from "../../../components/payment/PaymentButton";
import { Link } from "react-router-dom";
import { PiNoteDuotone } from "react-icons/pi";

const DailyUsePageComponent = ({
  facilities,
  clickFacilityHandler,
  facility,
  space,
  price,
  clickSpaceHandler,
  selectedSpace,
  selectedDate,
  handleDateClick,
  handleTimeClick,
  handlePayment,
  selectedTime,
  availableTime,
  isLoggedIn,
}) => {
  return (
    <>
      {isLoggedIn ? (
        <div className="max-w-6xl mx-auto p-6">
          <nav className="text-sm text-gray-500 mb-6">
            홈 &gt; 예약신청 &gt; 일일이용예약
          </nav>
          <div className="flex items-end justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">일일이용예약</h1>
          </div>
          <div className="border-b-2 border-gray-400 mb-6" />

          <div className="border rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-600 mb-3">
              일일이용예약을 진행할 시설과 장소를 선택하세요.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold mb-2">시설</p>
                <div className="border rounded-md h-32 overflow-y-auto">
                  {facilities.map((f) => (
                    <div
                      key={f.id}
                      onClick={() => {
                        clickFacilityHandler(f.id);
                      }}
                      className={`p-2 cursor-pointer hover:bg-gray-100 ${
                        facility === f.id ? "bg-blue-900 text-white" : ""
                      }`}
                    >
                      {f.name}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-semibold mb-2">장소</p>
                <div className="border rounded-md h-32 overflow-y-auto">
                  {facility === 2 ? (
                    <p className="text-xs p-2 text-gray-400">
                      헬스장은 공간 선택이 필요 없습니다.
                    </p>
                  ) : !space ? (
                    <p className="text-xs p-2 text-gray-400">
                      시설 먼저 선택하세요.
                    </p>
                  ) : (
                    space?.map((i) => (
                      <div
                        key={i.id}
                        onClick={() => clickSpaceHandler(i.id)}
                        className={`p-2 cursor-pointer hover:bg-gray-100 ${
                          selectedSpace === i.id ? "bg-blue-900 text-white" : ""
                        }`}
                      >
                        {i.spaceName}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              ※ 시설, 장소를 모두 선택해야 날짜 예약이 가능합니다.
            </p>
          </div>

          <div className="flex gap-6">
            <div className="w-2/3">
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale="ko"
                height="auto"
                headerToolbar={{
                  start: "prev",
                  center: "title",
                  end: "next",
                }}
                dateClick={
                  facility === 2 || (facility && selectedSpace)
                    ? handleDateClick
                    : undefined
                }
                dayCellContent={(arg) => arg.date.getDate()}
                validRange={{
                  start: new Date().toISOString().split("T")[0],
                }}
                dayCellClassNames={(arg) => {
                  const cellDate = arg.date.toLocaleDateString("sv");
                  return cellDate === selectedDate ? "selected-date" : "";
                }}
              />
            </div>

            <div className="w-1/3 border rounded-md p-4">
              <div className="border border-gray-200 bg-gray-50 rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  이용 요금 안내
                </h3>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-800 mb-1">
                    공통 운영 시간
                  </p>
                  <p className="text-xs text-gray-700 ml-1">
                    • 모든 시설은 <b className="text-gray-900">06시 ~ 22시</b>
                    까지 운영됩니다.
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-800 mb-1">
                    수영장
                  </p>
                  <div className="text-xs text-gray-700 space-y-1 ml-1">
                    <p>
                      • 1시간 이용 :{" "}
                      <b className="text-gray-900">{facilities[0].price}원</b>
                    </p>
                    <p>• 수영복·수모 필수 착용</p>
                    <p>• 어린이(만 13세 미만)는 보호자 동반 입장</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-800 mb-1">
                    헬스장
                  </p>
                  <div className="text-xs text-gray-700 space-y-1 ml-1">
                    <p>
                      • 1일 이용 :{" "}
                      <b className="text-gray-900">{facilities[1].price}원</b>
                    </p>
                    <p>• 운동복·실내용 운동화 필수 지참</p>
                    <p>• 만 16세 이상 입장 가능</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-800 mb-1">
                    골프 연습장
                  </p>
                  <div className="text-xs text-gray-700 space-y-1 ml-1">
                    <p>
                      • 1시간 이용 :{" "}
                      <b className="text-gray-900">{facilities[2].price}원</b>
                    </p>
                    <p>• 골프채 대여 가능 (유료)</p>
                    <p>• 양손 장갑 착용 권장</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                  ※ 시설 파손 시 추가 요금이 부과될 수 있습니다.
                </p>
              </div>

              {facility === 2 ? (
                !selectedDate ? (
                  <p className="text-gray-500 text-sm mt-4">
                    날짜를 선택해주세요.
                  </p>
                ) : (
                  <div className="mt-4">
                    <div className="border-t border-b border-gray-300 py-4 space-y-3">
                      <p className="text-lg font-bold text-gray-800 mb-1">
                        예약 정보
                      </p>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">예약일</span>
                        <span className="font-semibold">{selectedDate}</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">시설</span>
                        <span className="font-semibold">
                          {facilities.find((i) => i.id === facility).name}
                        </span>
                      </div>

                      <div className="flex justify-between items-baseline">
                        <span className="text-sm text-gray-700 font-medium">
                          총 이용금액
                        </span>
                        <span className="text-lg font-extrabold text-blue-900">
                          {facilities[1].price} 원
                        </span>
                      </div>
                    </div>
                    <PaymentButton info={handlePayment()} />
                  </div>
                )
              ) : !space ? (
                <p className="text-gray-500 text-sm mt-4">
                  시설 먼저 선택하세요.
                </p>
              ) : !selectedDate ? (
                <p className="text-gray-500 text-sm mt-4">
                  날짜를 선택해주세요.
                </p>
              ) : (
                <div className="mt-4">
                  <p className="text-sm font-semibold mt-4">시간 선택</p>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {availableTime?.map((t) => (
                      <button
                        key={t}
                        onClick={() => handleTimeClick(t)}
                        className={`border rounded-md p-2 text-sm hover:bg-gray-100 ${
                          selectedTime?.includes(t)
                            ? "bg-blue-900 text-white"
                            : ""
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4">
                    <div className="border-t border-b border-gray-300 py-4 space-y-3">
                      <p className="text-lg font-bold text-gray-800 mb-1">
                        예약 정보
                      </p>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">예약일</span>
                        <span className="font-semibold">{selectedDate}</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">시설</span>
                        <span className="font-semibold">
                          {facilities.find((i) => i.id === facility).name}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">장소</span>
                        <span className="font-semibold">
                          {space.find((s) => s.id === selectedSpace).spaceName}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">선택시간</span>
                        <span className="font-semibold">
                          {selectedTime.length > 0
                            ? `${selectedTime[0].split("~")[0]} ~ ${
                                selectedTime[selectedTime.length - 1].split(
                                  "~"
                                )[1]
                              }`
                            : "-"}
                        </span>
                      </div>

                      <div className="flex justify-between items-baseline">
                        <span className="text-sm text-gray-700 font-medium">
                          총 이용금액
                        </span>
                        <span className="text-lg font-extrabold text-blue-900">
                          {price} 원
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 space-y-1 text-[11px] text-gray-500 leading-relaxed">
                      <p>※ 결제 완료 후 예약이 확정됩니다.</p>
                    </div>
                  </div>

                  {selectedTime && selectedTime.length > 0 && (
                    <PaymentButton info={handlePayment()} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-20 text-3xl font-extrabold text-blue-700 p-10 bg-white rounded-2xl max-w-3xl mx-auto shadow-2xl border border-blue-100">
          <PiNoteDuotone className="mx-auto text-6xl text-blue-950 mb-4" />
          <span className="text-3xl font-extrabold text-gray-900 block">
            일일 이용 예약은 회원 전용입니다.
          </span>
          <p className="text-lg font-medium text-gray-600 mt-4 leading-relaxed">
            일일 이용 예약을 원하실 경우, 로그인을 먼저 진행해 주세요.
            <br />
            <Link
              to="/auth/login"
              className="
                    inline-block mt-8 px-8 py-3
                    bg-blue-900 text-white font-semibold
                    rounded-xl shadow-md
                    hover:bg-blue-800 hover:shadow-lg
                    transition-all duration-200
                  "
            >
              로그인 바로가기
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default DailyUsePageComponent;
