import React, { useEffect, useState } from "react";
import { searchMemberList } from "../../../../api/adminApi";
import usePageMove from "../../../../hooks/usePageMove";

import MemberListComponent from "./MemberListComponent";

// 회원 목록 페이징 및 검색 결과 초기 상태
const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCnt: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const MemberListPage = () => {
  // 회원 목록 데이터 상태
  const [data, setData] = useState(initState);
  // 선택된 회원 (모달에서 상세/수정용)
  const [selectedMember, setSelectedMember] = useState(null);
  // 회원 수정 모달 열림 여부
  const [openModal, setOpenModal] = useState(false);
  // 검색 카테고리 (이름, 아이디 등)
  const [category, setCategory] = useState("name");
  // 검색어
  const [keyword, setKeyword] = useState("");
  // 일반 회원 필터 여부
  const [filterUser, setFilterUser] = useState(false);
  // 파트너 회원 필터 여부
  const [filterPartner, setFilterPartner] = useState(false);
  const { page, size, moveToList, getQueryParams } = usePageMove();

  // 검색 + 역할 필터 + 페이징을 한 번에 처리하는 공통 함수
  const executeSearchAndFilter = async (
    keyword,
    category,
    role,
    page,
    size
  ) => {
    const params = {
      page,
      size,
      type: category,
      keyword: keyword.trim(),
      role: role || "",
    };

    try {
      // 회원 목록 조회 API 호출
      const res = await searchMemberList(params);
      return res;
    } catch (err) {
      console.error("조회 실패:", err);
      return initState;
    }
  };

  useEffect(() => {
    // URL 쿼리 파라미터 조회
    const params = getQueryParams();
    const memberIdToOpen = params.get("memberIdToOpen");
    const shouldOpenModal = params.get("openModal") === "true";

    // 필터 상태에 따라 초기 역할 조건 설정
    let initialRole = null;
    if (filterUser && !filterPartner) initialRole = "ROLE_USER";
    else if (!filterUser && filterPartner) initialRole = "ROLE_PARTNER";

    // 쿼리 파라미터 우선으로 검색어/카테고리 설정
    const initialKeyword = params.get("keyword") || keyword;
    const initialCategory = params.get("type") || category;

    if (params.get("type") && params.get("keyword")) {
      setCategory(initialCategory);
      setKeyword(initialKeyword);
    }

    // 검색 및 필터 조건으로 회원 목록 조회
    executeSearchAndFilter(
      initialKeyword,
      initialCategory,
      initialRole,
      page,
      size
    ).then((res) => {
      setData(res);

      // 특정 회원을 바로 모달로 열어야 하는 경우 처리
      if (shouldOpenModal && memberIdToOpen) {
        const targetMember = res.dtoList.find(
          (m) => String(m.memberId) === memberIdToOpen
        );

        if (targetMember) {
          setSelectedMember(targetMember);
          setOpenModal(true);

          // 모달 오픈 후 불필요한 쿼리 파라미터 제거
          const newParams = Object.fromEntries(params.entries());
          delete newParams.openModal;
          delete newParams.memberIdToOpen;
          moveToList(newParams);
        }
      }
    });
  }, [page, size, filterUser, filterPartner]);

  // 검색 카테고리 변경 처리
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  // 검색어 입력 처리
  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  // 검색 버튼 클릭 시 처리
  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    // 검색 시 역할 필터 초기화
    setFilterUser(false);
    setFilterPartner(false);

    // 검색 조건으로 1페이지부터 재조회
    const res = await executeSearchAndFilter(keyword, category, null, 1, size);
    setData(res);

    // URL 쿼리 파라미터 갱신
    moveToList({
      page: 1,
      size: size,
      type: category,
      keyword: keyword,
    });
  };

  // 역할 필터 토글 처리
  const handleFilterChange = async (setter, currentValue) => {
    const newValue = !currentValue;
    setter(newValue);

    // 필터 변경 시 검색 조건 초기화
    setKeyword("");
    setCategory("name");

    let nextUser = filterUser;
    let nextPartner = filterPartner;

    if (setter === setFilterUser) nextUser = newValue;
    if (setter === setFilterPartner) nextPartner = newValue;

    // 선택된 필터 상태에 따라 역할 조건 결정
    let role = null;
    if (nextUser && !nextPartner) role = "ROLE_USER";
    else if (!nextUser && nextPartner) role = "ROLE_PARTNER";

    // 필터 조건으로 회원 목록 재조회
    const res = await executeSearchAndFilter("", "name", role, 1, size);
    setData(res);

    // URL 쿼리 파라미터 갱신
    moveToList({
      page: 1,
      size: size,
      type: "name",
      keyword: "",
      role: role || "",
    });
  };

  // 회원 역할을 화면에 표시할 형태로 변환
  const renderStatus = (status) => {
    switch (status) {
      case "ROLE_USER":
        return (
          <span className="px-2 py-1 rounded-lg text-gray-700 bg-gray-100 font-semibold">
            일반 회원
          </span>
        );
      case "ROLE_PARTNER":
        return (
          <span className="px-2 py-1 rounded-lg text-green-700 bg-green-100 font-semibold">
            파트너 회원
          </span>
        );
      case "ROLE_ADMIN":
        return (
          <span className="px-2 py-1 rounded-lg text-red-700 bg-red-100 font-semibold">
            관리자
          </span>
        );
      default:
        return status;
    }
  };

  return (
    <>
      <MemberListComponent
        handleSearchSubmit={handleSearchSubmit}
        category={category}
        handleCategory={handleCategory}
        keyword={keyword}
        handleSearchChange={handleSearchChange}
        data={data}
        filterUser={filterUser}
        handleFilterChange={handleFilterChange}
        setFilterUser={setFilterUser}
        setFilterPartner={setFilterPartner}
        setSelectedMember={setSelectedMember}
        setOpenModal={setOpenModal}
        page={page}
        renderStatus={renderStatus}
        moveToList={moveToList}
        openModal={openModal}
        selectedMember={selectedMember}
        filterPartner={filterPartner}
        size={size}
      />
    </>
  );
};

export default MemberListPage;
