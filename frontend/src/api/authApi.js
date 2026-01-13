import axios from "axios"

export const API_HOST_URL = "/api/auth"

export const login = async (id, password) => {
    const res = await axios.post(`${API_HOST_URL}/login`, { 'loginId': id, 'password': password })
    console.log("로그인 시도 ", id, password)
    return res.data
}
export const register = async (dto) => {
    const res = await axios.post(`${API_HOST_URL}/register`, dto)
    console.log("회원가입 데이터=", res.data)
    return res.data
}
export const sendCode = async (memberInfo) => {
    const res = await axios.post(`${API_HOST_URL}/sendCode`, memberInfo)
    console.log("아이디 찾기 인증번호=", res.data)
    return res.data
}
export const checkCode = async (memberInfo, authCode) => {
    const res = await axios.post(`${API_HOST_URL}/checkCode`, {
        memberName: memberInfo.memberName,
        memberEmail: memberInfo.memberEmail,
        authCode: authCode
    })
    console.log("아이디 찾기 완료 아이디=", res.data)
    return res.data
}
export const findId = async (memberInfo)=>{
  const res = await axios.post(`${API_HOST_URL}/findId`, memberInfo)
  return res.data
}
export const sendCodePw=async(memberInfo)=>{
    const res = await axios.post(`${API_HOST_URL}/sendCodePw`,{
        memberName:memberInfo.memberName,
        memberEmail:memberInfo.memberEmail,
        memberLoginId:memberInfo.memberLoginId
    })
    console.log("비밀번호 찾기 인증번호 발송 완료")
    return res.data
}
export const checkCodePw=async(memberInfo)=>{
    const res = await axios.post(`${API_HOST_URL}/checkCodePw`,{
        memberANme:memberInfo.memberName,
        memberEmail:memberInfo.memberEmail,
        memberLoginId:memberInfo.memberLoginId,
        authCode:memberInfo.authCode
    })
    console.log("비밀번호 찾기 인증번호 확인중")
    return res.data
}
export const resetPassword = async(memberInfo)=>{
    const res = await axios.post(`${API_HOST_URL}/resetPassword`,{
        memberANme:memberInfo.memberName,
        memberEmail:memberInfo.memberEmail,
        memberLoginId:memberInfo.memberLoginId,
        authCode:memberInfo.authCode,
        newPassword:memberInfo.newPassword
    })
    console.log("비밀번호 변경 완료")
    return res.data
}
export const duplicateEmail=async(email)=>{
    const res = await axios.get(`${API_HOST_URL}/check/email`,{params:{email:email}})
    console.log("중복확인 완료")
    return res.data
}
export const duplicateId=async(id)=>{
    const res = await axios.get(`${API_HOST_URL}/check/loginId`,{params:{loginId:id}})
    console.log("중복확인 완료")
    return res.data
}

export const sendJoinMail = async (email) => {
    const res = await axios.get(`${API_HOST_URL}/join/email`, {params:{email:email}})
    return res.data
}

export const verifyJoinCode = async (dto) => {
    const res = await axios.post(`${API_HOST_URL}/join/verify`, {
        memberEmail:dto.memberEmail,
        authCode:dto.authCode
    })
    return res.data
}