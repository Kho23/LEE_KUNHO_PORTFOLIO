import axios from "axios";

export const getPartnerStatus = async () => {
  const res = await axios.get(
    `/api/partner/partnerRequest`
  );
  return res.data;
}; // 파트너 신청서 제출 상태 확인

export const lessonRequest = async (form) => {
  const res = await axios.post(
    `/api/lesson/lessonRequest`,
    form
  );
  return res.data;
}; // 강좌 개설 신청 폼 제출

export const getMyLessons = async () => {
  const res = await axios.get(`/api/lesson/myLessons`);
  return res.data;
}; // 파트너 내 레슨 가져오기

export const getPartnerClassList = async () => {
  const res = await axios.get(`/api/partner/class`);
  return res.data;
}; // 파트너 종목만 가져오기

export const getMySearchLesson = async (title) => {
  const res = await axios.get(
    `/api/lesson/myLessons/search`,
    { params: { title } }
  );
  return res.data;
}; // 파트너 내 레슨 검색한 제목만 가져오기

export const getMyOneLesson = async (lessonNo) => {
  const res = await axios.get(
    `/api/lesson/myLessons/${lessonNo}`
  );
  return res.data;
}; // 파트너 내 레슨 하나만 가져오기
