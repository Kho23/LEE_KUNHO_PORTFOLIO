import React, { useEffect } from "react";
import { useState } from "react";
import RentalReqComponent from "./components/RentalReqComponent";
import { findByFacilityId } from "../../api/dailyUseApi";
import { getAvailableTime } from "../../api/commonApi";
import ModalComponent from "../../components/alertModal/AlertModalComponent";
import { useSelector } from "react-redux";

const RentalReqPage = () => {
  const [alertModal, setAlertModal] = useState({
    open: false,
    type: "", // alert | confirm
    message: "",
    onConfirm: null,
  });
  const facilities = [
    { id: 5, name: "무용실", AMprice: "10000", PMprice: "15000" },
    { id: 4, name: "풋살장", AMprice: "20000", PMprice: "25000" },
  ];
  const [getSpace, setGetSpace] = useState([]);
  const [facility, setFacility] = useState(null);
  const [space, setSpace] = useState(null);
  const [scheduleData, setScheduleData] = useState([]);
  const [selectDate, setSelectDate] = useState(null);
  const [selectTime, setSelectTime] = useState([]);
  const [formData, setFormData] = useState({});
  const { isLoggedIn } = useSelector((state) => state.auth);

  // useEffect(() => {

  // }, [selectTime]);

  const priceCalc = () => {
    if (!selectTime) return 0;

    const selected = facilities.find((i) => i.id === facility);
    if (!selected) return 0;
    const AMprice = selected.AMprice;
    const PMprice = selected.PMprice;

    const AMCount = selectTime?.filter(
      (i) => parseInt(i.slice(0, 2)) <= 16
    ).length;

    const PMCount = selectTime?.filter(
      (i) => parseInt(i.slice(0, 2)) > 16
    ).length;

    return AMCount * AMprice + PMCount * PMprice;
  };

  const handleDateClick = (i) => {
    setSelectTime([]);
    setSelectDate(i.dateStr);
    const f = async () => {
      try {
        const res = await getAvailableTime(space, i.dateStr);
        const list = res.map(
          (j) =>
            `${j.slice(0, 5)}` +
            "~" +
            `${String(Number(j.slice(0, 2)) + 1).padStart(2, "0")}` +
            ":00"
        );
        setScheduleData(list);
      } catch (err) {
        console.error("가능한 시간대 조회 실패", err);
        alert("조회 중 오류가 발생했습니다");
      }
    };
    f();
  };

  const timeCheck = (i) => {
    if (!i || i.length <= 1) return true;

    const changeToNumber = i
      .map((j) => parseInt(j.split(":")[0]))
      .sort((a, b) => a - b);

    for (let k = 0; k < changeToNumber.length - 1; k++) {
      if (changeToNumber[k + 1] - changeToNumber[k] != 1) {
        return false;
      }
    }
    return true;
  };

  const findFacilityFn = (id) => {
    if (!formData.name) {
      setAlertModal({
        open: true,
        type: "alert",
        message: "신청자 이름을 입력해 주세요",
        onConfirm: () => {
          setAlertModal((i) => ({ ...i, open: false }));
        },
      });
      return;
    }

    if (!formData.phoneNumber) {
      setAlertModal({
        open: true,
        type: "alert",
        message: "신청자 번호를 입력해 주세요",
        onConfirm: () => {
          setAlertModal((i) => ({ ...i, open: false }));
        },
      });
      return;
    }

    setScheduleData([]);
    setSelectDate(null);
    setSelectTime([]);

    setFacility(id);

    const f = async () => {
      try {
        const res = await findByFacilityId(id);
        setGetSpace(res);
      } catch (err) {
        console.error("시설 조회 실패", err);
        alert("해당 시설 조회 중 오류가 발생했습니다");
      }
    };
    f();
  };

  const infoHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const selectTimeFn = (i) => {
    const newSelectTime = selectTime.includes(i)
      ? selectTime.filter((t) => t !== i)
      : [...selectTime, i];

    if (!timeCheck(newSelectTime)) {
      setAlertModal({
        open: true,
        type: "alert",
        message: "연속된 시간만 예약할 수 있습니다",
        onConfirm: () => {
          setAlertModal((prev) => ({ ...prev, open: false }));
        },
      });
      return;
    }

    setSelectTime(
      newSelectTime.sort(
        (a, b) => parseInt(a.slice(0, 2)) - parseInt(b.slice(0, 2))
      )
    );
  };

  const paymentHandler = () => {
    const first = selectTime[0].split("~")[0];
    const last = selectTime[selectTime.length - 1].split("~")[1];

    return {
      ...formData,
      title: "시설 대관 비용",
      productType: "RENTAL",
      lessonId: space,
      startTime: `${selectDate}T${first}`,
      endTime: `${selectDate}T${last}`,
      price: priceCalc(),
    };
  };

  return (
    <div>
      <RentalReqComponent
        isLoggedIn={isLoggedIn}
        infoHandler={infoHandler}
        facilities={facilities}
        findFacilityFn={findFacilityFn}
        priceCalc={priceCalc}
        facility={facility}
        getSpace={getSpace}
        setSpace={setSpace}
        space={space}
        selectTimeFn={selectTimeFn}
        selectDate={selectDate}
        selectTime={selectTime}
        handleDateClick={handleDateClick}
        scheduleData={scheduleData}
        paymentHandler={paymentHandler}
        formData={formData}
      />
      {alertModal.open && (
        <ModalComponent
          type={alertModal.type}
          message={alertModal.message}
          onConfirm={alertModal.onConfirm}
        />
      )}
    </div>
  );
};

export default RentalReqPage;
