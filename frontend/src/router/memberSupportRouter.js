import { lazy, Suspense } from "react";

const Detail = lazy(() => import("../pages/member/support/SupportDetailPage"));
const Write = lazy(() => import("../pages/member/support/SupportWritePage"));

const Loading = () => <div>Loading...</div>;
const memberSupportRouter = () => {
  return [
    {
      path: "detail/:no",
      element: (
        <Suspense fallback={<Loading />}>
          <Detail />
        </Suspense>
      ),
    },
    {
      path: "write",
      element: (
        <Suspense fallback={<Loading />}>
          <Write />
        </Suspense>
      ),
    },
  ];
};

export default memberSupportRouter;
