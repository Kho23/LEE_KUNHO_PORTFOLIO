import axios from "axios"

const API_HOST_URL = "/api/community/faq"

export const getFaqList = async () => {
    const res = await axios.get(`${API_HOST_URL}/list`)
    console.log("백엔드에서 넘어온 FAQ 전체데이터=", res.data)
    return res.data
}
export const getFaqCategory = async () =>{
    const res = await axios.get(`${API_HOST_URL}/category`)
    console.log("백엔드에서 넘어온 FAQ 카테고리=",res.data)
    return res.data
}