import React, { useEffect, useState } from "react";
import { login } from "../../../api/authApi";
import useCustomMove from "../../../hooks/useCustomMove";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../../../store/auth/authSlice";
import SocialLogin from "../SocialLogin";

const initData = {
  id: "",
  password: "",
};

const LoginPage = () => {
  const { moveToMain } = useCustomMove();
  const [loginInfo, setLoginInfo] = useState(initData);
  const dispatch = useDispatch();
  const { isLoading, error, isLoggedIn } = useSelector((state) => state.auth);

  const { kakaoLoginHandler, naverLoginHandler, googleLoginHandler } =
    SocialLogin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  useEffect(() => {
    // 로그인 상태를 확인하여 이미 로그인되어있으면 메인페이지로 이동시킴
    if (isLoggedIn) {
      alert("이미 로그인 되어 있습니다. 메인페이지로 이동합니다.");
      moveToMain();
    } else return;
  }, []);

  const handleClickLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginAsync(loginInfo));
      if (loginAsync.fulfilled.match(result)) {
        console.log("로그인 성공");
        alert("로그인 성공!");
        moveToMain();
      } else {
        console.error("로그인 실패", result.payload);
        alert("아이디 또는 패스워드가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  // const handleSocialLogin = (provider) => {
  //   console.log(`${provider} 로그인 시도`);
  // }; !!!!!!! 이 부분 카카오, 네이버 로그인 도입하면서 주석처리했습니다 !!!!!!!

  return (
    <div className="flex flex-col items-center min-h-screen bg-white pt-10 md:pt-20">
      {/* 상단 타이틀 및 안내 문구 (이미지 스타일) */}
      <div className="w-full max-w-4xl px-4 mb-8">
        <div className="flex justify-between items-end border-b-2 border-gray-300 pb-4 mb-6">
          <h1 className="text-4xl font-bold text-gray-900">로그인</h1>
          {/* 우측 상단 아이콘 영역 (프린트/공유 등 - 이미지 연출용) */}
        </div>

        <div className="text-center text-sm text-gray-600 mb-10 leading-relaxed">
          회원 로그인 정보는{" "}
          <span className="text-orange-500 font-bold">60분</span> 동안 유지되며
          (<span className="text-orange-500">60분</span> 경과 시 자동로그아웃),
          <br />
          자리를 비우실 때는 보안을 위해 반드시 로그아웃을 하거나 사용 중이던
          모든 인터넷 창을 닫으시기 바랍니다.
        </div>
      </div>

      {/* 메인 로그인 박스 */}
      <div className="w-full max-w-2xl border border-gray-300 bg-white p-8 md:p-12 shadow-sm">
        <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">
          회원 로그인
        </h2>

        <form
          onSubmit={handleClickLogin}
          className="flex flex-row items-stretch gap-4"
        >
          {/* 왼쪽: 입력 필드 영역 */}
          <div className="flex-1 flex flex-col justify-center space-y-6">
            {/* 아이디 입력 */}
            <div className="flex items-center border-b border-gray-300 py-2">
              <div className="text-gray-400 mr-3">
                {/* 사람 아이콘 SVG */}
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
              </div>
              <input
                type="text"
                name="id"
                value={loginInfo.id}
                onChange={(e) => handleChange(e)}
                placeholder="아이디"
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                required
              />
            </div>

            {/* 비밀번호 입력 */}
            <div className="flex items-center border-b border-gray-300 py-2">
              <div className="text-gray-400 mr-3">
                {/* 자물쇠/전화기 아이콘 SVG */}
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
              </div>
              <input
                type="password"
                name="password"
                value={loginInfo.password}
                onChange={(e) => handleChange(e)}
                placeholder="비밀번호"
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                required
              />
            </div>
          </div>

          {/* 오른쪽: 로그인 버튼 */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-32 md:w-40 bg-[#263c79] hover:bg-[#1e3161] text-white font-medium text-lg flex items-center justify-center transition-colors disabled:bg-gray-400"
          >
            {isLoading ? "..." : "로그인"}
          </button>
        </form>

        {/* 에러 메시지 */}
        {error && (
          <div className="mt-4 text-center text-red-600 text-sm">
            로그인 실패: {error.message || "정보를 확인해주세요."}
          </div>
        )}

        {/* 하단 링크 (회원가입 / 아이디찾기 / 비밀번호찾기) */}
        <div className="mt-8 flex justify-center items-center space-x-4 text-sm text-gray-600">
          <a href="/auth/register" className="hover:text-gray-900">
            회원가입
          </a>
          <span className="text-gray-300">|</span>
          <a href="/auth/find-id" className="hover:text-gray-900">
            아이디찾기
          </a>
          <span className="text-gray-300">|</span>
          <a href="/auth/find-pw" className="hover:text-gray-900">
            비밀번호찾기
          </a>
        </div>
      </div>

      {/* 소셜 로그인 (이미지엔 없지만 로직 보존을 위해 하단에 배치) */}
      <div className="w-full max-w-2xl mt-8 px-8 md:px-12">
        <div className="border-t border-gray-200 pt-6">
          <div className="flex gap-3 justify-center">
            <button
              type="button"
              onClick={kakaoLoginHandler}
              className="px-4 py-2 bg-yellow-400 text-black text-sm font-medium rounded shadow-sm hover:bg-yellow-500"
            >
              카카오 로그인
            </button>
            <button
              type="button"
              onClick={naverLoginHandler}
              className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded shadow-sm hover:bg-green-600"
            >
              네이버 로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
