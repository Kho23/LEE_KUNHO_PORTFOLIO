import axios from "axios";

export const rentalRequest = async (form) => {
  const res = await axios.post(
    `/api/reservation/rental`,
    form
  );
  return res.data;
}; // 대관 신청 예약 폼 제출

export const getRentalList = async () => {
  const res = await axios.get(`/api/reservation/rental`);
  return res.data;
}; // 대관 신청 목록 가져오기

export const deleteRental = async (id) => {
  const res = await axios.delete(
    `/api/reservation/rental/${id}`
  );
  return res.data;
}; // 대관 신청 취소하기
