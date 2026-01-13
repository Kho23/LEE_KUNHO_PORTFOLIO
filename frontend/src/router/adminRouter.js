import { Suspense } from "react";
import NoticeEditPage from "../pages/admin/community/notice/NoticeEditPage";
import NoticeAddPage from "../pages/admin/community/notice/NoticeAddPage";
import NoticeListPage from "../pages/admin/community/notice/NoticeListPage";
import NoticeReadPage from "../pages/admin/community/notice/NoticeReadPage";
import PartnerRequestPage from "../pages/admin/member/partnerRequest/PartnerRequestPage";
import PartnerRequestList from "../pages/admin/member/partnerRequest/PartnerRequestList";
import SupportListPage from "../pages/admin/member/support/SupportListPage";
import SupportDetailPage from "../pages/admin/member/support/SupportDetailPage";
import GuideAdminPage from "../pages/admin/guide/GuideAdminPage";
import FaqListPage from "../pages/admin/community/faq/FaqListPage";
import ScheduleListPage from "../pages/admin/community/schedule/ScheduleListPage";
import MemberListPage from "../pages/admin/member/memberInfo/MemberListPage";
import GalleryListPage from "../pages/admin/community/gallery/GalleryListPage";
import GalleryReadPage from "../pages/admin/community/gallery/GalleryReadPage";
import GalleryRegisterPage from "../pages/admin/community/gallery/GalleryRegisterPage";
import GalleryEditPage from "../pages/admin/community/gallery/GalleryEditPage";
import AgeGenderStatPage from "../pages/admin/statistic/AgeGenderStatPage";
import LessonApprovalPage from "../pages/admin/reservation/lesson/LessonApprovalPage";
import RentalApprovalPage from "../pages/admin/reservation/rental/RentalApprovalPage";
import LessonEditPage from "../pages/admin/reservation/lesson/LessonEditPage";
import RentalEditPage from "../pages/admin/reservation/rental/RentalEditPage";
import LessonStatPage from "../pages/admin/statistic/LessonStatPage";
import ChatListPage from "../pages/admin/chat/AdminChatPage";
import ProgramAdminPage from "../pages/admin/program/ProgramAdminPage";

const Loading = () => <div>Loading...</div>;
const adminRouter = () => {
  return [
    {
      path: "program/:programId",
      element: (
        <Suspense fallback={<Loading />}>
          <ProgramAdminPage />
        </Suspense>
      ),
    },
    {
      path: "notice",
      element: (
        <Suspense fallback={<Loading />}>
          <NoticeListPage />
        </Suspense>
      ),
    },
    {
      path: "notice/:id",
      element: (
        <Suspense fallback={<Loading />}>
          <NoticeReadPage />
        </Suspense>
      ),
    },
    {
      path: "notice/add",
      element: (
        <Suspense fallback={<Loading />}>
          <NoticeAddPage />
        </Suspense>
      ),
    },
    {
      path: "notice/update/:id",
      element: (
        <Suspense fallback={<Loading />}>
          <NoticeEditPage />
        </Suspense>
      ),
    },
    {
      path: "faq",
      element: (
        <Suspense fallback={<Loading />}>
          <FaqListPage />
        </Suspense>
      ),
    },
    {
      path: "schedule",
      element: (
        <Suspense fallback={<Loading />}>
          <ScheduleListPage />
        </Suspense>
      ),
    },
    {
      path: "member/partnerRequest",
      element: (
        <Suspense fallback={<Loading />}>
          <PartnerRequestList />
        </Suspense>
      ),
    },
    {
      path: "member/partnerRequest/:id",
      element: (
        <Suspense fallback={<Loading />}>
          <PartnerRequestPage />
        </Suspense>
      ),
    },
    {
      path: "member/support",
      element: (
        <Suspense fallback={<Loading />}>
          <SupportListPage />
        </Suspense>
      ),
    },
    {
      path: "member/support/:no",
      element: (
        <Suspense fallback={<Loading />}>
          <SupportDetailPage />
        </Suspense>
      ),
    },
    {
      path: "member/memberInfo",
      element: (
        <Suspense fallback={<Loading />}>
          <MemberListPage />
        </Suspense>
      ),
    },
    {
      path: "guide/:category",
      element: (
        <Suspense fallback={<Loading />}>
          <GuideAdminPage />
        </Suspense>
      ),
    },
    {
      path: "gallery",
      element: (
        <Suspense fallback={<Loading />}>
          <GalleryListPage />
        </Suspense>
      ),
    },
    {
      path: "gallery/:id",
      element: (
        <Suspense fallback={<Loading />}>
          <GalleryReadPage />
        </Suspense>
      ),
    },
    {
      path: "gallery/register",
      element: (
        <Suspense fallback={<Loading />}>
          <GalleryRegisterPage />
        </Suspense>
      ),
    },
    {
      path: "gallery/edit/:id",
      element: (
        <Suspense fallback={<Loading />}>
          <GalleryEditPage />
        </Suspense>
      ),
    },
    {
      path: "stat/ageGender",
      element: (
        <Suspense fallback={<Loading />}>
          <AgeGenderStatPage />
        </Suspense>
      ),
    },
    {
      path: "lesson/approve",
      element: (
        <Suspense fallback={<Loading />}>
          <LessonApprovalPage />
        </Suspense>
      ),
    },
    {
      path: "lesson/approve/:id",
      element: (
        <Suspense fallback={<Loading />}>
          <LessonEditPage />
        </Suspense>
      ),
    },
    {
      path: "rental/approve",
      element: (
        <Suspense fallback={<Loading />}>
          <RentalApprovalPage />
        </Suspense>
      ),
    },
    {
      path: "rental/approve/:id",
      element: (
        <Suspense fallback={<Loading />}>
          <RentalEditPage />
        </Suspense>
      ),
    },
    {
      path: "stat/lesson",
      element: (
        <Suspense fallback={<Loading />}>
          <LessonStatPage />
        </Suspense>
      ),
    },
    {
      path: "chat/list",
      element: (
        <Suspense fallback={<Loading />}>
          <ChatListPage />
        </Suspense>
      ),
    },
  ];
};
export default adminRouter;
