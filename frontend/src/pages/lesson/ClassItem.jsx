import React, { useState } from 'react';
import { checkRegistration } from '../../api/classApi';
import useCustomMove from '../../hooks/useCustomMove';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

const ClassItem = ({ classes }) => {
    const { moveToLessonDetail, moveToLogin, moveToLessonList } = useCustomMove();
    const { isLoggedIn } = useSelector((state) => state.auth);

    const handleClick = async (e, id) => {
        e.stopPropagation()
        try {
            if (!isLoggedIn) {
                if (window.confirm("로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?")) {
                    moveToLogin();
                } else {
                    moveToLessonList()
                }
                return;
            }
            if (classes.registered) {
                alert("이미 신청된 강의입니다.");
                return;
            }

            const data = await checkRegistration(id);

            if (data) {
                alert("이미 신청된 강의입니다.");
                return;
            }
            moveToLessonDetail(id);
        } catch (error) {
            console.error("실행중 에러 발생", error);
        }
    };

    // 상태 뱃지 디자인 함수
    const getClassStatusBadge = (status) => {
        switch (status) {
            case 'ACCEPTED':
                return <span className="px-2 py-1 text-xs font-bold text-green-700 bg-green-100 rounded-full border border-green-200">접수중</span>;
            case 'PENDING':
                return <span className="px-2 py-1 text-xs font-bold text-yellow-700 bg-yellow-100 rounded-full border border-yellow-200">개설 대기</span>;
            case 'CLOSED':
                return <span className="px-2 py-1 text-xs font-bold text-red-700 bg-red-100 rounded-full border border-red-200">마감</span>;
            default:
                return null;
        }
    };

    // 카테고리 라벨 디자인 함수
    const getCategoryLabel = (category) => {
        const categoryMap = {
            '골프장': { label: '골프', color: 'text-green-600 bg-green-50' },
            '풋살장': { label: '풋살', color: 'text-blue-600 bg-blue-50' },
            '수영장': { label: '수영', color: 'text-cyan-600 bg-cyan-50' },
            '헬스장': { label: '헬스', color: 'text-orange-600 bg-orange-50' },
            '무용실': { label: '무용', color: 'text-purple-600 bg-purple-50' }
        };
        const current = categoryMap[category] || { label: '기타', color: 'text-gray-600 bg-gray-50' };

        return (
            <span className={`px-2 py-1 text-xs font-extrabold rounded ${current.color} mr-2`}>
                {current.label}
            </span>
        );
    };

    return (
        <div className="group bg-white border border-gray-200 rounded-xl p-5 mb-4 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4" onClick={() => moveToLessonDetail(classes.lessonId)}>

            {/* 왼쪽: 강좌 정보 영역 */}
            <div className="flex-1">
                {/* 상단 뱃지 영역 */}
                <div className="flex items-center gap-2 mb-2">
                    {getCategoryLabel(classes.category)}
                    {getClassStatusBadge(classes.status)}
                    <span className="text-gray-400 text-xs">|</span>
                    <span className="text-gray-500 text-xs font-medium">
                        {classes.startDate.replaceAll('-', '.').substring(5)} 개강
                    </span>
                </div>

                {/* 강좌 제목 */}
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {classes.title}
                    <span className="ml-2 text-sm font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        {classes.level}
                    </span>
                </h3>

                {/* 상세 정보 그리드 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        <span>{classes.startDate} ~ {classes.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>
                            <span className="font-semibold text-gray-700">{classes.days.join(", ")}</span>
                            <span className="mx-1">·</span>
                            {classes.startTime.substring(0, 5)} ~ {classes.endTime.substring(0, 5)}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 sm:mt-0">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        <span>강사: <span className="text-gray-800 font-medium">{classes.partnerName}</span></span>
                    </div>
                </div>
            </div>

            {/* 오른쪽: 버튼 영역 */}
            <div className="flex flex-col items-end justify-center min-w-[120px]">
                {classes.registered === true ? (
                    <button
                        disabled
                        className="w-full md:w-auto bg-gray-100 text-gray-400 border border-gray-200 px-5 py-2.5 rounded-lg font-bold text-sm cursor-not-allowed transition-all"
                    >
                        신청 완료
                    </button>
                ) : (
                    <button
                        onClick={(e) => handleClick(e,classes.lessonId)}
                        className="w-full md:w-auto bg-black text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-gray-800 hover:shadow-md active:scale-95 transition-all duration-200 whitespace-nowrap"
                    >
                        신청하기
                    </button>
                )}
            </div>
        </div>
    );
};

export default ClassItem;