import React, { useEffect, useState } from 'react'
import { getFaqCategory, getFaqList } from '../../api/faqApi'

const FaqListPageComponent = (props) => {
    const {
        faqs,
        openFaqId,
        faqCategories,
        handleCategoryClick,
        handleQuestionClick,
        filteredFaq,
        setselectedCategory,
        selectedCategory } = props
    return (
        // (6) [디자인 적용] 전체 컨테이너
        <div className="max-w-6xl mx-auto p-6">
            <nav className="text-sm text-gray-500 mb-6">
                홈 &gt; 커뮤니티 &gt; 자주묻는질문
            </nav>
            <div className="flex items-end justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">자주묻는질문</h1>
            </div>
            <div className="border-b-2 border-gray-400 mb-6" />


            {/* --- 1. 카테고리 탭 메뉴 (디자인 적용) --- */}
            <div className="flex flex-wrap border-b border-gray-300 mb-6">

                {/* "전체보기" 탭 (디자인 적용) */}
                <button
                    onClick={() => setselectedCategory(null)} // "전체"는 ID를 null로
                    className={`py-2 px-4 text-lg font-medium ${selectedCategory === null
                        ? 'border-b-2 border-blue-600 text-blue-600' // 활성화 스타일
                        : 'text-gray-500 hover:text-gray-800' // 비활성화 스타일
                        }`}
                >
                    전체보기
                </button>

                {/* DB에서 가져온 카테고리 탭 (디자인 적용) */}
                {faqCategories.map(cat => (
                    <button
                        key={cat.faqCategoryId} // (id 대신 key를 사용해야 합니다)
                        onClick={() => handleCategoryClick(cat)} // (클릭 시 cat 객체를 넘기도록 수정)
                        className={`py-2 px-4 text-lg font-medium ${selectedCategory === cat.faqCategoryId
                            ? 'border-b-2 border-blue-600 text-blue-600' // 활성화 스타일
                            : 'text-gray-500 hover:text-gray-800' // 비활성화 스타일
                            }`}
                    >
                        {cat.categoryName}
                    </button>
                ))}
            </div>

            {/* --- 2. FAQ 목록 (아코디언 디자인 적용) --- */}
            <div className="space-y-2">
                {filteredFaq.length > 0 ? filteredFaq.map(faq => (
                    // 아코디언 아이템
                    <div key={faq.faqId} className="border rounded-md overflow-hidden shadow-sm">

                        {/* 질문 (Q) - 클릭 가능한 헤더 */}
                        <div
                            onClick={() => handleQuestionClick(faq.faqId)}
                            className="flex justify-between items-center p-4 cursor-pointer bg-white hover:bg-gray-50"
                        >
                            <span className="font-semibold text-gray-800">
                                <span className="text-blue-600 font-bold mr-2">Q.</span>
                                {faq.question}
                            </span>
                            {/* 화살표 아이콘 (열림/닫힘) */}
                            <span className="text-gray-500">
                                {openFaqId === faq.faqId ? '▲' : '▼'}
                            </span>
                        </div>

                        {/* 답변 (A) - 조건부 렌더링 */}
                        {openFaqId === faq.faqId && (
                            <div className="p-4 border-t border-gray-200 bg-gray-50 text-gray-700">
                                <span className="text-red-600 font-bold mr-2 align-top">A.</span>
                                {/* 답변 내용 (줄바꿈이 적용되도록 pre-wrap) */}
                                <span className="inline-block w-[calc(100%-2rem)] whitespace-pre-wrap">
                                    {faq.answer}
                                </span>
                            </div>
                        )}
                    </div>
                )) : (
                    // (7) [수정] FAQ가 없을 때의 메시지
                    <div className="text-center text-gray-500 p-8">
                        {faqCategories.length == 0 ? "해당 카테고리에 등록된 FAQ가 없습니다." : "FAQ를 불러오는 중입니다..."}
                    </div>
                )}
            </div>
        </div>
    )
}

export default FaqListPageComponent