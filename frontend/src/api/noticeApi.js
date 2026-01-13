import axios from "axios";
import { format, parseISO } from "date-fns";

const API_HOST_URL = "/api/community/notice";

export const getNoticeList = async (param) => {
  const res = await axios.get(`${API_HOST_URL}/list`,{params:param});
  console.log("백엔드 notice 리스트=", res.data);
  if (res.data == null) console.log("공지사항 data 없음");
  return res.data;
};

export const increaseViewCount = async (no) => {
  const res = await axios.post(`${API_HOST_URL}/${no}/view`);
  return res.data;
};

export const getOneNotice = async (no) => {
  const res = await axios.get(`${API_HOST_URL}/${no}`);
  console.log("백엔드에서 가져온 notice 한개", res.data);
  return res.data;
};
export const formatter = (i) => {
  return format(parseISO(i.createdAt), "yyyy-MM-dd");
};
