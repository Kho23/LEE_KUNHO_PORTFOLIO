import { lazy, Suspense } from "react";
// const Login = lazy(() => import("../pages/member/LoginPage"));

const Loading = () => <div>Loading...</div>;
const communityRouter = () => {
  return [
    {
      path: "notice",
      element: <Suspense fallback={<Loading />}>{/* <Login /> */}</Suspense>,
    },
    {
      path: "memberManage",
      element: <Suspense fallback={<Loading />}>{/* <Login /> */}</Suspense>,
    },
  ];
};
export default adminRouter;
