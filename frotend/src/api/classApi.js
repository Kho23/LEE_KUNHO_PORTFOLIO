import axios from "axios"

const API_HOST_URL = "/api/lesson"

export const getLessonList = async(param) => {
    const {data} = await axios.get(`${API_HOST_URL}`,{params:param})
    console.log("백엔드에서 온 lesson data=".data)
    return data
}

export const getOneLesson = async (id) => {
    const {data} = await axios.get(`${API_HOST_URL}/${id}`)
    console.log("백엔드에서 온 lesson 한개=",data)
    return data
}


export const checkRegistration = async (id) => {
  const {data} = await axios.get(`/api/registration/check/${id}`)
  console.log("중복 수강신청 체크=",data)
  return data
}

export const getPreviewLessons= async()=>{
  const {data} = await axios.get(`${API_HOST_URL}/preview`)
  console.log("메인 표시용 레슨 데이터=",data)
  return data
}