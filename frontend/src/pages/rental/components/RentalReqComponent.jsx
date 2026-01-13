import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import PaymentButton from "../../../components/payment/PaymentButton";
import "../../../styles/calendar.css";
import { useState } from "react";
import { PiNoteDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";

const RentalReqComponent = ({
  isLoggedIn,
  infoHandler,
  facilities,
  selectDate,
  scheduleData,
  setSpace,
  findFacilityFn,
  facility,
  handleDateClick,
  priceCalc,
  getSpace,
  space,
  selectTimeFn,
  selectTime,
  paymentHandler,
}) => {
  const [viewData, setViewData] = useState({});

  return (
    <>
      {!isLoggedIn ? (
        <div className="text-center mt-20 text-3xl font-extrabold text-blue-700 p-10 bg-white rounded-2xl max-w-3xl mx-auto shadow-2xl border border-blue-100">
          <PiNoteDuotone className="mx-auto text-6xl text-blue-950 mb-4" />
          <span className="text-3xl font-extrabold text-gray-900 block">
            대관신청은 회원 전용입니다.
          </span>

          <p className="text-lg font-medium text-gray-600 mt-4 leading-relaxed">
            대관 신청을 원하실 경우, 로그인을 먼저 진행해 주세요.
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
      ) : (
        <div className="max-w-6xl mx-auto p-6">
          <nav className="text-sm text-gray-500 mb-6">
            홈 &gt; 예약신청 &gt; 대관신청
          </nav>
          <div className="flex items-end justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">대관신청</h1>
          </div>
          <div className="border-b-2 border-gray-400 mb-6" />

          <div className="border border-gray-300 rounded-xl p-6 mb-8 bg-white shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 pb-3 mb-5 border-b border-gray-300">
              신청자 정보
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-1">이름</label>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => infoHandler(e)}
                  className="
                    w-full border border-gray-300 rounded-lg px-3 py-2
                    focus:outline-none focus:ring-1 focus:ring-blue-900
                  "
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-1">
                  연락처
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  onChange={(e) => infoHandler(e)}
                  className="
                    w-full border border-gray-300 rounded-lg px-3 py-2
                    focus:outline-none focus:ring-1 focus:ring-blue-900
                  "
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-1">
                  요청사항
                </label>
                <input
                  type="text"
                  name="memo"
                  onChange={(e) => infoHandler(e)}
                  className="
                    w-full border border-gray-300 rounded-lg px-3 py-2
                    focus:outline-none focus:ring-1 focus:ring-blue-900
                  "
                />
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-4 leading-relaxed">
              ※ 신청자 정보는 대관 승인, 취소 안내 등 주요 연락을 위해
              사용됩니다. 정확한 정보 입력이 안 되었을 경우 신청이 취소될 수
              있습니다.
            </p>
          </div>

          <div className="border rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-600 mb-3">
              대관 예약을 진행할 시설과 장소를 선택하세요.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold mb-2">시설</p>
                <div className="border rounded-md h-32 overflow-y-auto">
                  {facilities.map((i) => (
                    <div
                      key={i.id}
                      onClick={() => findFacilityFn(i.id)}
                      className={`p-2 cursor-pointer hover:bg-gray-100 ${
                        facility === i.id ? "bg-blue-900 text-white" : ""
                      }`}
                    >
                      {i.name}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-semibold mb-2">장소</p>
                <div className="border rounded-md h-32 overflow-y-auto">
                  {!facility ? (
                    <p className="text-xs p-2 text-gray-400">
                      시설 먼저 선택하세요.
                    </p>
                  ) : (
                    getSpace?.map((i) => (
                      <div
                        key={i.id}
                        onClick={() => {
                          setSpace(i.id);
                          setViewData(i.spaceName);
                        }}
                        className={`p-2 cursor-pointer hover:bg-gray-100 ${
                          space === i.id ? "bg-blue-900 text-white" : ""
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
                dayCellContent={(arg) => arg.date.getDate()}
                validRange={{
                  start: new Date().toISOString().split("T")[0],
                }}
                dateClick={facility && space ? handleDateClick : null}
                dayCellClassNames={(arg) => {
                  const cellDate = arg.date.toLocaleDateString("sv");
                  return cellDate === selectDate ? "selected-date" : "";
                }}
              />
            </div>

            <div className="w-[35%] border rounded-md p-4">
              <div className="border border-gray-200 bg-gray-50 rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  이용 요금 안내
                </h3>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-800 mb-1">
                    무용실 (A·B·C·D실)
                  </p>
                  <div className="text-xs text-gray-700 space-y-1 ml-1">
                    <p>
                      • 06:00 ~ 17:00 :{" "}
                      <b className="text-gray-900">{facilities[0].AMprice}원</b>
                    </p>
                    <p>
                      • 17:00 ~ 22:00 :{" "}
                      <b className="text-gray-900">{facilities[0].PMprice}원</b>
                    </p>
                  </div>
                </div>

                <div className="mb-2">
                  <p className="text-sm font-semibold text-gray-800 mb-1">
                    풋살장 (1·2·3구장)
                  </p>
                  <div className="text-xs text-gray-700 space-y-1 ml-1">
                    <p>
                      • 06:00 ~ 17:00 :{" "}
                      <b className="text-gray-900">{facilities[1].AMprice}원</b>
                    </p>
                    <p>
                      • 17:00 ~ 22:00 :{" "}
                      <b className="text-gray-900">{facilities[1].PMprice}원</b>
                    </p>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                  ※ 시설 파손 시 추가 요금이 부과될 수 있습니다.
                </p>
              </div>
              {!facility || !space ? (
                <p className="text-gray-500 text-sm mt-4">
                  시설과 장소를 먼저 선택해주세요.
                </p>
              ) : !selectDate ? (
                <p className="text-gray-500 text-sm mt-4">
                  날짜를 선택해주세요.
                </p>
              ) : (
                <div className="mt-4">
                  <p className="text-lg font-bold text-gray-800 mb-3">
                    시간 선택
                  </p>
                  <div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {scheduleData?.map((i) => (
                        <button
                          key={i}
                          onClick={() => selectTimeFn(i)}
                          className={`border rounded-md p-2 text-sm hover:bg-gray-100 ${
                            selectTime.includes(i)
                              ? "bg-blue-900 text-white"
                              : ""
                          }`}
                        >
                          {i}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="border-t border-b border-gray-300 py-4 space-y-3">
                      <p className="text-lg font-bold text-gray-800 mb-1">
                        예약 정보
                      </p>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">예약일</span>
                        <span className="font-semibold">{selectDate}</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">시설</span>
                        <span className="font-semibold">
                          {facilities.find((i) => i.id === facility).name}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">장소</span>
                        <span className="font-semibold">{viewData}</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">선택시간</span>
                        <span className="font-semibold">
                          {selectTime.length > 0
                            ? `${selectTime[0].split("~")[0]} ~ ${
                                selectTime[selectTime.length - 1].split("~")[1]
                              }`
                            : "-"}
                        </span>
                      </div>

                      <div className="flex justify-between items-baseline">
                        <span className="text-sm text-gray-700 font-medium">
                          총 이용금액
                        </span>
                        <span className="text-lg font-extrabold text-blue-900">
                          {priceCalc()} 원
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 space-y-1 text-[11px] text-gray-500 leading-relaxed">
                      <p>※ 결제 완료 후 예약이 확정됩니다.</p>
                    </div>
                  </div>
                  {selectTime?.length > 0 && (
                    <PaymentButton info={paymentHandler()} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RentalReqComponent;
