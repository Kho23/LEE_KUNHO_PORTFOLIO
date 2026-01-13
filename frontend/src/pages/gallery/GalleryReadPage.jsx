import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { getOneGallery } from "../../api/galleryApi";
import GalleryReadPageComponent from './GalleryReadPageComponent';

const GalleryReadPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gallery, setGallery] = useState(null);

  useEffect(() => {
    const getOne = async () => {
      try {
        const data = await getOneGallery(id);
        setGallery(data);
        console.log(data);
      } catch (error) {
        console.error("갤러리 불러오기 실패", error);
      }
    };
    getOne();
  }, [id]);

  // 목록으로 이동하는 핸들러 함수
  const moveToList = () => {
    navigate("/community/gallery");
  };

  return (
    <div>
      {/* 렌더링에 필요한 상태와 함수를 props로 전달 */}
      <GalleryReadPageComponent 
        gallery={gallery}
        moveToList={moveToList} 
      />
    </div>
  );
};

export default GalleryReadPage;