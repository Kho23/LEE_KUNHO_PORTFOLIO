import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { jsx } from "react/jsx-runtime";

const LessonRequestComponent = ({
  form,
  data,
  className,
  availableTimes,
  timesForCheck,
  partnerClass,
  formChangeHandler,
  dateChangeHandler,
}) => {
  const facilityMap = {
    POOL: {
      guide: [
        "수영 : 한 레인당 최소 1명, 최대 6명 권장.",
        "시설 배정은 운영 상황에 따라 변경될 수 있으며, 관리자 확인이 필요할 수 있습니다.",
      ],
    },
    GOLF: {
      guide: [
        "골프 : 좌석은 1인 사용 원칙이며, 장비 사용 시 안전거리를 확보해 주세요.",
        "시설 배정은 운영 상황에 따라 변경될 수 있으며, 관리자 확인이 필요할 수 있습니다.",
      ],
    },
    FUTSAL: {
      guide: [
        "풋살 : 경기장 1면 기준 약 10~12명 수용 가능하며, 팀 경기 시 보호 장비 착용을 권장합니다.",
        "시설 배정은 운영 상황에 따라 변경될 수 있으며, 관리자 확인이 필요할 수 있습니다.",
      ],
    },
    DANCE: {
      guide: [
        "무용 : 각 무용실 정원은 약 10~15명이며, 실내 전용 신발 착용을 권장합니다.",
        "시설 배정은 운영 상황에 따라 변경될 수 있으며, 관리자 확인이 필요할 수 있습니다.",
      ],
    },
  };

  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-10">
      <div className="mb-10">
        <h2 className="text-4xl font-extrabold text-gray-900 border-b-4 border-blue-900 inline-block pb-1">
          강좌 신청
        </h2>
        <div
          className="
            mt-6 
            p-5  
            bg-gray-50 
            border border-gray-300 
            rounded-xl 
            shadow-sm
          "
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">강사 정보</h3>

          <ul className="space-y-2 text-gray-700 text-base">
            <li className="flex items-center gap-3">
              <span className="font-semibold w-32 text-blue-900">강사명</span>
              <span>{data.memberName}</span>
            </li>

            <li className="flex items-center gap-3">
              <span className="font-semibold w-32 text-blue-900">생년월일</span>
              <span>{data.memberBirthDate?.slice(0, 10)}</span>
            </li>

            <li className="flex items-center gap-3">
              <span className="font-semibold w-32 text-blue-900">이메일</span>
              <span>{data.memberEmail}</span>
            </li>

            <li className="flex items-center gap-3">
              <span className="font-semibold w-32 text-blue-900">아이디</span>
              <span>{data.memberLoginId}</span>
            </li>

            <li className="flex items-center gap-3">
              <span className="font-semibold w-32 text-blue-900">전화번호</span>
              <span>{data.memberPhoneNumber}</span>
            </li>
          </ul>
        </div>
        <div className="mt-4 flex items-start gap-3 rounded-lg bg-gray-50 px-4 py-3 border border-gray-200">
          <span className="text-sm font-bold text-blue-800">※</span>
          <span className="text-sm text-gray-700 leading-6">
            모든 항목은 <span className="font-semibold">필수 입력</span>{" "}
            사항입니다. 빠짐없이 작성해 주세요.
          </span>
        </div>
      </div>
      <section className="mb-12">
        <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-300 pb-3 mb-6">
          1. 강좌 제목
        </h3>
        <div>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={(e) => formChangeHandler(e)}
            className="
              w-full 
              border border-gray-300 
              rounded-lg 
              p-3 
              text-gray-800 
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-200 
              focus:border-blue-500
              transition
            "
            placeholder="강좌 제목을 입력해주세요"
          />
        </div>
      </section>
      <section className="mb-12">
        <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-300 pb-3 mb-6">
          2. 강좌 분야
        </h3>
        {partnerClass &&
          partnerClass
            .filter((i) => i !== "헬스")
            .map((i) => (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 mt-4 text-gray-800 text-base">
                <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
                  <input
                    type="radio"
                    name="facilityType"
                    value={i === "수영" ? "POOL" : i === "골프" ? "GOLF" : i === "풋살" ? "FUTSAL" : "DANCE"}
                    onClick={(e) => formChangeHandler(e)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
                  />
                  {i}
                </label>
              </div>
            ))}
      </section>
      <section className="mb-12">
        <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-300 pb-3 mb-6">
          3. 강좌 난이도
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 mt-4 text-gray-800 text-base">
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="radio"
              name="level"
              value={"하급"}
              onClick={(e) => formChangeHandler(e)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            하급
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="radio"
              name="level"
              value={"중급"}
              onClick={(e) => formChangeHandler(e)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            중급
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="radio"
              name="level"
              value={"상급"}
              onClick={(e) => formChangeHandler(e)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            상급
          </label>
        </div>
      </section>
      <section className="mb-12">
        <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-300 pb-3 mb-6">
          4. 기간
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex flex-col w-full">
            <label className="text-gray-700 font-semibold mb-2">시작일</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate ?? ""}
              onChange={(e) => formChangeHandler(e)}
              className="
                w-full 
                border border-gray-300 
                rounded-lg 
                p-3 
                text-gray-800 
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-200 
                focus:border-blue-500
                transition
              "
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-gray-700 font-semibold mb-2">종료일</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate ?? ""}
              onChange={(e) => formChangeHandler(e)}
              className="
                w-full 
                border border-gray-300 
                rounded-lg 
                p-3 
                text-gray-800 
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-200 
                focus:border-blue-500
                transition
              "
            />
          </div>
        </div>
      </section>
      <section className="mb-12">
        <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-300 pb-3 mb-6">
          5. 강좌 요일
        </h3>
        <div
          onChange={(e) => dateChangeHandler(e)}
          className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 mt-4 text-gray-800 text-base"
        >
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="checkbox"
              name="days"
              value={"월요일"}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            월
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="checkbox"
              name="days"
              value={"화요일"}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            화
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="checkbox"
              name="days"
              value={"수요일"}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            수
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="checkbox"
              name="days"
              value={"목요일"}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            목
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="checkbox"
              name="days"
              value={"금요일"}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            금
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="checkbox"
              name="days"
              value={"토요일"}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            토
          </label>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-300 pb-3 mb-6">
          6. 필요 시설
        </h3>

        {availableTimes?.map((i) => (
          <div
            key={i.spaceId}
            className={`p-4 border rounded-lg mb-3
      ${form.facilityRoomType == i.spaceId
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200"
              }
    `}
          >
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-800">{i.spaceName}</span>
              <button
                name="facilityRoomType"
                value={i.spaceId}
                onClick={(e) => formChangeHandler(e)}
                className="text-sm text-blue-600 font-semibold"
              >
                선택
              </button>
            </div>

            <p className="text-xs text-gray-600 mt-2">
              가능한 시간: {""}
              {i?.schedule
                .map((j) => j.times)
                .reduce(
                  (j, k) => j.filter((t) => k.includes(t)),
                  i.schedule[0]?.times ?? []
                )
                .join(", ") || "없음"}
            </p>
          </div>
        ))}

        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 mb-1">
            시설 이용 안내
          </h4>
          <span className="text-xs text-gray-500 space-y-2 leading-5 pl-1">
            {facilityMap[form.facilityType]?.guide[0]}
            <br /> {facilityMap[form.facilityType]?.guide[1]}
          </span>
        </div>
      </section>
      <section className="mb-12">
        <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-300 pb-3 mb-6">
          7. 강좌 시간
        </h3>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex flex-col w-full">
            <label className="text-gray-700 font-semibold mb-2">
              시작 시간
            </label>
            <select
              name="startTime"
              value={form.startTime ?? ""}
              disabled={!form.facilityRoomType}
              onChange={(e) => formChangeHandler(e)}
              className="
                w-full 
                border border-gray-300 
                rounded-lg 
                p-3 
                text-gray-800 
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-200 
                focus:border-blue-500
                transition
              "
            >
              <option value="" disabled selected>
                시간 선택
              </option>
              {timesForCheck?.map((i) => (
                <option value={i} key={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label className="text-gray-700 font-semibold mb-2">
              끝나는 시간
            </label>
            <select
              name="endTime"
              value={form.endTime ?? ""}
              disabled={!form.facilityRoomType}
              onChange={(e) => formChangeHandler(e)}
              className="
                w-full 
                border border-gray-300 
                rounded-lg 
                p-3 
                text-gray-800 
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-200 
                focus:border-blue-500
                transition
              "
            >
              <option value="" disabled selected>
                시간 선택
              </option>
              {timesForCheck?.map((i) => (
                <option value={i} key={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LessonRequestComponent;
