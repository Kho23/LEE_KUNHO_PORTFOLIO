import React, { useEffect, useState } from 'react'
import { getGalleryList, increaseViewCount } from '../../api/galleryApi'
import { useSearchParams } from 'react-router-dom'
import useCustomMove from '../../hooks/useCustomMove'
import GalleryListPageComponent from './GalleryListPageComponent'

const GalleryListPage = () => {
  const [list, setList] = useState([])
  const [searchParam, setSearchParam] = useSearchParams();

  // 초기값 설정
  const [searchingTitle, setSearchingTitle] = useState(() => searchParam.get("keyword") || "");
  const [category, setCategory] = useState(() => searchParam.get("type") || "t");

  const { moveToGalleryDetail } = useCustomMove()

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
    moveToGalleryDetail(id);
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParam({ page: 1, size: 10, type: category, keyword: searchingTitle });
  };

  const handleSearchChange = (e) => setSearchingTitle(e.target.value);
  const handleCategory = (e) => setCategory(e.target.value);

  return (
    <GalleryListPageComponent 
      list={list}
      searchingTitle={searchingTitle}
      category={category}
      pageData={pageData}
      handleClick={handleClick}
      handleSearchSubmit={handleSearchSubmit}
      handleSearchChange={handleSearchChange}
      handleCategory={handleCategory}
    />
  )
}

export default GalleryListPage