import React, { useEffect, useState } from 'react'
import { checkCodePw, resetPassword, sendCodePw } from '../../../api/authApi'
import useCustomMove from '../../../hooks/useCustomMove'


const FindPwPageComponent = ({
  step,
  setStep,
  memberInfo,
  timer,
  formatTime,
  handleSendCode,
  handleClickCheck,
  handleResetPassword,
  handleChange,
  validationErrors
}) => {

  const { moveToLogin, moveToFindId, moveToFindPw } = useCustomMove()
  return (
    <div>
      <div className="flex flex-col items-center min-h-screen bg-white pt-10 md:pt-20">

        {/* 상단 헤더 (로그인 페이지와 통일) */}
        <div className="w-full max-w-4xl px-4 mb-8">
          <div className="flex justify-between items-end border-b-2 border-gray-300 pb-4 mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">비밀번호 찾기</h1>
            <div className="flex space-x-2 text-gray-400">
              {/* 장식용 아이콘 */}
              <span className="border p-1 rounded-full cursor-pointer hover:bg-gray-100 w-8 h-8 flex items-center justify-center">🖨️</span>
              <span className="border p-1 rounded-full cursor-pointer hover:bg-gray-100 w-8 h-8 flex items-center justify-center">🔗</span>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600 mb-10 leading-relaxed">
            {step === 1 && "가입 시 입력한 아이디, 이름, 이메일을 입력하여 본인을 확인해주세요."}
            {step === 2 && "이메일로 전송된 인증번호 6자리를 입력해주세요."}
            {step === 3 && "사용하실 새로운 비밀번호를 입력해주세요."}
          </div>
        </div>

        {/* 메인 컨텐츠 박스 */}
        <div className="w-full max-w-2xl border border-gray-300 bg-white p-8 md:p-12 shadow-sm">
          <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">
            {step === 1 && "정보 입력"}
            {step === 2 && "인증번호 입력"}
            {step === 3 && "비밀번호 재설정"}
          </h2>

          {/* STEP 1: 정보 입력 폼 */}
          {step === 1 && (
            <form className="flex flex-col space-y-6 px-2 md:px-10" onSubmit={handleSendCode}>
              {/* 아이디 입력 */}
              <div className="flex items-center border-b border-gray-300 py-2">
                <span className="text-gray-400 w-8 mr-2 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </span>
                <input
                  name="memberLoginId"
                  value={memberInfo.memberLoginId}
                  onChange={handleChange}
                  placeholder="아이디"
                  className="flex-1 appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                />
              </div>
              {/* 이름 입력 */}
              <div className="flex items-center border-b border-gray-300 py-2">
                <span className="text-gray-400 w-8 mr-2 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0c0 .884.896 1.643 2 1.643 2 0 2-.76 2-1.643" /></svg>
                </span>
                <input
                  name="memberName"
                  value={memberInfo.memberName}
                  onChange={handleChange}
                  placeholder="이름"
                  className="flex-1 appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                />
              </div>
              {/* 이메일 입력 */}
              <div className="flex items-center border-b border-gray-300 py-2">
                <span className="text-gray-400 w-8 mr-2 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </span>
                <input
                  name="memberEmail"
                  value={memberInfo.memberEmail}
                  onChange={handleChange}
                  placeholder="이메일 (example@email.com)"
                  className="flex-1 appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                />
              </div>

              <button type="submit" className="w-full bg-[#2b4075] hover:bg-[#1e3161] text-white font-bold text-lg py-3 transition-colors shadow-sm mt-6">
                인증번호 받기
              </button>
            </form>
          )}

          {/* STEP 2: 인증번호 입력 */}
          {step === 2 && (
            <div className="flex flex-col space-y-6 px-2 md:px-10">
              <div className="relative flex items-center border-b border-gray-300 py-2">
                <span className="text-gray-400 w-8 mr-2 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                </span>
                <input
                  name="authCode"
                  value={memberInfo.authCode}
                  onChange={handleChange}
                  placeholder="인증번호 6자리"
                  className="flex-1 appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none tracking-widest"
                  maxLength={6}
                />
                <span className="absolute right-0 text-red-500 font-bold text-sm">{formatTime(timer)}</span>
              </div>

              <button onClick={handleClickCheck} className="w-full bg-[#2b4075] hover:bg-[#1e3161] text-white font-bold text-lg py-3 transition-colors shadow-sm">
                인증 확인
              </button>

              <div className="text-center mt-2">
                <button onClick={() => setStep(1)} className="text-xs text-gray-500 underline hover:text-gray-800">
                  정보 다시 입력하기
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: 비밀번호 변경 */}
          {step === 3 && (
            <div className="flex flex-col space-y-6 px-2 md:px-10">
              {/* 새 비밀번호 */}
              <div className="flex items-center border-b border-gray-300 py-2">
                <span className="text-gray-400 w-8 mr-2 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </span>
                <input
                  name="newPassword"
                  type="password"
                  value={memberInfo.newPassword}
                  onChange={handleChange}
                  placeholder="새 비밀번호"
                  className="flex-1 appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                />
              </div>
              {validationErrors && (
                <p className="text-red-500 text-xs mt-[-1rem] ml-10 font-medium">
                  {validationErrors}
                </p>
              )}
              {/* 비밀번호 확인 */}
              <div className="flex items-center border-b border-gray-300 py-2">
                <span className="text-gray-400 w-8 mr-2 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </span>
                <input
                  name="newPasswordConfirm"
                  type="password"
                  value={memberInfo.newPasswordConfirm}
                  onChange={handleChange}
                  placeholder="새 비밀번호 확인"
                  className="flex-1 appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                />
              </div>

              {memberInfo.newPassword && memberInfo.newPasswordConfirm && memberInfo.newPassword !== memberInfo.newPasswordConfirm && (
                <p className="text-red-500 text-xs text-center font-medium">비밀번호가 일치하지 않습니다.</p>
              )}

              <button onClick={handleResetPassword} className="w-full bg-[#2b4075] hover:bg-[#1e3161] text-white font-bold text-lg py-3 transition-colors shadow-sm mt-4">
                비밀번호 변경하기
              </button>
            </div>
          )}
        </div>

        {/* 하단 링크 */}
        <div className="mt-8 flex justify-center items-center text-sm text-gray-600">
          <button onClick={() => moveToLogin()} className="px-3 hover:text-black hover:underline">로그인</button>
          <span className="text-gray-300 text-xs">|</span>
          <button onClick={() => moveToFindId()} className="px-3 hover:text-black hover:underline">아이디 찾기</button>
          <span className="text-gray-300 text-xs">|</span>
          <button onClick={() => moveToFindPw()} className="px-3 hover:text-black hover:underline">회원가입</button>
        </div>
      </div>
    </div>
  )
}

export default FindPwPageComponent
