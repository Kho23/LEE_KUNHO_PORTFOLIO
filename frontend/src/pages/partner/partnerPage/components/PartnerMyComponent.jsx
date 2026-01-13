import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { VscGear } from "react-icons/vsc";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaUserCheck } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa";

const PartnerMyComponent = ({ data }) => {
  return (
    <div className="max-w-lg mx-auto p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-gray-100 mt-10">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-8 pb-4 border-b border-blue-100">
        파트너페이지
      </h2>

      <div className="flex items-center gap-5 mb-10">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 text-blue-600 flex items-center justify-center rounded-full shadow-lg">
          <MdAccountCircle className="w-14 h-14 sm:w-16 sm:h-16 fill-blue-950" />
        </div>

        <div className="text-2xl sm:text-3xl font-bold text-gray-900">
          <span>{data.memberName} 님</span>
          <span className="text-base text-gray-500 font-normal mt-1">
            &nbsp; 환영합니다
          </span>
        </div>
      </div>

      <ul className="space-y-4">
        <li>
          <Link
            to="/partner/memberEdit"
            className="
              group block 
              bg-white hover:bg-blue-50 
              text-gray-800 font-semibold 
              py-5 px-6 
              rounded-xl 
              shadow-md hover:shadow-lg 
              transition-all duration-300
              flex items-center justify-between
              border border-gray-100 hover:border-blue-300
            "
          >
            <span className="flex items-center gap-3">
              <span className="text-blue-500 group-hover:text-blue-700 transition">
                <VscGear className="w-4 h-4 sm:w-7 sm:h-7 fill-blue-950" />
              </span>
              정보 수정
            </span>
            <span className="text-gray-400 group-hover:text-blue-500 transition">
              &gt;
            </span>
          </Link>
        </li>
        {data.socialLogin == "LOCAL" && (
          <li>
            <Link
              to="/partner/pwEditPage"
              className="
              group block 
              bg-white hover:bg-blue-50 
              text-gray-800 font-semibold 
              py-5 px-6 
              rounded-xl 
              shadow-md hover:shadow-lg 
              transition-all duration-300
              flex items-center justify-between
              border border-gray-100 hover:border-blue-300
            "
            >
              <span className="flex items-center gap-3">
                <span className="text-blue-500 group-hover:text-blue-700 transition">
                  <RiLockPasswordLine className="w-4 h-4 sm:w-7 sm:h-7 fill-blue-950" />
                </span>
                비밀번호 변경
              </span>
              <span className="text-gray-400 group-hover:text-blue-500 transition">
                &gt;
              </span>
            </Link>
          </li>
        )}
        <li>
          <Link
            to="/partner/myReservation"
            className="
              group block 
              bg-white hover:bg-blue-50 
              text-gray-800 font-semibold 
              py-5 px-6 
              rounded-xl 
              shadow-md hover:shadow-lg 
              transition-all duration-300
              flex items-center justify-between
              border border-gray-100 hover:border-blue-300
            "
          >
            <span className="flex items-center gap-3">
              <span className="text-blue-500 group-hover:text-blue-700 transition">
                <FaRegCalendarCheck className="w-4 h-4 sm:w-6 sm:h-6 fill-blue-950" />
              </span>
              예약 내역 조회
            </span>
            <span className="text-gray-400 group-hover:text-blue-500 transition">
              &gt;
            </span>
          </Link>
        </li>

        <li>
          <Link
            to="/partner/myLessons"
            className="
              group block 
              bg-white hover:bg-blue-50 
              text-gray-800 font-semibold 
              py-5 px-6 
              rounded-xl 
              shadow-md hover:shadow-lg 
              transition-all duration-300
              flex items-center justify-between
              border border-gray-100 hover:border-blue-300
            "
          >
            <span className="flex items-center gap-3">
              <span className="text-blue-500 group-hover:text-blue-700 transition">
                <FaChalkboardTeacher className="w-4 h-4 sm:w-6 sm:h-6 fill-blue-950" />
              </span>
              내 수업 조회
            </span>
            <span className="text-gray-400 group-hover:text-blue-500 transition">
              &gt;
            </span>
          </Link>
        </li>

        <li>
          <Link
            to="/partner/attendance"
            className="
              group block 
              bg-white hover:bg-blue-50 
              text-gray-800 font-semibold 
              py-5 px-6 
              rounded-xl 
              shadow-md hover:shadow-lg 
              transition-all duration-300
              flex items-center justify-between
              border border-gray-100 hover:border-blue-300
            "
          >
            <span className="flex items-center gap-3">
              <span className="text-blue-500 group-hover:text-blue-700 transition">
                <FaUserCheck className="w-4 h-4 sm:w-6 sm:h-6 fill-blue-950" />
              </span>
              출석 관리
            </span>
            <span className="text-gray-400 group-hover:text-blue-500 transition">
              &gt;
            </span>
          </Link>
        </li>

        <li>
          <Link
            to="/partner/lessonRequest"
            className="
              group block 
              bg-white hover:bg-blue-50 
              text-gray-800 font-semibold 
              py-5 px-6 
              rounded-xl 
              shadow-md hover:shadow-lg 
              transition-all duration-300
              flex items-center justify-between
              border border-gray-100 hover:border-blue-300
            "
          >
            <span className="flex items-center gap-3">
              <span className="text-blue-500 group-hover:text-blue-700 transition">
                <FaRegPenToSquare className="w-4 h-4 sm:w-7 sm:h-7 fill-blue-950" />
              </span>
              강좌 신청
            </span>
            <span className="text-gray-400 group-hover:text-blue-500 transition">
              &gt;
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default PartnerMyComponent;
