import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  changePartnerStatus,
  getOnePartnerRequest,
} from "../../../../api/adminApi";
import PartnerRequestComponent from "./components/PartnerRequestComponent";
const PartnerRequestPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const f = async () => {
      try {
        const res = await getOnePartnerRequest(id);
        setData(res);
      } catch (err) {
        console.error("파트너 신청 상세 조회 실패:", err);
      }
    };
    f();
  }, [id]);

  const statusChangeHandler = async (status) => {
    try {
      const res = await changePartnerStatus(id, status);
      console.log(res);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const renderStatus = (status) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="px-2 py-1 rounded-lg text-black-800 bg-gray-200 font-semibold">
            심사 중
          </span>
        );
      case "ACCEPTED":
        return (
          <span className="px-2 py-1 rounded-lg text-green-800 bg-green-50 font-semibold">
            승인
          </span>
        );
      case "REJECTED":
        return (
          <span className="px-2 py-1 rounded-lg text-red-800 bg-red-50 font-semibold">
            반려
          </span>
        );
      default:
        return status;
    }
  };
  if (!data) return <div className="text-gray-500 p-8">로딩중...</div>;
  return (
    <>
      <PartnerRequestComponent
        data={data}
        renderStatus={renderStatus}
        statusChangeHandler={statusChangeHandler}
      />
    </>
  );
};
export default PartnerRequestPage;
