import React, { useEffect, useState } from 'react';
import { getPreviewLessons } from '../../api/classApi';
import useCustomMove from '../../hooks/useCustomMove';

const LessonPreview = () => {
  const [lessons, setLessons] = useState([]);
  const { moveToLessonDetail } = useCustomMove();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPreviewLessons();
        // 공지사항처럼 최대 7개까지만 자르기 (필요 시 조절)
        const sorted = [...data].slice(0, 7); 
        setLessons(sorted);
      } catch (error) {
        console.error("강의 목록 로딩 실패:", error);
      }
    };
    fetchData();
  }, []);

  // D-Day 계산 함수
  const getDDayString = (endDateStr) => {
    if (!endDateStr) return "";
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const end = new Date(endDateStr);
    end.setHours(0, 0, 0, 0);

    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "마감됨";
    if (diffDays === 0) return "오늘마감";
    return `D-${diffDays}`;
  };

  return (
    // NoticePreview와 동일한 컨테이너 스타일
    <div className="w-full bg-white rounded-lg shadow-sm border p-3">
      {/* List */}
      <ul className="text-[13px] text-gray-600">
        {lessons.length === 0 ? (
          <li className="py-6 text-center text-gray-400">마감 임박 강의 없음</li>
        ) : (
          lessons.map((lesson) => {
            const dDay = getDDayString(lesson.regEndDate);
            const isUrgent = dDay === '오늘마감' || dDay.startsWith('D-');

            return (
              <li
                key={lesson.lessonId}
                onClick={() => moveToLessonDetail(lesson.lessonId)}
                // NoticePreview와 동일한 리스트 아이템 스타일
                className="flex justify-between py-2 cursor-pointer px-1 transition border-b hover:font-semibold hover:text-blue-300"
              >
                {/* 왼쪽: 강의 제목 */}
                <span className="flex-1 pr-2 truncate text-black">
                  {lesson.title}
                </span>

                {/* 오른쪽: D-Day (날짜 대신 D-Day 표시) */}
                {/* width를 w-24 정도로 주어 우측 정렬 유지 */}
                <span className={`w-24 text-right ${isUrgent ? 'text-red-500 font-bold' : 'text-black'}`}>
                  {dDay}
                </span>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default LessonPreview;