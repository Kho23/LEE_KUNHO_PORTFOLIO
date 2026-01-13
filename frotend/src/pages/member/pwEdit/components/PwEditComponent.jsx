import { FaRegCheckSquare } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const PwEditComponent = ({ changeHandler, clickHandler, pwCorrect }) => {
  return (
    <div className="max-w-xl mx-auto p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-gray-100 mt-10">
      <h2 className="text-3xl font-extrabold mb-8 pb-4 text-gray-900 border-b border-gray-200">
        비밀번호 변경
      </h2>

      <ul className="space-y-6">
        <li className="flex flex-col">
          <label className="font-semibold mb-2 text-gray-700">
            현재 비밀번호
          </label>
          <div className="flex gap-2">
            <input
              className="w-full border border-gray-300 rounded-lg p-3 transition duration-150 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              type="password"
              name="memberCurrentPassword"
              onChange={changeHandler}
              placeholder="현재 비밀번호를 입력해 주세요"
            />
          </div>
        </li>

        <li className="flex flex-col">
          <label className="font-semibold mb-2 text-gray-700">
            새 비밀번호
          </label>
          <div className="flex gap-2">
            <input
              className="w-full border border-gray-300 rounded-lg p-3 transition duration-150 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              type="password"
              name="memberPassword"
              onChange={changeHandler}
              placeholder="비밀번호는 영문, 숫자, 특수문자 포함 8~16자여야 합니다.(. 제외)"
            />
          </div>
        </li>

        <li className="flex flex-col">
          <label className="font-semibold mb-2 text-gray-700">
            비밀번호 확인
          </label>
          <div className="flex gap-2">
            <input
              className="w-full border border-gray-300 rounded-lg p-3 transition duration-150 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              type="password"
              name="memberPasswordCheck"
              onChange={changeHandler}
              placeholder="새 비밀번호를 다시 입력해 주세요."
            />
          </div>

          {pwCorrect ? (
            <p className="text-green-600 flex items-center gap-2 text-sm mt-2 font-medium">
              <FaRegCheckSquare className="text-lg" />
              비밀번호가 일치합니다.
            </p>
          ) : (
            <p className="text-red-600 text-sm mt-2 font-medium">
              비밀번호를 확인해 주세요.
            </p>
          )}
        </li>

        <li className="pt-2">
          <div className="flex items-start p-2 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
            <IoWarningOutline className="flex-shrink-0 w-5 h-5 mr-2 mt-0.5 text-yellow-500" />
            <p className="text-sm font-medium leading-relaxed">
              보안 강화를 위해 기존 비밀번호와 다른 비밀번호 조합을 사용해
              주세요.
            </p>
          </div>
        </li>
      </ul>

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
          비밀번호 변경 완료
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

export default PwEditComponent;
