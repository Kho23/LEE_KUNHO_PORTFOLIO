import axios from "axios";

export const upload = async (formData) => {
  const res = await axios.post(
    `/api/guide/upload`,
    formData
  );
  return res.data;
};

export const getCategory = async (category) => {
  const res = await axios.get(`/api/guide/${category}`);
  return res.data;
};

export const getView = async (fileName) => {
  const res = await axios.get(`/api/view/${fileName}"`);
  return res.data;
};
