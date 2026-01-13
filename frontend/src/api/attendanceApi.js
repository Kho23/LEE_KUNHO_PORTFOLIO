import axios from "axios";

export const getLessonList = async (lessonNo, date) => {
  const res = await axios.get(
    `/api/attendance/getMemberList/${lessonNo}`,
    { params: { date } }
  );
  return res.data;
}; // 내 레슨 수강신청 목록 가져오기

export const submitAttendance = async (attendance, lessonNo) => {
  const res = await axios.post(
    `/api/attendance/save/${lessonNo}`,
    attendance
  );
  return res.data;
}; // 출석 저장하기
