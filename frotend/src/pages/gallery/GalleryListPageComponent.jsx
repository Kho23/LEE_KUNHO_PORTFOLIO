import React from 'react'
import PageComponent from '../../components/common/page/PageComponent'

const API_BASE_URL = process.env.REACT_APP_API_URL || "https://api.jeocenter.shop";

const GalleryListPageComponent = ({
  list,
  searchingTitle,
  category,
  pageData,
  handleClick,
  handleSearchSubmit,
  handleSearchChange,
  handleCategory
}) => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <nav className="text-sm text-gray-500 mb-6">
        홈 &gt; 커뮤니티 &gt; 갤러리
      </nav>
      <div className="flex items-end justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-900">갤러리</h1>
      </div>
      <div className="border-b-2 border-gray-400 mb-6" />

      {/* 검색 폼 */}
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

      {/* 총 게시물 수 */}
      <div className="text-sm mb-2">총 {pageData.totalCnt}건</div>

      {/* 갤러리 목록 (Grid 레이아웃) 혹은 결과 없음 메시지 */}
      {(!list || list.length === 0) ? (
        <div className="w-full border-t-2 border-gray-700 pt-20 pb-20 text-center text-gray-500">
          갤러리 목록이 존재하지 않습니다.
        </div>
      ) : (
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
                    src={`${API_BASE_URL.trim()}`+gallery.images[0].thumbnailUrl}
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
      )}

      {/* 페이지네이션 */}
      {list && list.length > 0 && (
        <div className="mt-8">
          <PageComponent pageData={pageData} />
        </div>
      )}
    </div>
  )
}

export default GalleryListPageComponent