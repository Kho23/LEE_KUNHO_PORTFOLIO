import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getOneNotice } from "../../api/noticeApi";
import NoticeReadPageComponent from './NoticeReadPageComponent';

const initState = {
  content: "",
  createdAt: "",
  noticeId: 0,
  title: "",
  viewCount: 0,
};

const NoticeReadPage = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState(initState);

  useEffect(() => {
    const getOne = async () => {
      try {
        const data = await getOneNotice(id);
        console.log(data);
        setNotice(data);
      } catch (error) {
        console.log("백엔드 데이터 로드 중 오류 발생", error);
      }
    };
    getOne();
  }, [id]);

  return (
    <div>
      {/* 렌더링에 필요한 notice 데이터를 props로 전달 */}
      <NoticeReadPageComponent notice={notice} />
    </div>
  );
};

export default NoticeReadPage;