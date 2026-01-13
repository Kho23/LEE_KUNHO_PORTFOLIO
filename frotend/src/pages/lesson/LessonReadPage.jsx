import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getOneLesson } from '../../api/classApi';
import LessonReadPageComponent from './LessonReadPageComponent';

const LessonReadPage = () => {
  const [lesson, setLesson] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // 로그인 상태 확인
  const { isLoggedIn } = useSelector(state => state.auth);

  useEffect(() => {
    const getOne = async () => {
      try {
        const data = await getOneLesson(id);
        setLesson(data);
      } catch (err) {
        console.error("데이터 로딩 실패", err);
      }
    };
    getOne();
  }, [id]);

  return (
    <div>
      <LessonReadPageComponent 
        lesson={lesson} 
        isLoggedIn={isLoggedIn} 
        navigate={navigate} 
      />
    </div>
  );
};

export default LessonReadPage;