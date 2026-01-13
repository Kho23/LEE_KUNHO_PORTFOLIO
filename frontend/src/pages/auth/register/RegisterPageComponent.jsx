import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  duplicateEmail,
  duplicateId,
  sendJoinMail,
  verifyJoinCode,
} from "../../../api/authApi";
import { registerAsync } from "../../../store/auth/authSlice";

const RegisterPageComponent = (props) => {
  const {
    step,
    setStep,
    registerInfo,
    detailAddress,
    setDetailAddress,
    agreements,
    setAgreements,
    duplicateCheck,
    validationErrors,
    emailVerification,
    setEmailVerification,
    handleChange,
    handleIdCheck,
    handleSendMail,
    handleVerifyCode,
    handleSubmit,
    isLoading,
    error,
    handleNextStep,
    handleAgreementChange,
    handleAllAgreementChange,
    handleAddressSearch,
    today,
  } = props;

  return (
    <div className="flex flex-col items-center min-h-screen bg-white pt-10 md:pt-20 pb-20">
      {/* 상단 헤더 */}
      <div className="w-full max-w-4xl px-4 mb-8">
        <div className="flex justify-between items-end border-b-2 border-gray-300 pb-4 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            회원가입
          </h1>
          <div className="text-gray-500 text-sm font-medium flex items-center">
            <span className={step === 1 ? "text-[#2b4075] font-bold" : ""}>
              01 약관동의
            </span>
            <span className="mx-2 text-gray-300">&gt;</span>
            <span className={step === 2 ? "text-[#2b4075] font-bold" : ""}>
              02 정보입력
            </span>
          </div>
        </div>
        <div className="text-center text-sm text-gray-600 mb-4 leading-relaxed">
          {step === 1 && "서비스 이용을 위해 약관에 동의해주세요."}
          {step === 2 && "회원 정보를 입력해주세요."}
        </div>
      </div>

      <div className="w-full max-w-2xl border border-gray-300 bg-white p-8 md:p-12 shadow-sm">
        {/* --- STEP 1: 약관 동의 화면 --- */}
        {step === 1 && (
          <div className="space-y-8 px-2 md:px-6">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
              이용약관 동의
            </h2>

            <div className="border border-gray-300 p-5 bg-gray-50 rounded-md">
              <label className="flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="all"
                  checked={agreements.all}
                  onChange={handleAllAgreementChange}
                  className="w-5 h-5 accent-[#2b4075]"
                />
                <span className="ml-3 font-bold text-gray-900 text-lg">
                  전체 약관에 동의합니다.
                </span>
              </label>
              <p className="ml-8 mt-1 text-xs text-gray-500">
                필수 약관 및 선택 약관에 대한 동의를 포함합니다.
              </p>
            </div>

            <hr className="border-gray-200" />

            <div className="space-y-2">
              <label className="flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="terms"
                  checked={agreements.terms}
                  onChange={handleAgreementChange}
                  className="w-4 h-4 accent-[#2b4075]"
                />
                <span className="ml-2 text-sm text-gray-800 font-medium">
                  <span className="text-[#2b4075]">(필수)</span> 서비스 이용약관
                  동의
                </span>
              </label>
              <div className="h-32 overflow-y-auto border border-gray-200 p-3 text-xs text-gray-500 bg-white rounded leading-relaxed scrollbar-thin scrollbar-thumb-gray-300">
                제1조 (목적) 본 약관은 회사가 제공하는 서비스의 이용과 관련하여
                회사와 회원의 권리, 의무 및 책임사항, 기타 필요한 사항을
                규정함을 목적으로 합니다. 제2조 (용어의 정의) 1. "서비스"라 함은
                구현되는 단말기와 상관없이 회원이 이용할 수 있는 제반 서비스를
                의미합니다. 2. "회원"이라 함은 회사의 서비스에 접속하여 본
                약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를
                이용하는 고객을 말합니다. 제3조 (약관의 게시와 개정) 1. 회사는
                본 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 초기 화면에
                게시합니다. 2. 회사는 관련 법령을 위배하지 않는 범위에서 본
                약관을 개정할 수 있습니다. 제4조 (회원가입) 1. 이용자는 회사가
                정한 가입 양식에 따라 회원정보를 기입한 후 본 약관에 동의한다는
                의사표시를 함으로서 회원가입을 신청합니다. 2. 회사는 제1항과
                같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지
                않는 한 회원으로 등록합니다. 제5조 (회원의 의무) 회원은
                관계법령, 본 약관의 규정, 이용안내 및 서비스와 관련하여 공지한
                주의사항, 회사가 통지하는 사항 등을 준수하여야 합니다.
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="privacy"
                  checked={agreements.privacy}
                  onChange={handleAgreementChange}
                  className="w-4 h-4 accent-[#2b4075]"
                />
                <span className="ml-2 text-sm text-gray-800 font-medium">
                  <span className="text-[#2b4075]">(필수)</span> 개인정보 수집
                  및 이용 동의
                </span>
              </label>
              <div className="h-32 overflow-y-auto border border-gray-200 p-3 text-xs text-gray-500 bg-white rounded leading-relaxed scrollbar-thin scrollbar-thumb-gray-300">
                1. 수집하는 개인정보 항목 회사는 회원가입, 상담, 서비스 신청
                등을 위해 아래와 같은 개인정보를 수집하고 있습니다. - 수집항목 :
                이름, 로그인ID, 비밀번호, 휴대전화번호, 이메일, 생년월일 -
                자동수집항목 : 접속 로그, 쿠키, 접속 IP 정보 2. 개인정보의 수집
                및 이용목적 회사는 수집한 개인정보를 다음의 목적을 위해
                활용합니다. - 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른
                요금정산 - 회원 관리 : 회원제 서비스 이용에 따른 본인확인,
                개인식별, 불량회원의 부정 이용 방지와 비인가 사용 방지 - 민원
                처리 : 가입 의사 확인, 연령 확인, 불만처리 등 민원처리, 고지사항
                전달 3. 개인정보의 보유 및 이용기간 원칙적으로, 개인정보 수집 및
                이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단,
                관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와
                같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다. -
                보존 항목 : 로그인ID, 결제기록 - 보존 근거 : 전자상거래등에서의
                소비자보호에 관한 법률 - 보존 기간 : 5년 (계약 또는 청약철회
                등에 관한 기록) 4. 동의 거부 권리 및 불이익 귀하는 개인정보 수집
                및 이용에 동의하지 않을 권리가 있으나, 동의를 거부할 경우
                회원가입 및 서비스 이용에 제한이 있을 수 있습니다.
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="marketing"
                  checked={agreements.marketing}
                  onChange={handleAgreementChange}
                  className="w-4 h-4 accent-[#2b4075]"
                />
                <span className="ml-2 text-sm text-gray-800 font-medium">
                  (선택) 마케팅 정보 수신 동의
                </span>
              </label>
              <div className="h-24 overflow-y-auto border border-gray-200 p-3 text-xs text-gray-500 bg-white rounded leading-relaxed scrollbar-thin scrollbar-thumb-gray-300">
                1. 마케팅 및 광고 활용 목적 신규 서비스(제품) 개발 및 맞춤
                서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공, 접속
                빈도 파악 또는 회원의 서비스 이용에 대한 통계 등을 목적으로
                개인정보를 처리합니다. 2. 수집 및 이용하는 개인정보 항목 - 성명,
                휴대전화번호, 이메일, 생년월일, 성별 3. 보유 및 이용 기간 - 회원
                탈퇴 시 또는 동의 철회 시까지 4. 동의 거부 권리 및 불이익 귀하는
                마케팅 정보 수신에 대한 동의를 거부할 권리가 있습니다. 동의를
                거부하더라도 기본 서비스 이용에는 제한이 없으나, 이벤트 및 혜택
                안내를 받으실 수 없습니다.
              </div>
            </div>

            <button
              onClick={handleNextStep}
              className="w-full bg-[#2b4075] hover:bg-[#1e3161] text-white font-bold text-lg py-3 mt-6 transition-colors shadow-sm rounded-sm"
            >
              다음 단계로
            </button>
          </div>
        )}

        {/* --- STEP 2: 정보 입력 화면 --- */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">
              정보 입력
            </h2>
            <form
              className="flex flex-col space-y-6 px-2 md:px-6"
              onSubmit={handleSubmit}
            >
              {/* 🔥 아이디 (중복 확인 버튼 추가됨) */}
              <div className="flex items-center border-b border-gray-300 py-2">
                <span className="text-gray-400 w-8 mr-2 flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <input
                  name="memberLoginId"
                  value={registerInfo.memberLoginId}
                  onChange={handleChange}
                  placeholder="아이디"
                  className="flex-1 appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={handleIdCheck}
                  disabled={duplicateCheck.id}
                  className={`text-xs font-bold px-3 py-1.5 rounded transition-colors ${
                    duplicateCheck.id
                      ? "bg-green-100 text-green-700 cursor-default"
                      : "bg-[#2b4075] text-white hover:bg-[#1e3161]"
                  }`}
                >
                  {duplicateCheck.id ? "확인완료" : "중복확인"}
                </button>
              </div>
              {validationErrors.memberLoginId && (
                <p className="text-red-500 text-xs mt-1 ml-10">
                  {validationErrors.memberLoginId}
                </p>
              )}

              {/* 비밀번호 */}
              <div className="flex items-center border-b border-gray-300 py-2">
                <span className="text-gray-400 w-8 mr-2 flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>
                <input
                  name="memberPassword"
                  type="password"
                  value={registerInfo.memberPassword}
                  onChange={handleChange}
                  placeholder="비밀번호"
                  className="flex-1 appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  required
                />
              </div>
              {validationErrors.memberPassword && (
                <p className="text-red-500 text-xs mt-1 ml-10">
                  {validationErrors.memberPassword}
                </p>
              )}
              {/* 비밀번호 확인 */}
              <div className="flex items-center border-b border-gray-300 py-2">
                <span className="text-gray-400 w-8 mr-2 flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                <input
                  name="passwordConfirm"
                  type="password"
                  value={registerInfo.passwordConfirm}
                  onChange={handleChange}
                  placeholder="비밀번호 확인"
                  className="flex-1 appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  required
                />
              </div>
              {validationErrors.passwordConfirm && (
                <p className="text-red-500 text-xs mt-1 ml-10">
                  {validationErrors.passwordConfirm}
                </p>
              )}
              {/* 이름 */}
              <div className="flex items-center border-b border-gray-300 py-2">
                <span className="text-gray-400 w-8 mr-2 flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0c0 .884.896 1.643 2 1.643 2 0 2-.76 2-1.643"
                    />
                  </svg>
                </span>
                <input
                  name="memberName"
                  value={registerInfo.memberName}
                  onChange={handleChange}
                  placeholder="이름"
                  className="flex-1 appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  required
                />
              </div>

              <div className="flex flex-col border-b border-gray-300 py-2">
                {/* 1. 이메일 입력칸 + 전송 버튼 */}
                <div className="flex items-center">
                  <span className="text-gray-400 w-8 mr-2 flex justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <input
                    name="memberEmail"
                    type="email"
                    value={registerInfo.memberEmail}
                    onChange={handleChange}
                    placeholder="이메일"
                    // 인증 완료되면 수정 못하게 막음
                    disabled={emailVerification.verified}
                    className={`flex-1 appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none ${
                      emailVerification.verified ? "text-gray-400" : ""
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={handleSendMail}
                    // 인증 완료됐거나, 이미 전송했으면(재전송 방지) 버튼 비활성
                    disabled={emailVerification.verified}
                    className={`text-xs font-bold px-3 py-1.5 rounded transition-colors ${
                      emailVerification.verified
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-[#2b4075] text-white hover:bg-[#1e3161]"
                    }`}
                  >
                    {emailVerification.verified ? "인증완료" : "인증번호 전송"}
                  </button>
                </div>

                {/* 에러 메시지 (정규식 틀렸을 때) */}
                {validationErrors.memberEmail && (
                  <p className="text-red-500 text-xs mt-1 ml-10">
                    {validationErrors.memberEmail}
                  </p>
                )}

                {/* 2. 인증번호 입력칸 (전송은 했는데 아직 인증 안 됐을 때만 보임) */}
                {emailVerification.sent && !emailVerification.verified && (
                  <div className="flex items-center mt-3 pl-10 gap-2">
                    <input
                      type="text"
                      placeholder="인증번호 6자리"
                      value={emailVerification.code}
                      onChange={(e) =>
                        setEmailVerification({
                          ...emailVerification,
                          code: e.target.value,
                        })
                      }
                      className="flex-1 border border-gray-300 p-2 rounded text-sm focus:outline-none focus:border-[#2b4075]"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyCode}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-xs whitespace-nowrap"
                    >
                      확인
                    </button>
                  </div>
                )}
              </div>

              {/* 주소 입력 부분 */}
              <div className="flex items-center border-b border-gray-300 py-2">
                <span className="text-gray-400 w-8 mr-2 flex justify-center">
                  {/* 아이콘 (집 모양) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </span>
                <input
                  name="memberAddress"
                  value={registerInfo.memberAddress}
                  placeholder="주소 (클릭하여 검색)"
                  readOnly // 🔥 직접 타이핑 못하게 막음 (오타 방지)
                  onClick={handleAddressSearch} // 🔥 클릭하면 검색창 열림
                  className="flex-1 appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none cursor-pointer"
                  required
                />
                <button
                  type="button"
                  onClick={handleAddressSearch} // 🔥 버튼 눌러도 검색창 열림
                  className="bg-[#2b4075] hover:bg-[#1e3161] text-white text-xs font-bold px-3 py-1.5 rounded transition-colors"
                >
                  주소검색
                </button>
              </div>
              <div className="flex items-center border-b border-gray-300 py-2">
                <span className="text-gray-400 w-8 mr-2 flex justify-center">
                  {/* 아이콘 (집 모양) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </span>
                <input
                  name="memberDetailAddress"
                  value={registerInfo.memberDetailAddress}
                  placeholder="상세주소"
                  onChange={handleChange}
                  className="flex-1 appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none cursor-pointer"
                />
              </div>

              {/* 전화번호 */}
              <div className="flex items-center border-b border-gray-300 py-2">
                <span className="text-gray-400 w-8 mr-2 flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </span>
                <input
                  name="memberPhoneNumber"
                  type="tel"
                  value={registerInfo.memberPhoneNumber}
                  onChange={handleChange}
                  placeholder="전화번호 (010-1234-5678)"
                  className="flex-1 appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  required
                />
              </div>

              {/* 성별 */}
              <div className="flex items-center border-b border-gray-300 py-2">
                <span className="text-gray-400 w-8 mr-2 flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </span>
                <select
                  name="memberGender"
                  value={registerInfo.memberGender}
                  onChange={handleChange}
                  className="flex-1 appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none cursor-pointer"
                  required
                >
                  <option value="Male">남성</option>
                  <option value="Female">여성</option>
                </select>
              </div>

              {/* 생년월일 */}
              <div className="flex items-center border-b border-gray-300 py-2">
                <span className="text-gray-400 w-8 mr-2 flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <input
                  name="memberBirthDate"
                  type="date"
                  value={registerInfo.memberBirthDate}
                  onChange={handleChange}
                  max={today}
                  className="flex-1 appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  required
                />
              </div>

              {/* 에러 메시지 */}
              {error && (
                <div className="text-red-600 text-sm text-center p-2 bg-red-50 rounded-md">
                  {error.message || "회원가입에 실패했습니다."}
                </div>
              )}

              {/* 버튼 영역 */}
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 font-bold py-3 hover:bg-gray-50 transition-colors shadow-sm rounded-sm"
                >
                  이전
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-[2] bg-[#2b4075] hover:bg-[#1e3161] text-white font-bold text-lg py-3 transition-colors shadow-sm disabled:bg-gray-400 rounded-sm"
                >
                  {isLoading ? "처리 중..." : "회원가입 완료"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterPageComponent;
