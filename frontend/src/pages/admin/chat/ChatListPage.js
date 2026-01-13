import React from 'react';
// API 호출(import { getChatRoomList } ...) 제거

// [중요] chatList를 props로 받아야 부모의 실시간 업데이트가 반영됩니다.
const ChatListPage = ({ chatList, onSelect, currentRoomId }) => {
  
  // [삭제됨] 내부 useState, useEffect 제거
  // 부모(AdminChatPage)가 관리하는 chatList를 그대로 보여주기만 하면 됩니다.

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      
      {/* 헤더 영역 */}
      <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
        <h1 className="font-bold text-xl text-gray-800">채팅</h1>
        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          전체 {chatList ? chatList.length : 0}
        </span>
      </div>

      {/* 리스트 영역 */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {chatList && chatList.map((room) => (
          <div
            key={room.roomId}
            onClick={() => onSelect(room.roomId)}
            className={`flex items-center px-5 py-4 cursor-pointer transition-colors duration-200 hover:bg-gray-50
              ${currentRoomId === room.roomId ? 'bg-indigo-50' : 'bg-white'}
            `}
          >
            {/* 1. 좌측: 프로필 아바타 */}
            <div className="relative flex-shrink-0 mr-4">
              <div className={`w-12 h-12 rounded-[18px] flex items-center justify-center text-white font-bold text-lg shadow-sm
                ${room.senderRole!=="ROLE_USER" ? 'bg-gray-300' : 'bg-indigo-400'} 
              `}>
                {room.senderRole=="ROLE_USER" ? room.senderId.charAt(0) : 'A'}
              </div>
            
              {room.senderRole=="ROLE_USER" && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white"></span>
                </span>
              )}
            </div>

            {/* 2. 중앙: 이름 및 마지막 메시지 */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <span className={`text-[15px] truncate mr-2 ${room.senderRole=="ROLE_USER" ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>
                  {room.senderId}
                </span>
                {/* 시간 표시 */}
                <span className="text-[11px] text-gray-400 flex-shrink-0">
                  {room.lastSendAt ? new Date(room.lastSendAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                {/* 메시지 내용 */}
                <p className={`text-[13px] truncate w-full ${room.senderRole=="ROLE_USER" ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                  {room.lastMessage}
                </p>
                
                {/* 3. 우측: 뱃지 (답변 대기 상태일 때만 표시) */}
                {room.senderRole=="ROLE_USER" && (
                    <span className="ml-2 flex-shrink-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-sm">
                      N
                    </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* 데이터 없을 때 */}
        {(!chatList || chatList.length === 0) && (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <div className="text-4xl mb-2">💬</div>
            <p className="text-sm">대화 내역이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatListPage;