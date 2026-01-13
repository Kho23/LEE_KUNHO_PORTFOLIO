import React, { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'
import { getGalleryList, increaseViewCount } from '../../../../api/galleryApi'
import PageComponent from '../../../../components/common/page/PageComponent'
import useCustomMove from '../../../../hooks/useCustomMove'

const GalleryListPageComponent = () => {
  const [list, setList] = useState([])
  const [searchParam, setSearchParam] = useSearchParams();
  
  // 초기값 설정
  const [searchingTitle, setSearchingTitle] = useState(() => searchParam.get("keyword") || "");
  const [category, setCategory] = useState(() => searchParam.get("type") || "t");
  
  const { moveToAdminGalleryDetail, moveToAdminGalleryRegister } = useCustomMove()
  
  const [pageData, setPageData] = useState({
    pageNumList: [],
    prev: false,
    next: false,
    current: 1,
    totalCnt: 0,
    prevPage: 0,
    nextPage: 0
  });

  useEffect(() => {
    const get = async () => {
      try {
        const paramObj = {
          page: searchParam.get("page") || 1,
          size: searchParam.get("size") || 10,
          type: searchParam.get("type") || "t",
          keyword: searchParam.get("keyword") || ""
        };
        const data = await getGalleryList(paramObj);
        
        setList(data.dtoList)
        setPageData({
          pageNumList: data.pageNumList,
          prev: data.prev,
          next: data.next,
          current: data.current,
          prevPage: data.prevPage,
          nextPage: data.nextPage,
          totalCnt: data.totalCnt
        });
      } catch (error) {
        console.log("갤러리 로드 중 오류 발생 ", error)
      }
    }; 
    get()
  }, [searchParam.toString()])

  const handleClick = (id) => {
    increaseViewCount(id);
    moveToAdminGalleryDetail(id);
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParam({ page: 1, size: 10, type: category, keyword: searchingTitle });
  };
  
  const handleSearchChange = (e) => setSearchingTitle(e.target.value);
  const handleCategory = (e) => setCategory(e.target.value);

  return (
    <div className="container mx-auto max-w-5xl p-4 md:p-8">
      {/* 1. 페이지 제목 */}
      <h1 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-gray-800">
        갤러리
      </h1>

      {/* 2. 검색 폼 (공지사항과 동일) */}
      <form 
        onSubmit={handleSearchSubmit} 
        className="flex justify-end items-center space-x-2 my-4 p-4 bg-gray-100 rounded-md"
      >
        <select 
          value={category} 
          onChange={handleCategory} 
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="t">제목</option>
          <option value="c">내용</option>
          <option value="tc">제목+내용</option>
        </select>
        
        <input 
          type="text" 
          value={searchingTitle} 
          onChange={handleSearchChange} 
          placeholder="검색어 입력" 
          className="border border-gray-300 rounded px-3 py-2 flex-grow max-w-xs" 
        />
        
        <button 
          type="submit" 
          className="bg-gray-700 text-white font-bold rounded px-4 py-2 hover:bg-gray-800"
        >
          검색
        </button>
      </form>

      {/* 3. 총 게시물 수 */}
      <div className="text-sm mb-2">총 {pageData.totalCnt}건</div>

      {/* 4. 갤러리 목록 (Grid 레이아웃) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-t-2 border-gray-700 pt-6">
        {list.map(gallery => (
          <div
            key={gallery.galleryId}
            className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleClick(gallery.galleryId)}
          >
            {/* 썸네일 영역 */}
            <div className="w-full h-48 overflow-hidden bg-gray-200">
                {gallery.images && gallery.images.length > 0 ? (
                <img
                    src={gallery.images[0].thumbnailUrl}
                    alt={gallery.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
                ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                    (이미지 없음)
                </div>
                )}
            </div>
            
            {/* 텍스트 영역 */}
            <div className="p-4">
              <h3 className="text-lg font-bold truncate mb-2">{gallery.title}</h3>
              <p className="text-sm text-gray-500 text-right">
                {gallery.createdAt ? gallery.createdAt.slice(0, 10) : ''}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 5. 페이지네이션 컴포넌트 사용 */}
      {/* PageComponent에 pageData와 movePage 함수를 넘겨줍니다 */}
      <div className="mt-8">
          <PageComponent pageData={pageData} />
          <button onClick={moveToAdminGalleryRegister}>등록하기</button>
      </div> 
    </div>
  )
}

export default GalleryListPageComponent