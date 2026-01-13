import axios from "axios";
const API_SERVER_HOST = "";
const host = `${API_SERVER_HOST}/api/program`;

export const getOne = async (programId) => {
  var str = `${host}/${programId}`;
  const res = await axios.get(str);
  console.log("backend로부터 온데이터 ", res.data);
  return res.data;
};
