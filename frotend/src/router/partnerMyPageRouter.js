import { lazy, Suspense } from "react";
import memberMyReservationRouter from "./memberMyReservationRouter";
import attendanceRouter from "./attendanceRouter";

const MemberEdit = lazy(() =>
  import("../pages/member/memberEdit/MemberEditPage")
);
const PwEditPage = lazy(() => import("../pages/member/pwEdit/PwEditPage"));
const MyLessons = lazy(() =>
  import("../pages/partner/myLessons/MyLessonsPage")
);
const LessonsRequest = lazy(() =>
  import("../pages/partner/lessonRequest/LessonRequestPage")
);
const Attendance = lazy(() =>
  import("../pages/partner/attendance/AttendanceListPage")
);
const Reservation = lazy(() =>
  import("../pages/member/myReservation/MyReservationPage")
);

const Loading = () => <div>Loading...</div>;
const partnerMyPageRouter = () => {
  return [
    {
      path: "memberEdit",
      element: (
        <Suspense fallback={<Loading />}>
          <MemberEdit />
        </Suspense>
      ),
    },
    {
      path: "pwEditPage",
      element: (
        <Suspense fallback={<Loading />}>
          <PwEditPage />
        </Suspense>
      ),
    },
    {
      path: "myLessons",
      element: (
        <Suspense fallback={<Loading />}>
          <MyLessons />
        </Suspense>
      ),
    },
    {
      path: "lessonRequest",
      element: (
        <Suspense fallback={<Loading />}>
          <LessonsRequest />
        </Suspense>
      ),
    },
    {
      path: "attendance",
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Loading />}>
              <Attendance />
            </Suspense>
          ),
        },
        ...attendanceRouter(),
      ],
    },
    {
      path: "myReservation",
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Loading />}>
              <Reservation />
            </Suspense>
          ),
        },
        ...memberMyReservationRouter(),
      ],
    },
  ];
};

export default partnerMyPageRouter;
