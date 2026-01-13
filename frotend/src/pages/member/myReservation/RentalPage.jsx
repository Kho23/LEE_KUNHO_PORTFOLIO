import { useEffect, useState } from "react";
import RentalComponent from "./components/RentalComponent";
import { deleteRental, getRentalList } from "../../../api/rentalApi";
import ModalComponent from "../../../components/alertModal/AlertModalComponent";

const RentalPage = () => {
  const [alertModal, setAlertModal] = useState({
    open: false,
    type: "", // alert | confirm
    message: "",
    onConfirm: null,
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    const f = async () => {
      try {
        const res = await getRentalList();
        setData(res);
      } catch (err) {
        console.error("대관 목록 조회 실패", err);
      }
    };
    f();
  }, []);

  const cancelHandler = async (oneData) => {
    setAlertModal({
      open: true,
      type: "confirm",
      message: "신청을 취소하시겠습니까?",
      onConfirm: async (i) => {
        setAlertModal({ open: false });
        if (i !== "ok") return;

        try {
          await deleteRental(oneData.id);
          alert("신청이 취소되었습니다");
          window.location.reload();
        } catch (err) {
          console.error("대여 취소 실패", err);
          alert("취소 처리 중 오류가 발생했습니다");
        }
      },
    });
  };

  return (
    <div>
      <RentalComponent data={data} cancelHandler={cancelHandler} />
      {alertModal.open && (
        <ModalComponent
          type={alertModal.type}
          message={alertModal.message}
          onConfirm={alertModal.onConfirm}
        />
      )}
    </div>
  );
};

export default RentalPage;
