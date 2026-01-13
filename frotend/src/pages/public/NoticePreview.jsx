import { useEffect, useState } from "react";
import { getNoticeList, formatter } from "../../api/noticeApi";
import useCustomMove from "../../hooks/useCustomMove";

const NoticePreview = () => {
  const [notices, setNotices] = useState([]);
  const { moveToNoticeDetail } = useCustomMove();

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const data = await getNoticeList();
        const sorted = [...data.dtoList].slice(0, 7);
        setNotices(sorted);
      } catch (err) {
        console.error("공지 미리보기 불러오기 실패:", err);
      }
    };
    fetchNotice();
  }, []);

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border p-3">
      {/* List */}
      <ul className="text-[13px] text-gray-600">
        {notices.length === 0 ? (
          <li className="py-6 text-center text-gray-400">공지 없음</li>
        ) : (
          notices.map((n) => (
            <li
              key={n.noticeId}
              onClick={() => moveToNoticeDetail(n.noticeId)}
              className="flex justify-between py-2 cursor-pointer px-1 transition
              border-b hover:font-semibold hover:text-blue-300"
            >
              <span className="flex-1 pr-2 truncate text-black">{n.title}</span>
              <span className="text-black w-24 text-right">{formatter(n)}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default NoticePreview;
