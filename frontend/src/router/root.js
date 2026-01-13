import { lazy, Suspense } from "react";
import Layout from "../components/layouts/Layout";
import adminRouter from "./adminRouter";
import memberMyPageRouter from "./memberMyPageRouter";
import AdminLayout from "../components/layouts/AdminLayout";
import partnerMyPageRouter from "./partnerMyPageRouter";

const { createBrowserRouter } = require("react-router-dom");

const Loading = () => <div>Loading...</div>;
const Main = lazy(() => import("../pages/public/Mainpage"));
const Admin = lazy(() => import("../pages/admin/main/AdminPage"));
const Login = lazy(() => import("../pages/auth/login/LoginPage"));
const Notice = lazy(() => import("../pages/notice/NoticeListPage"));
const NoticeDetail = lazy(() => import("../pages/notice/NoticeReadPage"));
const FAQ = lazy(() => import("../pages/faq/FaqListPage"));
const Program = lazy(() => import("../pages/program/ProgramListPage"));
const MemberMyPage = lazy(() => import("../pages/member/mypage/MemberMyPage"));
const Gallery = lazy(() => import("../pages/gallery/GalleryListPage"));
const GalleryDetail = lazy(() => import("../pages/gallery/GalleryReadPage"));
const Schedule = lazy(() => import("../pages/schedule/ScheldulePage"));
const DailyUse = lazy(() => import("../pages/dailyUse/DailyUsePage"));
const Register = lazy(() => import("../pages/auth/register/RegisterPage"));
const FindId = lazy(() => import("../pages/auth/find/FindIdpage"));
const FindPw = lazy(() => import("../pages/auth/find/FindPwPage"));
const Guide = lazy(() => import("../pages/guide/GuidePage"));
const Rental = lazy(() => import("../pages/rental/RentalReqPage"));
const LessonList = lazy(() => import("../pages/lesson/LessonListPage"));
const LessonDetail = lazy(() => import("../pages/lesson/LessonReadPage"));
const PartnerMyPage = lazy(() =>
  import("../pages/partner/partnerPage/PartnerMyPage")
);
const KakaoCallback = lazy(() => import("../pages/auth/KakaoCallbackPage"));
const NaverCallback = lazy(() => import("../pages/auth/NaverCallbackPage"));

const root = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense>
            <Main />
          </Suspense>
        ),
      },
      {
        path: `program/:programId`,
        element: (
          <Suspense fallback={<Loading />}>
            <Program />
          </Suspense>
        ),
      },
      {
        path: "/auth/login",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/auth/kakao/callback",
        element: (
          <Suspense fallback={<Loading />}>
            <KakaoCallback />
          </Suspense>
        ),
      },
      {
        path: "/auth/naver/callback",
        element: (
          <Suspense fallback={<Loading />}>
            <NaverCallback />
          </Suspense>
        ),
      },
      {
        path: "community/notice",
        element: (
          <Suspense fallback={<Loading />}>
            <Notice />
          </Suspense>
        ),
      },
      {
        path: "community/notice/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <NoticeDetail />
          </Suspense>
        ),
      },
      {
        path: "/community/gallery",
        element: (
          <Suspense fallback={<Loading />}>
            <Gallery />
          </Suspense>
        ),
      },
      {
        path: "/community/gallery/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <GalleryDetail />
          </Suspense>
        ),
      },
      {
        path: "/community/faq",
        element: (
          <Suspense fallback={<Loading />}>
            <FAQ />
          </Suspense>
        ),
      },
      {
        path: "/community/schedule",
        element: (
          <Suspense fallback={<Loading />}>
            <Schedule />
          </Suspense>
        ),
      },
      {
        path: "/auth/find-pw",
        element: (
          <Suspense fallback={<Loading />}>
            <FindPw />
          </Suspense>
        ),
      },
      {
        path: "/auth/register",
        element: (
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "/auth/find-id",
        element: (
          <Suspense fallback={<Loading />}>
            <FindId />
          </Suspense>
        ),
      },
      {
        path: "/reservation/registration",
        element: (
          <Suspense fallback={<Loading />}>
            <LessonList />
          </Suspense>
        ),
      },
      {
        path: "/reservation/registration/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <LessonDetail />
          </Suspense>
        ),
      },
      {
        path: "/reservation/dailyUse",
        element: (
          <Suspense fallback={<Loading />}>
            <DailyUse />
          </Suspense>
        ),
      },
      {
        path: `guide/:category`,
        element: (
          <Suspense fallback={<Loading />}>
            <Guide />
          </Suspense>
        ),
      },
      {
        path: `/reservation/rental`,
        element: (
          <Suspense fallback={<Loading />}>
            <Rental />
          </Suspense>
        ),
      },
      {
        path: "/member",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <MemberMyPage />
              </Suspense>
            ),
          },
          ...memberMyPageRouter(),
        ],
      },
      {
        path: "partner",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <PartnerMyPage />
              </Suspense>
            ),
          },
          ...partnerMyPageRouter(),
        ],
      },
    ],
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        children: [
          {
            index: true,
            element: (
              <Suspense>
                <Admin />
              </Suspense>
            ),
          },
          ...adminRouter(),
        ],
      },
    ],
  },
]);

export default root;
