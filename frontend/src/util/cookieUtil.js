import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, day=1/24)=>{
    //쿠키 저장 코드
    const expires=new Date()
    const millisecondsPerDay = 24 * 60 * 60 * 1000; //밀리초로 계산
    expires.setTime(expires.getTime()+(day+millisecondsPerDay))//토큰 만료시간 설정
    return cookies.set(name, value, {path:"/", expires:expires})
    //쿠키 이름, 실제 토큰, 경로와 만료시간 설정 후 쿠키 생성
}
//쿠키 저장 로직
export const getCookie = (name) =>{
    return cookies.get(name)
}
//쿠키 가져오는 로직
export const removeCookie = (name) =>{
    return cookies.remove(name, {path:"/"})
}
//쿠키 삭제하는 로직(로그아웃 시 실행)