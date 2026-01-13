import axios from 'axios';
import { getCookie } from '../util/cookieUtil';

const API_HOST_URL = '/chat';

const getAuthHeader = () => {
    const memberInfo = getCookie("member");
    const token = memberInfo ? memberInfo.accessToken : null;
    if (!token) throw new Error("로그인이 필요합니다.");
    return { headers: { Authorization: `Bearer ${token}` } };
}

export const getHistory = async (memberId) => {
    try {
        const header = getAuthHeader();
        const res = await axios.get(`${API_HOST_URL}/${memberId}`, header);
        console.log(`[User ${memberId}] 내역 로드 성공`);
        return res.data;
    } catch (error) {
        console.error("내역 로드 실패:", error);
        throw error;
    }
}

export const getChatRoomList = async () => {
    try {
        const header = getAuthHeader();
        const res = await axios.get(`${API_HOST_URL}/list/admin`, header); 
        console.log("채팅방 목록 로드 성공");
        console.log("채팅 목록=", res.data)
        return res.data;
    } catch (error) {
        console.error("목록 로드 실패:", error);
        throw error;
    }
}

