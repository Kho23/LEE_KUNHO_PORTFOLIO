import React from "react";
import { lazy, Suspense } from "react";

const Lesson = lazy(() => import("../pages/member/myReservation/LessonPage"));
const DailyUse = lazy(() =>
  import("../pages/member/myReservation/DailyUsePage")
);
const Rental = lazy(() => import("../pages/member/myReservation/RentalPage"));

const Loading = () => <div>Loading...</div>;

const memberMyReservationRouter = () => {
  return [
    {
      path: "lesson",
      element: (
        <Suspense fallback={<Loading />}>
          <Lesson />
        </Suspense>
      ),
    },
    {
      path: "dailyUse",
      element: (
        <Suspense fallback={<Loading />}>
          <DailyUse />
        </Suspense>
      ),
    },
    {
      path: "rental",
      element: (
        <Suspense fallback={<Loading />}>
          <Rental />
        </Suspense>
      ),
    },
  ];
};

export default memberMyReservationRouter;
