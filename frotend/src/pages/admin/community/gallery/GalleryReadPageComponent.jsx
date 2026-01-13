import React, { useEffect, useState } from "react";
// 1. useNavigate 임포트
import { useParams, useNavigate } from "react-router-dom";
import { deleteGallery, getOneGallery } from '../../../../api/galleryApi'
import useCustomMove from "../../../../hooks/useCustomMove";

const GalleryReadPageComponent = () => {
  const { id } = useParams();
  // 2. navigate 함수 초기화
  const { moveToAdminGallery } = useCustomMove()
  const [gallery, setGallery] = useState(null);
  const navigate = useNavigate()

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
    
  if (gallery == null) {
    return <div>Loading....</div>;
  }
  const handleClickDelete = async () => {
    const data = await deleteGallery(id);
    console.log(data)
    alert("삭제가 완료되었습니다.")
    moveToAdminGallery()
  }

  return (
    <div className="max-w-7xl mx-auto my-10 px-5">
      {/* 1. 페이지 타이틀 */}
      <h2 className="text-3xl md:text-4xl font-bold m-0 mb-6">갤러리</h2>

      {/* 2. 게시글 제목 */}
      <div className="border-b-2 border-gray-800 pb-4 mb-4">
        <h3 className="text-2xl font-bold">{gallery.title}</h3>
      </div>

      {/* 3. 메타데이터 */}
      <div className="flex items-center text-sm text-gray-600 divide-x divide-gray-300 mb-8">
        <div className="pr-3">
          <span className="font-semibold">작성자 : </span> 관리자
        </div>
        <div className="px-3">
          <span className="font-semibold">등록일자 : </span>{" "}
          {gallery.createdAt.slice(0, 10)}
        </div>
        <div className="pl-3">
          <span className="font-semibold">조회 : </span> {gallery.viewCount}
        </div>
      </div>

      {/* 4. 컨텐츠 본문 */}
      <div className="content-body">
        {/* 4-1. 이미지 영역 */}
        <div className="mb-8">
          {gallery.images &&
            gallery.images.length > 0 &&
            gallery.images.map((image) => (
              <img
                key={image.imageUrl}
                src={image.imageUrl}
                alt={gallery.title}
                className="w-full max-w-4xl mx-auto my-4 rounded-lg shadow-md"
              />
            ))}
        </div>

        {/* 4-2. 텍스트 내용 영역 */}
        {gallery.content && (
          <div className="p-6 bg-gray-50 rounded-md min-h-[150px] whitespace-pre-wrap text-lg">
            {gallery.content}
          </div>
        )}
      </div>

      {/* --- 5. (추가) 목록 버튼 --- */}
     <div className="flex justify-center gap-4 mt-12">
        <button
          type="button"
          className="px-6 py-3 bg-gray-500 text-white font-bold rounded-md hover:bg-gray-600 transition-colors duration-200"
          onClick={() => moveToAdminGallery()}
        >
          목록으로
        </button>
        
        {/* 수정하기 버튼 (보통 파란색 계열 사용) */}
        <button
          type="button"
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors duration-200"
          onClick={() => navigate(`/admin/gallery/edit/${id}`)}
        >
          수정하기
        </button>

        {/* 삭제하기 버튼 (보통 빨간색 계열 사용) */}
        <button
          type="button"
          className="px-6 py-3 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition-colors duration-200"
          onClick={() => handleClickDelete(id)}
        >
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default GalleryReadPageComponent;
