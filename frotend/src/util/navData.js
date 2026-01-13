export const allMenuItems = [
  {
    id: "guide",
    title: "이용안내",
    path: "/guide", // 1차 메뉴의 기본 경로
    subMenus: [
      // 2차 메뉴 (사이드바 내용)
      {
        id: "time",
        title: "운영시간",
        path: "/guide/time",
      },
      {
        id: "rent",
        title: "상품대여",
        path: "/guide/rent",
      },
      {
        id: "car",
        title: "차량등록",
        path: "/guide/car",
      },
      {
        id: "price",
        title: "요금안내",
        path: "/guide/price",
      },
      {
        id: "refund",
        title: "할인/환불/연기",
        path: "/guide/refund",
      },
    ],
  },
  {
    id: "program",
    title: "프로그램",
    path: "/program", // 1차 메뉴의 기본 경로
    subMenus: [
      // 2차 메뉴 (사이드바 내용)
      {
        id: "swim",
        title: "수영",
        path: "/program/1",
      },
      {
        id: "health",
        title: "헬스",
        path: "/program/2",
      },
      {
        id: "golf",
        title: "골프",
        path: "/program/3",
      },
      {
        id: "dance",
        title: "무용",
        path: "/program/4",
      },
      {
        id: "futsal",
        title: "풋살",
        path: "/program/5",
      },
    ],
  },
  {
    id: "reservation",
    title: "예약신청",
    path: "/reservation", // 1차 메뉴의 기본 경로
    subMenus: [
      // 2차 메뉴 (사이드바 내용)
      {
        id: "registration",
        title: "수강신청",
        path: "/reservation/registration",
      },
      {
        id: "rental",
        title: "대관신청",
        path: "/reservation/rental",
      },
      {
        id: "dailyUse",
        title: "일일이용예약",
        path: "/reservation/dailyUse",
      },
    ],
  },
  {
    id: "community",
    title: "커뮤니티",
    path: "/community", // 1차 메뉴의 기본 경로
    subMenus: [
      // 2차 메뉴 (사이드바 내용)
      {
        id: "notice",
        title: "공지사항",
        path: "/community/notice",
      },
      {
        id: "schedule",
        title: "일정",
        path: "/community/schedule",
      },
      {
        id: "faq",
        title: "자주묻는질문",
        path: "/community/faq",
      },
      {
        id: "gallery",
        title: "갤러리",
        path: "/community/gallery",
      },
    ],
  },
  {
    id: "member",
    title: "회원서비스",
    path: "/auth", // 클릭 시 기본 이동 경로 (보통 로그인으로 설정)
    hideInHeader: true, // 상단 메뉴바에는 표시하지 않음
    subMenus: [
      { id: "login", title: "로그인", path: "/auth/login" },
      { id: "register", title: "회원가입", path: "/auth/register" },
      { id: "findId", title: "아이디찾기", path: "/auth/find-id" },
      { id: "findPw", title: "비밀번호찾기", path: "/auth/find-pw" },
    ],
  },
  // {
  //   id: "admin",
  //   title: "관리자페이지",
  //   path: "/admin", // 1차 메뉴의 기본 경로
  //   hideInHeader: true,
  //   subMenus: [
  //     // 2차 메뉴 (사이드바 내용)
  //     {
  //       id: "",
  //       title: "공지사항",
  //       path: "",
  //     },
  //     {
  //       id: "",
  //       title: "일정",
  //       path: "",
  //     },
  //     {
  //       id: "",
  //       title: "자주묻질문",
  //       path: "",
  //     },
  //     {
  //       id: "",
  //       title: "갤러리",
  //       path: "",
  //     },
  //   ],
  // },
];
