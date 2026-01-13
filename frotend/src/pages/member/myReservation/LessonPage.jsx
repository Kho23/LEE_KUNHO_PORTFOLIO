import React, { useEffect, useState } from "react";
import { getRegistrationList, cancelRegistration } from "../../../api/memberApi";
import MyLessonComponent from "./components/MyLessonComponent";

const initState = [
  {
    registrationId: 0,
    lessonId: 0,
    lessonTitle: "",
    teacherName: "",
    createdAt: "",
    status: "",
  },
];

const LessonPage = () => {
  const [registration, setRegistration] = useState([]);

  useEffect(() => {
    try {
      const get = async () => {
        const data = await getRegistrationList();
        setRegistration(data);
        if (data == null || data.length === 0) setRegistration(initState);
        console.log(data);
      };
      get();
    } catch (error) {
      console.log(error);
      alert("수강신청 목록 조회 중 오류 발생");
    }
  }, []);

  const handleClickDelete = async (id) => {
    if (!window.confirm("정말로 수강신청을 취소하시겠습니까?")) return;

    try {
      const data = await cancelRegistration(id);
      console.log(data);
      alert("취소가 완료되었습니다.");
      window.location.reload(); 
    } catch (error) {
      alert("취소 중 오류가 발생했습니다.");
      console.log("취소 중 오류 발생 = ", error);
    }
  };

  return (
    <div>
      <MyLessonComponent 
        registration={registration} 
        handleClickDelete={handleClickDelete} 
      />
    </div>
  );
};

export default LessonPage;