import React, { useEffect, useRef, useState } from "react";
import { getCookie } from "../../util/cookieUtil";
import { getHistory } from "../../api/chatApi";
import {
  connectSocket,
  disconnectSocket,
  publishMessage,
} from "../../api/socketApi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false); //모달 오픈여부
  const [messages, setMessages] = useState([]); //주고받은 채팅 목록
  const [input, setInput] = useState(""); //채팅방 입력글자

  const stompClient = useRef(null); //소켓 연결 객체
  const messagesEndRef = useRef(null); //스크롤 맨 아래로 내리기

  const cookieData = getCookie("member");
  const memberId = cookieData?.memberId;
  const token = cookieData?.accessToken;
  const loginId = cookieData?.loginId

  useEffect(() => {
    if (memberId && token) {
      connectSocket(
        stompClient,
        token,
        () => {
          console.log("소켓 연결 성공");
          stompClient.current.subscribe(
            `/sub/chat/room/${memberId}`, //멤버아이디 기준으로 소켓 구독 시작
            (message) => {
              //메세지가 오면 JSON 문자열을 객체 형태로 변환하고 기존 채팅목록에 새 메세지를 추가해줌
              const received = JSON.parse(message.body);
              setMessages((prev) => [...prev, received]);
            }
          );
        },
        (err) => {
          console.log("소켓연결 에러: ", err);
        }
      ); //로그인이 되어있다면 소켓 연결을 시도해라
      getHistory(memberId).then((data) => setMessages(data)); //채팅 목록을 가져오고 채팅 기록으로 설정해라
    } else {
      // 로그아웃 시 정리
      setMessages([]);
      setIsOpen(false);
      disconnectSocket(stompClient);
    }
    return () => disconnectSocket(stompClient); //토큰이나 멤버ID가 변화하면 기존 소켓 연결을 끊고 useEffect 가 다시 실행됨
  }, [memberId, token]);

  // 스크롤 자동 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter")
      publishMessage(stompClient, memberId, input, () => setInput(""));
  };

  // 비로그인 시 모달창 안보이게
  if (!token || !memberId) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "110px",
        right: "30px",
        zIndex: 9999,
        fontFamily: "sans-serif",
      }}
    >
      {/* 1. 채팅창 모달 */}
      <div
        style={{
          display: isOpen ? "flex" : "none",
          flexDirection: "column",
          position: "absolute",
          bottom: "80px",
          right: "0",
          width: "350px",
          height: "500px",
          backgroundColor: "#fff",
          borderRadius: "20px",
          boxShadow:
            "0 12px 28px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          transition: "all 0.3s ease-in-out",
          animation: "fadeIn 0.3s",
        }}
      >
        {/* 헤더 */}
        <div
          style={{
            padding: "20px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "35px",
                height: "35px",
                background: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#764ba2",
              }}
            >
              <IoChatbubbleEllipsesOutline />
            </div>
            <div>
              <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                고객센터
              </div>
              <div
                style={{
                  fontSize: "12px",
                  opacity: 0.8,
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    background: "#00ff88",
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                ></span>
                실시간 상담 중
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: "20px",
              opacity: 0.8,
            }}
          >
            ✕
          </button>
        </div>

        {/* 대화 내용 */}
        <div
          style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto",
            backgroundColor: "#f9f9f9",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontSize: "12px",
              color: "#888",
              margin: "10px 0",
            }}
          >
            문의 내용을 남겨주시면
            <br />
            담당자가 확인 후 답변드립니다.
          </div>

          {messages.map((msg, index) => {
            const isMyMessage = msg.sender === loginId;
            return (
              <div
                key={index}
                style={{
                  alignSelf: isMyMessage ? "flex-start" : "flex-end",
                  maxWidth: "75%",
                  padding: "12px 16px",
                  borderRadius: isMyMessage
                    ? "18px 18px 2px 18px"
                    : "18px 18px 18px 2px",
                  backgroundColor: isMyMessage ? "#fff" : "#667eea",
                  color: isMyMessage ? "#333" : "white",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                  fontSize: "14px",
                  lineHeight: "1.5",
                  wordBreak: "break-word",
                }}
              >
                {msg.message}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* 입력 영역 */}
        <div
          style={{
            padding: "15px",
            backgroundColor: "white",
            borderTop: "1px solid #f0f0f0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#f0f2f5",
              borderRadius: "25px",
              padding: "5px 5px 5px 15px",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="메시지를 입력하세요..."
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                outline: "none",
                fontSize: "14px",
              }}
            />
            <button
              onClick={() => publishMessage(stompClient, memberId, input)}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: input.trim() ? "#667eea" : "#ccc",
                color: "white",
                border: "none",
                cursor: input.trim() ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
              }}
              disabled={!input.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      </div>

      {/* 2. 플로팅 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: isOpen
            ? "#333"
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          border: "none",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "28px", // 🔥 폰트 크기로 아이콘 크기 조절
          transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {/* 🔥 [수정] 이미지 태그 대신 이모지 텍스트를 바로 사용 */}
        {isOpen ? "✕" : <IoChatbubbleEllipsesOutline />}
      </button>
    </div>
  );
};

export default ChatWidget;
