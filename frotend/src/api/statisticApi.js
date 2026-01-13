import axios from "axios"

const API_HOST_URL = "/api/admin/stat"

export const getAgeGenderStat = async()=>{
    const res = await axios.get(`${API_HOST_URL}/ageGender`)
    console.log("연령대별 성비=",res.data)
    return res.data
}

export const getLessonStat = async()=>{
    const res = await axios.get(`${API_HOST_URL}/lesson`)
    console.log("강의 카테고리 별 수강신청 현황",res.data)
    return res.data
}