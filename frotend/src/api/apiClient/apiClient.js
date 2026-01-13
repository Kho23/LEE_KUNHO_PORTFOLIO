// import axios from "axios";
// import { getCookie } from "../../util/cookieUtil";
// //index.js 에 전역으로 axios 가로채기 설정하여 더이상 필요없는 코드입니다.
// const apiClient = axios.create({
//     baseURL: "",
//     headers: { "Content-Type": 'application/json' }
// })
// apiClient.interceptors.request.use(
//     (config) => {
//         const cookie = getCookie("member")
//         if (cookie && cookie.accessToken) config.headers['Authorization'] = `Bearer ${cookie.accessToken}`
//         return config
//     },
//     (error) => {
//         return Promise.reject(error)
//     }
// )
// export default apiClient