import React, { useEffect, useState } from "react";
import { findByFacilityId } from "../../api/dailyUseApi";
import { getAvailableTime } from "../../api/commonApi";
import DailyUsePageComponent from "./components/DailyUsePageComponent";
import AlertModalComponent from "../../components/alertModal/AlertModalComponent";
import { useSelector } from "react-redux";

// 일일 이용 가능한 시설과 기본 금액 정의
const facilities = [
  { id: 1, name: "수영장", price: 5000 },
  { id: 2, name: "헬스장", price: 3000 },
  { id: 3, name: "골프장", price: 7000 },
];

const DailyUsePage = () => {
  // 선택된 시설 ID
  const [facility, setFacility] = useState(null);
  // 시설별 공간 목록
  const [space, setSpace] = useState(null);
  // 선택된 공간 ID
  const [selectedSpace, setselectedSpace] = useState(null);
  // 선택한 날짜
  const [selectedDate, setSelectedDate] = useState(null);
  // 선택한 날짜의 예약 가능 시간
  const [availableTime, setAvailableTime] = useState(null);
  // 사용자가 선택한 시간 목록
  const [selectedTime, setSelectedTime] = useState([]);
  // 시간 선택 오류 모달 상태
  const [modalOpen, setModalOpen] = useState(false);
  // 선택한 시간과 시설 기준 최종 가격
  const [price, setPrice] = useState(null);
  const { isLoggedIn } = useSelector((state) => state.auth);

  // 선택 시설과 시간 수에 따른 가격 계산
  useEffect(() => {
    if (!facility) return;
    const f = facilities.find((i) => i.id === facility);
    if (f) setPrice(f.price * selectedTime.length);
  }, [selectedTime, facility]);

  // 시설 변경 시 기존 선택 초기화
  const resetFn = () => {
    setselectedSpace(null);
    setAvailableTime(null);
    setSelectedTime([]);
    setSelectedDate(null);
  };

  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  // 시설 선택 시 처리
  const clickFacilityHandler = async (id) => {
    setFacility(id);
    resetFn();

    // 헬스장은 공간 선택 없이 바로 날짜 선택 가능
    if (id === 2) {
      setSpace(null);
      return;
    }

    try {
      const res = await findByFacilityId(id); // 시설별 공간 목록 조회
      setSpace(res);
    } catch (error) {
      console.error("space 가져오기 실패", error);
    }
  };

  // 공간 선택 시 처리
  const clickSpaceHandler = (id) => {
    setselectedSpace(id);
    setAvailableTime(null);
    setSelectedDate(null);
  };

  // 날짜 선택 시 예약 가능 시간 조회
  const handleDateClick = async (info) => {
    setSelectedDate(info.dateStr);
    setSelectedTime([]);

    // 헬스장은 시간 선택 없음
    if (facility === 2) return;
    if (!selectedSpace) return;

    try {
      const res = await getAvailableTime(selectedSpace, info.dateStr);
      // 시간 포맷 변환: 예) "09:00" -> "09:00~10:00"
      const formatted = res.map((t) => {
        const h = Number(t.slice(0, 2));
        return `${t.slice(0, 5)}~${String(h + 1).padStart(2, "0")}:00`;
      });
      setAvailableTime(formatted);
    } catch (error) {
      console.error("예약 가능 시간 조회 실패", error);
    }
  };

  // 시간 클릭 시 연속된 시간만 선택 가능하도록 처리
  const handleTimeClick = (time) => {
    setSelectedTime((prev) => {
      // 이미 선택된 시간은 클릭 시 제거
      if (prev.includes(time)) return prev.filter((t) => t !== time);

      const timesInNumber = prev.map((t) => Number(t.slice(0, 2)));

      if (prev.length === 0) return [time];

      const min = Math.min(...timesInNumber);
      const max = Math.max(...timesInNumber);
      const clickedHour = Number(time.slice(0, 2));

      // 선택한 시간이 기존 선택과 연속이면 추가, 아니면 모달 표시
      if (clickedHour === min - 1 || clickedHour === max + 1) {
        return [...prev, time].sort();
      } else {
        setModalOpen(true);
        return prev;
      }
    });
  };

  // 결제 정보 생성
  const handlePayment = () => {
    // 헬스장 일일 이용권 처리
    if (facility === 2) {
      return {
        title: "헬스장 일일이용권",
        date: selectedDate,
        price: facilities[1].price,
        productType: "GYM_DAILY_USE",
      };
    }

    // 일반 시설 시간 단위 이용권 처리
    const sorted = [...selectedTime].sort();
    const startHour = sorted[0].slice(0, 5);
    const endHour = `${String(
      Number(sorted[sorted.length - 1].slice(0, 2)) + 1
    ).padStart(2, "0")}:00`;

    return {
      title: "일일이용권",
      price: price,
      productType: "DAILY_USE",
      startTime: `${selectedDate}T${startHour}`,
      endTime: `${selectedDate}T${endHour}`,
      lessonId: selectedSpace,
    };
  };

  return (
    <>
      <DailyUsePageComponent
        facilities={facilities}
        clickFacilityHandler={clickFacilityHandler}
        facility={facility}
        space={space}
        clickSpaceHandler={clickSpaceHandler}
        selectedSpace={selectedSpace}
        selectedDate={selectedDate}
        handleDateClick={handleDateClick}
        handleTimeClick={handleTimeClick}
        handlePayment={handlePayment}
        selectedTime={selectedTime}
        availableTime={availableTime}
        price={price}
        isLoggedIn={isLoggedIn}
      />

      {modalOpen && (
        <AlertModalComponent
          message={"연속된 시간만 선택 가능합니다."}
          type="alert"
          onConfirm={closeModal}
        />
      )}
    </>
  );
};

export default DailyUsePage;
