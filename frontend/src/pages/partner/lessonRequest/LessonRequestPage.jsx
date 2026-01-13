import React from "react";
import LessonRequestComponent from "./components/LessonRequestComponent";
import { getOne } from "../../../api/memberApi";
import LessonRequestDetailComponent from "./components/LessonRequestDetailComponent";
import LessonRequestOperationComponent from "./components/LessonRequestOperationComponent";
import { useNavigate } from "react-router-dom";
import { getPartnerClassList, lessonRequest } from "../../../api/partnerApi";
import { findByFacilityId } from "../../../api/dailyUseApi";
import { getTime } from "../../../api/commonApi";
import { useEffect, useState } from "react";

const LessonRequestPage = () => {
  const [form, setForm] = useState({
    title: "",
    startDate: null,
    endDate: null,
    days: [],
    level: "",
    startTime: null,
    endTime: null,

    description: "",
    tools: "",
    memo: "",
    curriculum: "",

    minPeople: null,
    maxPeople: null,
    facilityType: null,
    facilityRoomType: null,
  });

  const className = [
    { id: "수영", name: "POOL", facilityId: 1 },
    { id: "골프", name: "GOLF", facilityId: 3 },
    { id: "풋살", name: "FUTSAL", facilityId: 4 },
    { id: "무용", name: "DANCE", facilityId: 5 },
  ];

  // 현재 페이지 단계 (1 ~ 3)
  const [page, setPage] = useState(1);

  // 사용자 정보
  const [data, setData] = useState({});
  // 파트너가 등록한 강좌 분야
  const [partnerClass, setPartnerClass] = useState([]);
  // 선택한 시설의 공간 목록
  const [getSpace, setGetSpace] = useState([]);
  // 기간 + 요일 기준 예약 가능 시간 (공간별)
  const [availableTimes, setAvailableTimes] = useState([]);
  // 실제로 선택 가능한 공통 시간대
  const [timesForCheck, setTimesForCheck] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const f = async () => {
      const res = await getOne(); // 로그인 사용자 정보 조회
      const res2 = await getPartnerClassList(); // 파트너가 등록한 강좌 분야 조회
      setData(res);
      setPartnerClass(res2);
    };
    f();
  }, []);

  useEffect(() => {
    // 강좌 분야 선택 시 해당 시설 ID를 기준으로 공간 목록 조회
    if (!className || !form.facilityType) return;
    const result = className.find((i) => i.name == form.facilityType);
    if (!result) return;

    const f = async () => {
      const res = await findByFacilityId(result.facilityId);
      setGetSpace(res);
    };
    f();
  }, [form.facilityType]);

  useEffect(() => {
    // 기간+요일 선택 시 서버에 가능한 시간 목록 조회
    if (!form.facilityType) return;
    if (!form.startDate || !form.endDate) return;
    if (form.days.length === 0) return;

    const result = className.find((i) => i.name === form.facilityType);
    if (!result) return;

    const forGetTime = {
      facilityId: result.facilityId,
      startDate: form.startDate,
      endDate: form.endDate,
      days: form.days,
    };

    const f = async () => {
      const res2 = await getTime(forGetTime);
      setAvailableTimes(res2);
    };
    f();
  }, [form.facilityType, form.startDate, form.endDate, form.days]);

  useEffect(() => {
    if (!form.startDate) return;

    const start = new Date(form.startDate).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);

    if (start <= today) {
      console.log("today", today);
      alert("시작일은 오늘보다 이후여야 합니다");
      setForm((i) => ({
        ...i,
        startDate: "",
      }));
    }
    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      alert("종료일은 시작일보다 이후여야 합니다");
      setForm((i) => ({
        ...i,
        endDate: "",
      }));
    }
    if (form.startTime && form.endTime && form.endTime <= form.startTime) {
      alert("종료시간은 시작시간보다 이후여야 합니다");
      setForm((i) => ({
        ...i,
        endTime: "",
      }));
    }
  }, [form.startDate, form.endDate, form.startTime, form.endTime]);

  const formChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm((i) => ({
      ...i,
      [name]: value,
    }));
  };

  const dateChangeHandler = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setForm((i) => ({ ...i, days: [...i.days, value] }));
    } else {
      setForm((i) => ({ ...i, days: i.days.filter((j) => j !== value) }));
    }
  };

  useEffect(() => {
    if (!form.facilityRoomType) {
      setTimesForCheck([]);
      return;
    }

    const selectRoom = availableTimes?.find(
      (i) => i.spaceId === Number(form.facilityRoomType)
    );

    if (!selectRoom) {
      setTimesForCheck([]);
      return;
    }

    const timeList = selectRoom?.schedule
      .map((i) => i.times)
      .reduce((i, t) => i.filter((j) => t.includes(j)));

    setTimesForCheck(timeList);
  }, [form.facilityRoomType, availableTimes]);

  const submitHandler = async () => {
    if (!form.minPeople) return alert("최소 인원을 입력해주세요.");
    if (!form.maxPeople) return alert("정원을 입력해주세요.");
    if (!form.facilityRoomType) return alert("필요한 시설을 선택해주세요.");

    try {
      const res = await lessonRequest(form);
      alert("접수가 완료되었습니다.");
      navigate("/partner");
    } catch (err) {
      console.error("예약 불가능: ", err);
      alert("이미 예약된 시설입니다. 다른 공간을 선택해 주세요.");
    }
  };

  const nextClickHandler = () => {
    if (page === 1) {
      if (!form.title) return alert("강좌 제목을 입력해주세요.");
      if (!form.facilityType) return alert("강좌 분야를 선택해주세요.");
      if (!form.level) return alert("난이도를 선택해주세요.");
      if (!form.startDate || !form.endDate)
        return alert("기간을 선택해주세요.");
      if (form.days.length === 0) return alert("요일을 선택해주세요.");
      if (!form.startTime || !form.endTime)
        return alert("시간을 선택해주세요.");
    }

    if (page === 2) {
      if (!form.description) return alert("강의 설명을 입력해주세요.");
      if (!form.tools) return alert("강의 준비물을 입력해주세요.");
      if (!form.memo) return alert("강의 특이사항을 입력해주세요.");
      if (!form.curriculum) return alert("커리큘럼을 입력해주세요.");
    }

    setPage((page) => page + 1);
  };
  console.log(data, partnerClass);
  return (
    <>
      {page === 1 && (
        <LessonRequestComponent
          form={form}
          data={data}
          getSpace={getSpace}
          setForm={setForm}
          availableTimes={availableTimes}
          className={className}
          partnerClass={partnerClass}
          timesForCheck={timesForCheck}
          formChangeHandler={formChangeHandler}
          dateChangeHandler={dateChangeHandler}
        />
      )}
      {page === 2 && (
        <LessonRequestDetailComponent
          form={form}
          formChangeHandler={formChangeHandler}
        />
      )}
      {page === 3 && (
        <LessonRequestOperationComponent
          form={form}
          getSpace={getSpace}
          formChangeHandler={formChangeHandler}
        />
      )}
      <div className="max-w-3xl mx-auto p-6 sm:p-10 mt-8">
        <div className="flex justify-between items-center">
          <div>
            {page > 1 && (
              <button
                className="px-10 py-3 rounded-xl
                  font-semibold border-2 border-gray-300
                hover:border-gray-400 hover:bg-gray-50
                text-gray-700 transition duration-150"
                onClick={() => setPage(page - 1)}
              >
                이전
              </button>
            )}
          </div>

          <div>
            {page < 3 && (
              <button
                className="
                  px-10 py-3 rounded-xl 
                  font-extrabold text-lg 
                  bg-blue-600 text-white 
                  hover:bg-blue-700 
                  shadow-lg hover:shadow-xl
                  transition duration-150
                "
                onClick={nextClickHandler}
              >
                다음
              </button>
            )}

            {page === 3 && (
              <button
                className="
                  px-10 py-3 rounded-xl 
                  font-extrabold text-lg 
                  bg-blue-600 text-white 
                  hover:bg-blue-700 
                  shadow-lg hover:shadow-xl
                  transition duration-150
                "
                onClick={submitHandler}
              >
                제출하기
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LessonRequestPage;
