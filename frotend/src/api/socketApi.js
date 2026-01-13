import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const WS_URL = "https://api.jeocenter.shop/ws-chat";

// 1. 소켓 연결 함수
export const connectSocket = (clientRef, token, onConnect) => {
    // 각각 유저 소켓, 인증정보 있는 토큰, 연결 시 실행될 콜백함수 
    const socket = new SockJS(WS_URL); //소켓 연결 주소 설정
    clientRef.current = Stomp.over(socket); //스톰프를 소켓 연결 규칙으로 설정 
    clientRef.current.connect(
        { Authorization: `Bearer ${token}` }, //헤더에 토큰 넣고 연결 시도 
        () => {
            console.log(`[Socket] 연결 성공`);
            if (onConnect) onConnect(); //연결되면 콜백함수 실행
        },
        (err) => {
            console.error("[Socket] 연결 에러:", err);
        }
    );
};

// 2. 구독 함수
export const subscribeRoom = (clientRef, roomId, callback) => {
    if (!clientRef.current || !clientRef.current.connected) return; 
    //소켓이 없거나 연결 안되어있으면 즉시 종료
    return clientRef.current.subscribe(
        `/sub/chat/room/${roomId}`, //구독할 주소 설정 방번호 기준으로 설정함
        (message) => {
            const received = JSON.parse(message.body);
            //JSON 형태로 백엔드에서 온 메세지를 자바스크립트 객체형태로 변환
            callback(received); //변환 후 메세지를 콜백함수에 인자로 전달
        }
    );
};

// 3. 연결 해제 함수
export const disconnectSocket = (clientRef) => {
    if (clientRef.current) {
        clientRef.current.disconnect();
        console.log("[Socket] 연결 해제");
    }
};

export const publishMessage = (clientRef, roomId, message, callback) => {
    if (!clientRef.current || !clientRef.current.connected) { //소켓 연결이 없거나 연결되지 않았으면 즉시 종료
        console.log("[Socket] 전송 실패: 소켓이 연결되지 않았습니다.");
        return;
    }
    clientRef.current.send("/pub/chat/message", {}, JSON.stringify({ //백엔드에서 소켓 연결 듣고있는 쪽에 JSON 형태로 변환해서 보내줌
        roomId: roomId,
        message: message,
    }));
    if(callback) callback()
};