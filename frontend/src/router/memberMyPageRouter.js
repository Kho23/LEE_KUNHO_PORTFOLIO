import { lazy, Suspense } from "react";
import memberSupportRouter from "./memberSupportRouter";
import memberMyReservationRouter from "./memberMyReservationRouter";

const MemberEdit = lazy(() =>
  import("../pages/member/memberEdit/MemberEditPage")
);
const PwEditPage = lazy(() => import("../pages/member/pwEdit/PwEditPage"));
const Reservation = lazy(() =>
  import("../pages/member/myReservation/MyReservationPage")
);
const Support = lazy(() => import("../pages/member/support/SupportPage"));
const PartnerRequest = lazy(() =>
  import("../pages/member/partnerRequest/PartnerRequestPage")
);

const Loading = () => <div>Loading...</div>;
const memberMyPageRouter = () => {
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
    {
      path: "support",
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Loading />}>
              <Support />
            </Suspense>
          ),
        },
        ...memberSupportRouter(),
      ],
    },
    {
      path: "partnerRequest",
      element: (
        <Suspense fallback={<Loading />}>
          <PartnerRequest />
        </Suspense>
      ),
    },
  ];
};

export default memberMyPageRouter;
