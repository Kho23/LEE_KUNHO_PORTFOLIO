import React from 'react';
import { Calendar, Clock, User, MapPin, AlignLeft, CheckCircle, AlertCircle, CreditCard } from 'lucide-react';
import PaymentButton from '../../components/payment/PaymentButton';

const LessonReadPageComponent = ({ lesson, isLoggedIn, navigate }) => {
  if (!lesson) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-500">강의 정보를 불러오는 중입니다...</div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="max-w-6xl mx-auto p-6">
        <nav className="text-sm text-gray-500 mb-6">홈 &gt; 예약신청 &gt; 수강신청</nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide
                  ${lesson.category === '골프장' ? 'bg-green-100 text-green-700' :
                    lesson.category === '풋살장' ? 'bg-blue-100 text-blue-700' :
                    lesson.category === '헬스장' ? 'text-orange-600 bg-orange-50' :
                    lesson.category === '무용실' ? 'text-purple-600 bg-purple-50' :
                    lesson.category === '수영장' ? 'text-cyan-600 bg-cyan-50' :
                    'bg-cyan-100 text-cyan-700'}`}>
                {lesson.category === '골프장' ? '골프' : lesson.category === '풋살장' ? '풋살' : lesson.category === '헬스장' ? '헬스' : lesson.category === '무용실' ? '무용' : lesson.category ==='수영장' ? '수영' : '해당없음'}
              </span>
              <span className={`px-2 py-0.5 rounded text-xs font-bold border
                  ${lesson.status === 'ACCEPTED' ? 'border-blue-900 text-blue-900' : 'border-gray-400 text-gray-400'}`}>
                {lesson.status === 'ACCEPTED' ? '접수중' : '마감'}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
          </div>
        </div>

        <div className="border border-gray-300 rounded-xl p-6 mb-8 bg-white shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 pb-3 mb-5 border-b border-gray-300 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-blue-900" />강좌 상세 정보
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
            <InfoItem icon={<User />} label="강사명" value={lesson.partnerName || '정보 없음'} isBold />
            <InfoItem icon={<MapPin />} label="장소/시설" value={`${lesson.facilityType || '시설 정보'} (${lesson.category})`} />
            <div className="flex items-start gap-3">
              <div className="mt-1 bg-gray-100 p-2 rounded-lg text-gray-600"><Calendar className="w-5 h-5" /></div>
              <div>
                <p className="text-sm font-bold text-gray-500 mb-1">교육 기간 & 요일</p>
                <p className="text-gray-900 font-medium">{lesson.startDate} ~ {lesson.endDate}</p>
                <p className="text-blue-900 font-bold text-sm mt-1">매주 {Array.isArray(lesson.days) ? lesson.days.join(', ') : lesson.days}</p>
              </div>
            </div>
            <InfoItem icon={<Clock />} label="교육 시간" value={`${lesson.startTime?.substring(0, 5)} ~ ${lesson.endTime?.substring(0, 5)}`} isBold />
          </div>

          <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-red-500" />
              <span className="text-lg font-bold text-gray-700">수강료 (총 결제 금액)</span>
            </div>
            <span className="text-3xl font-extrabold text-red-600">{lesson.price ? Number(lesson.price).toLocaleString() : 0} 원</span>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-3">
              <AlignLeft className="w-5 h-5 text-gray-600" />
              <h3 className="text-md font-bold text-gray-900">강의 소개</h3>
            </div>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm min-h-[100px]">
              {lesson.description || "등록된 강의 소개 내용이 없습니다."}
            </div>
          </div>
          <div className="flex items-start gap-2 mt-4 text-xs text-gray-500">
            <AlertCircle className="w-4 h-4 mt-0.5" /><p>수강 취소는 개강 3일 전까지만 가능하며, 이후 취소 시 위약금이 발생할 수 있습니다.</p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pb-20">
          <button onClick={() => navigate(-1)} className="px-6 py-3 rounded-lg border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50 h-[48px]">목록으로</button>
          {!isLoggedIn ? (
            <button className="px-8 py-3 rounded-lg font-bold text-white bg-gray-400 cursor-not-allowed h-[48px]" disabled>로그인 후 신청 가능</button>
          ) : lesson.registered ? (
            <button className="px-8 py-3 rounded-lg font-bold text-white bg-gray-400 cursor-not-allowed h-[48px]" disabled>신청 완료됨</button>
          ) : (
            <PaymentButton info={{...lesson, productType:"LESSON", startTime:'', endTime:'',date:''}} />
          )}
        </div>
      </div>
    </div>
  );
};

// 가독성을 위한 내부 컴포넌트
const InfoItem = ({ icon, label, value, isBold }) => (
  <div className="flex items-start gap-3">
    <div className="mt-1 bg-gray-100 p-2 rounded-lg text-gray-600">{React.cloneElement(icon, { className: "w-5 h-5" })}</div>
    <div>
      <p className="text-sm font-bold text-gray-500 mb-1">{label}</p>
      <p className={`text-gray-900 ${isBold ? 'font-semibold text-lg' : 'font-medium'}`}>{value}</p>
    </div>
  </div>
);

export default LessonReadPageComponent;