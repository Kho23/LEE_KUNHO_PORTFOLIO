import React from "react";
import { Link } from "react-router-dom";

const MemberEditComponent = ({
  data,
  changeHandler,
  clickHandler,
  userGender,
  userBirth,
  openAddress,
}) => {
  return (
    <div className="max-w-xl mx-auto p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-gray-100 mt-10">
      <h2 className="text-3xl font-extrabold mb-8 pb-4 text-gray-900 border-b border-gray-200">
        개인 정보 수정
      </h2>

      <form>
        <ul className="space-y-6">
          <li className="flex flex-col">
            <label className="font-semibold mb-2 text-gray-700">
              회원 유형
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-500 transition"
              type="text"
              name="memberRole"
              value={
                data.memberRole == "ROLE_USER" ? "일반 회원" : "파트너 회원"
              }
              disabled
            />
          </li>

          <li className="flex flex-col">
            <label className="font-semibold mb-2 text-gray-700">아이디</label>
            <input
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-500 transition"
              type="text"
              name="memberLoginId"
              value={
                data.socialLogin === "LOCAL"
                  ? data.memberLoginId
                  : "소셜 로그인"
              }
              disabled
            />
          </li>

          <li className="flex flex-col">
            <label className="font-semibold mb-2 text-gray-700">이름</label>
            <input
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-500 transition"
              type="text"
              name="memberName"
              value={data.memberName}
              disabled
            />
          </li>

          <li className="flex flex-col">
            <label className="font-semibold mb-2 text-gray-700">이메일</label>
            <input
              className="w-full border border-gray-300 rounded-lg p-3 transition duration-150 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              type="email"
              name="memberEmail"
              value={data.memberEmail}
              onChange={changeHandler}
            />
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              입력하신 이메일 주소로 주요 안내 및 공지사항이 발송됩니다. 정확한
              정보를 입력해 주세요.
            </p>
          </li>

          <li className="flex flex-col">
            <label className="font-semibold mb-2 text-gray-700">전화번호</label>
            <input
              className="w-full border border-gray-300 rounded-lg p-3 transition duration-150 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              type="tel"
              name="memberPhoneNumber"
              value={data.memberPhoneNumber}
              onChange={changeHandler}
            />
          </li>

          <li className="flex flex-col">
            <label className="font-semibold mb-2 text-gray-700">생년월일</label>
            <input
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-500 cursor-not-allowed transition"
              type="text"
              name="memberBirthDate"
              value={userBirth}
              disabled
            />
          </li>

          <li>
            <span className="font-semibold block mb-2 text-gray-700">성별</span>
            <div className="flex gap-6">
              <label className="flex items-center text-gray-700 cursor-not-allowed">
                <input
                  type="radio"
                  id="user_gender_M"
                  name="user_gender"
                  checked={userGender[0]}
                  disabled
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 disabled:opacity-75"
                />
                <span className="ml-2">남자</span>
              </label>
              <label className="flex items-center text-gray-700 cursor-not-allowed">
                <input
                  type="radio"
                  id="user_gender_F"
                  name="user_gender"
                  checked={userGender[1]}
                  disabled
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 disabled:opacity-75"
                />
                <span className="ml-2">여자</span>
              </label>
            </div>
          </li>

          <li className="flex flex-col">
            <label className="font-semibold mb-2 text-gray-700">주소</label>
            <div className="flex gap-3">
              <input
                className="w-full border border-gray-300 rounded-lg p-3 transition duration-150 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                type="text"
                name="memberAddress"
                value={data.memberAddress}
                onChange={changeHandler}
              />
              <button
                type="button"
                onClick={openAddress}
                className="
                  bg-blue-600 text-white 
                  px-4 py-3 rounded-lg 
                  font-semibold 
                  hover:bg-blue-700 
                  shadow-md hover:shadow-lg
                  transition duration-150 whitespace-nowrap
                "
              >
                주소 찾기
              </button>
            </div>
            <input
              className="w-full border mt-2 border-gray-300 rounded-lg p-3 transition duration-150 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              type="text"
              name="memberDetailAddress"
              value={data.memberDetailAddress}
              onChange={changeHandler}
            />
          </li>
        </ul>
      </form>

      <div className="mt-10 flex gap-4">
        <button
          onClick={clickHandler}
          className="
          flex-1
          bg-blue-600 text-white 
          py-4 rounded-lg 
          font-extrabold text-lg
          hover:bg-blue-700 
          shadow-lg hover:shadow-xl
          transition duration-150
        "
        >
          개인 정보 수정 완료
        </button>

        <Link
          to={-1}
          className="
          flex-1
          bg-white text-blue-600
          border border-blue-600
          py-4 rounded-lg 
          font-extrabold text-lg
          hover:bg-blue-50
          shadow-sm hover:shadow
          transition duration-150
          text-center
        "
        >
          취소
        </Link>
      </div>
    </div>
  );
};

export default MemberEditComponent;
