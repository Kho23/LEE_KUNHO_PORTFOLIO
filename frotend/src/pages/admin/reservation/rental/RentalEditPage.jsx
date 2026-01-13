import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { changeRentalStatus, getOneRental } from "../../../../api/adminApi";
import RentalEditComponent from "./components/RentalEditComponent";
import ModalComponent from "../../../../components/alertModal/AlertModalComponent";

const RentalEditPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  // 알림/확인 모달 상태 관리
  const [modal, setModal] = useState({
    open: false,
    type: "",
    message: "",
    onConfirm: null,
  });

  // 페이지 진입 시 대관 신청 상세 정보 조회
  useEffect(() => {
    const f = async () => {
      try {
        const res = await getOneRental(id); // 대관 신청 단건 조회 API 호출
        setData(res); // 조회 결과 상태에 저장
      } catch (err) {
        console.error("대관 신청 상세 조회 실패:", err);
      }
    };
    f();
  }, [id]);

  // 승인 / 반려 버튼 클릭 시 상태 변경 처리
  const statusChangeHandler = (status) => {
    setModal({
      open: true,
      type: "confirm",
      message:
        status === "ACCEPTED"
          ? "대관 신청을 승인하시겠습니까?"
          : "대관 신청을 반려하시겠습니까?",
      onConfirm: async (result) => {
        setModal({ open: false });
        if (result !== "ok") return;

        try {
          await changeRentalStatus(id, status); // 대관 신청 상태 변경 API 호출
          window.location.reload();
        } catch (err) {
          console.error(err);
        }
      },
    });
  };

  // 대관 신청 상태에 따른 화면 표시용 텍스트 처리
  const renderStatus = (status) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="px-2 py-1 rounded-lg bg-gray-200 font-semibold">
            심사 중
          </span>
        );
      case "ACCEPTED":
        return (
          <span className="px-2 py-1 rounded-lg bg-green-50 text-green-800 font-semibold">
            승인
          </span>
        );
      case "REJECTED":
        return (
          <span className="px-2 py-1 rounded-lg bg-red-50 text-red-800 font-semibold">
            반려
          </span>
        );
      default:
        return status;
    }
  };

  if (!data) return <div className="p-8 text-gray-500">로딩중...</div>;

  return (
    <>
      <RentalEditComponent
        data={data}
        renderStatus={renderStatus}
        statusChangeHandler={statusChangeHandler}
      />

      {modal.open && (
        <ModalComponent
          type={modal.type}
          message={modal.message}
          onConfirm={modal.onConfirm}
        />
      )}
    </>
  );
};

export default RentalEditPage;
