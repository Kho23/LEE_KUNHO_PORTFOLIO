import axios from "axios";

const API_HOST_URL = "/api/upload";

export const fileRegister = async (formData, domain) => {
  const res = await axios.post(`${API_HOST_URL}/${domain}`, formData);
  console.log("확인해봐", res.data);
  return res.data;
};
