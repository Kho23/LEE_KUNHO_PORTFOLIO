import axios from "axios";
const API_HOST_URL_REG = "/api/registration";
// const getAuthHeader = () => {
//   const cookie = getCookie("member")
//   console.log("쿠키는",cookie)
//   if (!cookie) throw new Error("로그인 정보 없음")
//   const accessToken = cookie.accessToken;
//   if(!accessToken) throw new Error("토큰이 쿠키에 없음")
//   return {
//     'Authorization':`Bearer ${accessToken}`
//   }
// }
//인터셉터 처리로 더이상 필요없는 코드

export const getOne = async () => {
  const res = await axios.get(`/api/member/memberEdit`);
  return res.data;
};

export const modify = async (userData) => {
  const res = await axios.put(
    `/api/member/memberEdit`,
    userData
  );
  console.log("수정완료 변경할 멤버정보=", userData);
  return res.data;
};

export const changePassword = async (data) => {
  const res = await axios.post(
    `/api/member/passwordEdit`,
    data
  );
  return res.data;
};

export const partnerReqFileRegister = async (formData) => {
  const res = await axios.post(
    `/api/partner/partnerRequest`,
    formData
  );
  return res.data;
};

export const supportReqRegister = async (formData) => {
  const res = await axios.post(
    `/api/support/write`,
    formData
  );
  return res.data;
};

export const supportGetList = async () => {
  const res = await axios.get(`/api/support`);
  return res.data;
};

export const supportGetOne = async (no) => {
  const res = await axios.get(`/api/support/${no}`);
  return res.data;
};

export const getRegistrationList = async () => {
  const res = await axios.get(`${API_HOST_URL_REG}`);
  console.log("백엔드에서 받은 유저 수강신청 정보=", res.data);
  return res.data;
};

export const cancelRegistration = async (registrationId) => {
  const res = await axios.delete(
    `${API_HOST_URL_REG}/cancel/${registrationId}`
  );
  console.log("수강신청 취소", res.data);
  return res.data;
};

export const registrationById = async (lessonId) => {
  const res = await axios.post(`${API_HOST_URL_REG}/${lessonId}`);
  console.log("수강신청 하기 = ", res.data);
  return res.data;
};
