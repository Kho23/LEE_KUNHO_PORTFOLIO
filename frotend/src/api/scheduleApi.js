import axios from "axios"
const API_HOST_URL="/api/community/schedule"
export const getScheduleByDate = async (startDate, endDate) =>{
    const {data} = await axios.get(`${API_HOST_URL}?startDate=${startDate}&endDate=${endDate}`)
    console.log("백엔드에서 가져온 schedule data = ", data)
    return data
}