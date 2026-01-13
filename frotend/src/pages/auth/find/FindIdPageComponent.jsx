import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { checkCode, sendCode } from '../../../api/authApi'

const initState = {
    memberName: "",
    memberEmail: ""
}

const FindIdPageComponent = ({
    step,
    setStep,
    memberInfo,
    handleChange,
    handleSubmit,
    authCode,
    setAuthCode,
    handleVerity,
    timer,
    formatTime,
    foundID }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center min-h-screen bg-white pt-10 md:pt-20">

            {/* 상단 헤더 (로그인 페이지와 통일) */}
            <div className="w-full max-w-4xl px-4 mb-8">
                <div className="flex justify-between items-end border-b-2 border-gray-300 pb-4 mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">아이디 찾기</h1>
                    <div className="flex space-x-2 text-gray-400">
                        <span className="border p-1 rounded-full cursor-pointer hover:bg-gray-100 w-8 h-8 flex items-center justify-center">🖨️</span>
                        <span className="border p-1 rounded-full cursor-pointer hover:bg-gray-100 w-8 h-8 flex items-center justify-center">🔗</span>
                    </div>
                </div>

                <div className="text-center text-sm text-gray-600 mb-10 leading-relaxed">
                    {step === 1 && "가입 시 입력한 이름과 이메일을 입력해주세요."}
                    {step === 2 && `${memberInfo.memberEmail}로 발송된 인증번호를 입력해주세요.`}
                    {step === 3 && "회원님의 아이디 찾기가 완료되었습니다."}
                </div>
            </div>

            {/* 메인 컨텐츠 박스 */}
            <div className="w-full max-w-2xl border border-gray-300 bg-white p-8 md:p-12 shadow-sm">
                <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">
                    {step === 1 && "정보 입력"}
                    {step === 2 && "인증번호 입력"}
                    {step === 3 && "아이디 확인"}
                </h2>

                {/* STEP 1: 정보 입력 및 발송 */}
                {step === 1 && (
                    <form className="flex flex-col space-y-6 px-4 md:px-10" onSubmit={handleSubmit}>
                        {/* 이름 입력 */}
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <span className="text-gray-400 w-8 mr-2 flex justify-center">
                                {/* User Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            </span>
                            <input
                                name="memberName"
                                type="text"
                                required
                                className="flex-1 appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                placeholder="이름"
                                onChange={handleChange}
                            />
                        </div>

                        {/* 이메일 입력 */}
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <span className="text-gray-400 w-8 mr-2 flex justify-center">
                                {/* Mail Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </span>
                            <input
                                name="memberEmail"
                                type="email"
                                required
                                className="flex-1 appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                placeholder="이메일 (example@email.com)"
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#2b4075] hover:bg-[#1e3161] text-white font-bold text-lg py-3 transition-colors shadow-sm mt-6"
                        >
                            인증번호 받기
                        </button>
                    </form>
                )}

                {/* STEP 2: 인증번호 입력 */}
                {step === 2 && (
                    <div className="flex flex-col space-y-6 px-4 md:px-10">
                        <div className="relative flex items-center border-b border-gray-300 py-2">
                            <span className="text-gray-400 w-8 mr-2 flex justify-center">
                                {/* Key Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                            </span>
                            <input
                                type="text"
                                value={authCode}
                                onChange={(e) => setAuthCode(e.target.value)}
                                className="flex-1 appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none tracking-widest"
                                placeholder="인증번호 6자리"
                                maxLength={6}
                            />
                            {/* 타이머 표시 */}
                            <span className={`absolute right-0 font-bold text-sm ${timer < 60 ? 'text-red-500' : 'text-gray-500'}`}>
                                {formatTime(timer)}
                            </span>
                        </div>

                        <button
                            onClick={handleVerity}
                            className="w-full bg-[#2b4075] hover:bg-[#1e3161] text-white font-bold text-lg py-3 transition-colors shadow-sm"
                        >
                            인증 확인
                        </button>

                        <div className="text-center mt-2">
                            <button
                                onClick={() => setStep(1)}
                                className="text-xs text-gray-500 underline hover:text-gray-800"
                            >
                                정보 다시 입력하기
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 3: 결과 확인 */}
                {step === 3 && (
                    <div className="flex flex-col items-center space-y-6 px-4 md:px-10 mt-4 animate-fade-in-up">
                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-2">
                            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        <div className="text-center w-full">
                            <h3 className="text-lg font-medium text-gray-900">회원님의 아이디</h3>
                            <div className="mt-4 p-5 bg-gray-50 border border-gray-200 rounded-lg">
                                <p className="text-2xl font-bold text-[#2b4075] tracking-wide select-all">
                                    {foundID}
                                </p>
                            </div>
                        </div>

                        <div className="flex space-x-3 w-full mt-4">
                            <button
                                onClick={() => navigate('/auth/login')}
                                className="flex-1 bg-[#2b4075] hover:bg-[#1e3161] text-white font-bold py-3 rounded shadow-sm transition-colors"
                            >
                                로그인 하러 가기
                            </button>
                            <button
                                onClick={() => navigate('/find-pw')}
                                className="flex-1 bg-white border border-gray-300 text-gray-700 font-bold py-3 rounded shadow-sm hover:bg-gray-50 transition-colors"
                            >
                                비밀번호 찾기
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* 하단 링크 */}
            <div className="mt-8 flex justify-center items-center text-sm text-gray-600">
                <button onClick={() => navigate('/login')} className="px-3 hover:text-black hover:underline">로그인</button>
                <span className="text-gray-300 text-xs">|</span>
                <button onClick={() => navigate('/find-pw')} className="px-3 hover:text-black hover:underline">비밀번호 찾기</button>
                <span className="text-gray-300 text-xs">|</span>
                <button onClick={() => navigate('/register')} className="px-3 hover:text-black hover:underline">회원가입</button>
            </div>
        </div>
    )
}

export default FindIdPageComponent