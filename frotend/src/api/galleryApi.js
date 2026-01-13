import axios from "axios";

const API_HOST_URL = "/api/community/gallery";

export const register = async (dto) => {
  const res = await axios.post(`${API_HOST_URL}/admin`, dto);
  return res.data;
};

export const fileRegister = async (file) => {
  const formData = new FormData();
  //FormData 객체 생성, axios 에서 FormData 로 post 하면 자동으로 Content-Type 이 multipart/form-data로 설정된다
  for (let i = 0; i < file.length; i++) {
    formData.append("file", file[i]);
  }
  const res = await axios.post(`/api/upload/gallery`, formData);
  return res.data;
};

export const getGalleryList = async (param) => {
  const res = await axios.get(`${API_HOST_URL}`, {params:param});
  console.log("백엔드 갤러리 데이터=", res.data);
  return res.data;
};

export const getOneGallery = async (no) => {
  const res = await axios.get(`${API_HOST_URL}/${no}`);
  return res.data;
};

export const increaseViewCount = async (no) => {
  const res = await axios.post(`${API_HOST_URL}/${no}/view`);
  return res.data;
};

export const updateGallery = async (id, dto) => {
  const res = await axios.put(`${API_HOST_URL}/admin/${id}`, dto)
  console.log("수정된 데이터=", res.data)
  return res.data
}

export const deleteGallery = async (id) => {
  const res = await axios.delete(`${API_HOST_URL}/admin/${id}`)
  console.log("갤러리 삭제 완료")
  return res.data
}

export const deleteFile = async (id) => {
  const res = await axios.delete(`/api/upload/gallery/${id}`)
  console.log("갤러리 파일 삭제 완료")
  return res.data
}
