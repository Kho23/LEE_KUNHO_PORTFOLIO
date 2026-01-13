import React from "react";
import { Link } from "react-router-dom";
import { formatter } from "../../api/noticeApi";
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://api.jeocenter.shop";
const NoticeReadPageComponent = ({ notice }) => {
  // 부모로부터 받은 notice 데이터를 구조 분해 할당하지 않고 
  // 기존 코드 스타일(notice.title 등)을 유지하기 위해 매개변수에서 바로 받습니다.

  return (
    <div className="max-w-6xl mx-auto p-6">
      <nav className="text-sm text-gray-500 mb-6">
        홈 &gt; 커뮤니티 &gt; 공지사항
      </nav>

      {/* 공지 상세 헤더 */}
      <div className="border-t border-b border-gray-300 py-4 mb-6">
        <div className="flex items-center space-x-2 text-gray-700 mb-2">
          <span className="px-2 py-1 bg-gray-700 text-white text-xs font-semibold rounded-full">
            공지
          </span>
          <h2 className="text-xl font-bold text-gray-800">{notice.title}</h2>
        </div>
        <div className="flex text-sm text-gray-500 space-x-4">
          <span>작성자 : 관리자</span>
          {notice.createdAt && <span>등록일자 : {formatter(notice)}</span>}
          <span>조회 : {notice.viewCount}</span>
        </div>
      </div>

      {/* 내용 영역 */}
      <article className="min-h-[400px] border border-gray-300 bg-white p-8 mb-6">
        <div
          className="prose prose-gray max-w-none ck-content"
          dangerouslySetInnerHTML={{ __html: notice.content }}
        ></div>
      </article>

      {/* 첨부파일 영역 */}
      {notice.fileList && notice.fileList.length > 0 && (
        <div className="border-t border-gray-300 pt-4 mt-6">
          <h3 className="font-semibold text-gray-800 mb-3">첨부파일</h3>
          <ul className="space-y-2">
            {notice.fileList.map((file) => (
              <li key={file.id} className="...">
                <span className="text-gray-800 text-sm font-medium">
                  {file.originalName}
                </span>
                <div className="flex gap-2">
                  {/* [수정] filePath 앞에 백엔드 도메인을 붙여줍니다. */}
                  <a
                    href={`${API_BASE_URL}${file.filePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="..."
                  >
                    미리보기
                  </a>
                  {/* [수정] 다운로드 경로도 백엔드 도메인이 포함되도록 수정합니다. */}
                  <a
                    href={`${API_BASE_URL}/api/community/notice/download/${file.savedName}`}
                    className="..."
                  >
                    다운로드
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="border-t-2 border-black my-6"></div>

      <div className="flex justify-end mt-1">
        <Link
          to={"/community/notice"}
          className="bg-gray-700 text-white font-bold py-2 px-6 rounded hover:bg-gray-800 transition-colors"
        >
          목록으로
        </Link>
      </div>
    </div>
  );
};

export default NoticeReadPageComponent;