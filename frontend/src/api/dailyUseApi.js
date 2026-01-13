import axios from "axios";
const API_SERVER_HOST = "";
const host = `${API_SERVER_HOST}/api`;

export const findByFacilityId = async (id) => {
  var str = `${host}/facilitySpace/${id}`;
  const res = await axios.get(str);
  console.log("backend로부터 온데이터 ", res.data);
  return res.data;
};

export const registerDailyUse = async (data) => {
  var str = `${host}/dailyUse`;
  const res = await axios.post(str, data);
  console.log("backend으로부터 온데이터 ", res.data);
  return res.data;
};
export const registerGymDailyUse = async (data) => {
  var str = `${host}/gymDailyUse`;
  const res = await axios.post(str, data);
  console.log("backend으로부터 온데이터 ", res.data);
  return res.data;
};
export const getDailyUseList = async () => {
  var str = `${host}/dailyUse`;
  const res = await axios.get(str);
  return res.data;
};

export const deleteDailyUse = async (id) => {
  var str = `${host}/dailyUse/${id}`;
  const res = await axios.delete(str);
  return res.data;
};
export const getGymDailyUseList = async () => {
  var str = `${host}/gymDailyUse`;
  const res = await axios.get(str);
  return res.data;
};

export const deleteGymDailyUse = async (id) => {
  var str = `${host}/gymDailyUse/${id}`;
  const res = await axios.delete(str);
  return res.data;
};
