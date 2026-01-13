import React from "react";
import ClassItem from "./ClassItem";
import PageComponent from "../../components/common/page/PageComponent";
import { Search, SlidersHorizontal } from "lucide-react";

const CATEGORY = [
  { label: "전체", value: "" },
  { label: "풋살", value: "풋살장" },
  { label: "무용", value: "무용실" },
  { label: "헬스", value: "헬스장" },
  { label: "수영", value: "수영장" },
  { label: "골프", value: "골프장" },
];

const DAY = [
  { label: "월", value: "MON" },
  { label: "화", value: "TUE" },
  { label: "수", value: "WED" },
  { label: "목", value: "THU" },
  { label: "금", value: "FRI" },
  { label: "토", value: "SAT" },
  { label: "일", value: "SUN" },
];

const LessonListPageComponent = ({
  classes, pageData, searchTerm, setSearchTerm, searchType, setSearchType,
  sortType, category, setCategory, startTime, setStartTime, endTime, setEndTime,
  days, available, setAvailable, handleSelectDay, handleSearchSubmit, handleSortChange, handleKeyDown
}) => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <nav className="text-sm text-gray-500 mb-6">
        홈 &gt; 예약신청 &gt; 수강신청
      </nav>
      <div className="flex items-end justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-900">수강신청</h1>
      </div>
      <div className="border-b-2 border-gray-400 mb-6" />

      <p className="text-gray-500 mb-8 font-bold">
        ※ 신청 마감일은 개강일 기준 3일 전입니다.
      </p>

      {/* 1. 카테고리 탭 */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORY.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setCategory(cat.value)}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border
                ${category === cat.value
                ? "bg-blue-900 text-white border-blue-900 shadow-md transform scale-105"
                : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-700"
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 2. 메인 검색 필터 박스 */}
      <div className="border border-gray-300 rounded-xl p-6 mb-8 bg-white shadow-sm">
        <div className="space-y-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <label className="text-xs font-bold text-gray-400 uppercase mb-2 block tracking-wider">
                요일 선택
              </label>
              <div className="flex gap-2 flex-wrap">
                {DAY.map((day) => (
                  <button
                    key={day.value}
                    onClick={() => handleSelectDay(day.value)}
                    className={`w-9 h-9 rounded-full text-sm font-bold transition-all border
                          ${days.includes(day.value)
                        ? "bg-blue-100 text-blue-700 border-blue-200 ring-2 ring-blue-50"
                        : "bg-white text-gray-400 border-gray-200 hover:border-gray-400 hover:text-gray-600"
                      }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase mb-2 block tracking-wider">
                시간대
              </label>
              <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-lg border border-gray-200">
                <select
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none p-1 cursor-pointer"
                >
                  <option value="">선택 안함</option>
                  {Array.from({ length: 24 }, (_, i) => i).map((hour) => {
                    const timeString = `${hour < 10 ? `0${hour}` : hour}:00`;
                    return <option key={timeString} value={timeString}>{timeString}</option>;
                  })}
                </select>
                <span className="text-gray-400 text-sm">~</span>
                <select
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none p-1 cursor-pointer"
                >
                  <option value="">선택 안함</option>
                  {Array.from({ length: 24 }, (_, i) => i).map((hour) => {
                    const timeString = `${hour < 10 ? `0${hour}` : hour}:00`;
                    return <option key={timeString} value={timeString}>{timeString}</option>;
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 pt-5 border-t border-gray-100 items-end">
          <div className="md:w-28 w-full">
            <label className="text-xs font-bold text-gray-500 mb-1 block">검색 조건</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="t">강좌명</option>
              <option value="c">강사명</option>
            </select>
          </div>

          <div className="flex-1 w-full relative">
            <label className="text-xs font-bold text-gray-500 mb-1 block">검색어</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          <div className="md:w-32 w-full">
            <label className="text-xs font-bold text-gray-500 mb-1 block">정렬</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none"
              value={sortType}
              onChange={handleSortChange}
            >
              <option value="FASTEST">최신등록순</option>
              <option value="LATEST">개강임박순</option>
            </select>
          </div>

          <button
            onClick={handleSearchSubmit}
            className="w-full md:w-auto bg-blue-900 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-blue-800 transition-all shadow-md h-[42px]"
          >
            검색
          </button>
        </div>

        <div className="flex justify-end mt-3">
          <label className="flex items-center gap-2 cursor-pointer select-none group">
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
              className="w-4 h-4 accent-blue-900"
            />
            <span className="text-xs font-semibold text-gray-500 group-hover:text-blue-900 transition-colors">
              접수 가능한 강좌만 보기
            </span>
          </label>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2 text-gray-700 font-medium">
        <SlidersHorizontal className="w-5 h-5 text-blue-900" />
        <span>총 <span className="text-blue-900 font-bold text-lg">{pageData?.totalCnt || 0}</span> 개의 강좌</span>
      </div>

      <div className="space-y-4 min-h-[500px]">
        {classes && classes.length > 0 ? (
          classes.map((course) => <ClassItem key={course.lessonId} classes={course} />)
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl border border-gray-300 text-center">
            <Search className="w-12 h-12 text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium text-lg">검색된 강좌가 없습니다.</p>
          </div>
        )}
      </div>
      <div className="mt-10 mb-20">
        <PageComponent pageData={pageData} />
      </div>
    </div>
  );
};

export default LessonListPageComponent;