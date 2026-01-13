import React, { lazy, Suspense } from "react";

const Detail = lazy(() => import("../pages/partner/attendance/AttendancePage"));

const Loading = () => <div>Loading...</div>;
const attendanceRouter = () => {
  return [
    {
      path: ":lessonNo",
      element: (
        <Suspense fallback={<Loading />}>
          <Detail />
        </Suspense>
      ),
    },
  ];
};

export default attendanceRouter;
